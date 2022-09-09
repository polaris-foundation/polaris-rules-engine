#####
# Build the common base
#####
FROM node:11-alpine as basebuilder

RUN apk update && apk upgrade

WORKDIR /app

# Prepare node installation packages
RUN npm i npm@latest -g

# Add deps
COPY package.json .npmrc yarn.lock tsconfig.json ./
RUN yarn install --production --frozen-lockfile

#####
# Generate production code
#####

FROM basebuilder as sourcetransformer

# Add source files
ADD src/ src/
ADD web/ web/

# Install dev dependencies
RUN yarn install --frozen-lockfile

# Transpile src to final form
ADD .babelrc .
RUN yarn build
RUN yarn licenses generate-disclaimer --silent > dist/licences.txt 2> /dev/null


#####
# Add in the dev dependencies and run quality checks that can fail the build
#####
FROM sourcetransformer as qualitychecker

# Lint source and fail on error
COPY .eslintrc.json .npmrc ./
ADD tests/ tests/
RUN yarn lint

# Audit and fail on vuln
# TODO: Enable audit for dependencies
# SEE: https://github.com/yarnpkg/yarn/issues/6632
# RUN yarn audit

# Run tests on dist/ and fail on...failure
#RUN npm test

# REMOVE .npmrc
RUN rm -f .npmrc

#####
# Configure basebuilder for production
#####
FROM basebuilder as runner

LABEL org.opencontainers.image.source=https://github.com/polaris-foundation/polaris-rules-engine

# Copy dist files from sourcetransformer
COPY --from=sourcetransformer --chown=node /app/dist dist/
COPY --from=sourcetransformer --chown=node /app/package.json ./

# Set expressjs to production mode
# https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
ENV NODE_ENV=production

EXPOSE 3000

## Run as low privilege user
## https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

ENTRYPOINT [ "node", "./dist/server/server.js" ]

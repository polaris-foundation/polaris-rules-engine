import '@babel/polyfill';
import app from './app';
import log from './log';

const PORT = 3000;

app.listen(PORT, () =>
  log.info(`dhos-rules-engine listening on port ${PORT}!`)
);

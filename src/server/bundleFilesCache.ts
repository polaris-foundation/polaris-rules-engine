import fs from 'fs';
import path from 'path';

const { NODE_ENV } = process.env;

const bundleFilesCache: { [filename: string]: string} = {};

let files = '../web';
/* istanbul ignore next */
if (NODE_ENV === 'jest') files = '../../dist/web';
const directoryUrl = path.join(__dirname, files);

const bundleFilenames = fs.readdirSync(directoryUrl);

for (let i = 0, len = bundleFilenames.length; i < len; i++) {
  const bundleFilename = bundleFilenames[i];

  bundleFilesCache[bundleFilename] = fs.readFileSync(
    `${directoryUrl}/${bundleFilename}`,
    {
      encoding: 'utf-8'
    }
  );
}

export default bundleFilesCache;

/* eslint-disable no-console */

const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const blackList = ['stencil-', 'common-', 'polyfills-', 'runtime-'];

function isNotInBlackList(file) {
  for (let i = 0, t = blackList.length; i < t; i += 1) {
    const bl = blackList[i];

    if (file.indexOf(bl) === 0) return false;
  }

  return true;
}

async function main() {
  const dir = 'www';
  const listDirs = await fs.readdir(dir, { withFileTypes: true });

  for (const dirItem of listDirs) {
    const file = path.resolve(dir, dirItem.name);
    const ext = path.extname(file);

    if (
      !dirItem.isDirectory() &&
      ext === '.js' &&
      isNotInBlackList(dirItem.name)
    ) {
      const { stdout } = await exec(
        `javascript-obfuscator ${file} --compact true --self-defending true --dead-code-injection true --disable-console-output true --output ${file}`
      );

      console.log(stdout);
    }
  }
}

main();

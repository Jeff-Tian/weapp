const path = require('path');
const {Project, upload} = require('miniprogram-ci');

const {version, description} = require('../package.json');
const {appid: appId} = require('../project.config.json');

(async () => {
  const project = new Project({
    appid: appId,
    type: 'miniProgram',
    projectPath: path.join(__dirname, '../'),
    privateKeyPath: './private.key',
    ignores: [
      '.github',
      'scripts',
      'README.md',
      'yarn.lock',
      'node_modules/**/*'
    ]
  });
  const uploadResult = await upload({
    project,
    version,
    desc: description,
    setting: {
      es7: true,
      minify: true,
      codeProtect: true,
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true,
      autoPrefixWXSS: true
    },
    onProgressUpdate: console.log
  });

  console.log(uploadResult);
})();

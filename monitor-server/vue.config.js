const path = require('path');
const { defineConfig } = require('@vue/cli-service');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@', resolve('src'))
    .set('~', resolve('node_modules'))
  },
});

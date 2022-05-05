// const loaderUtils = require('loader-utils');
module.exports = function(source) {
  console.log(source, 'xxx')
  // 获取到用户给当前 Loader 传入的 options
  // const options = loaderUtils.getOptions(this);
  return source
}

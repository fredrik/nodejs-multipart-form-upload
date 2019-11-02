var addon = require('bindings')('nodejs_sphinx');

module.exports = {
  hello: addon.hello,
};

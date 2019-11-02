var expect = require('chai').expect;

var lib = require('../lib/nodejs-sphinx');

describe('/nodejs-sphinx', function() {
  it('should load', function() {
    expect(lib.hello()).to.equal('world');
  });
});

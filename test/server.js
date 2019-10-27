var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../server');

describe('server', function() {
  let server;
  before(function() {
    server = app.server.listen(0);
  });

  after(function() {
    return server.close();
  });

  it('should load', function() {
    expect(server.constructor.toString()).to.contain('function Server');
  });
});

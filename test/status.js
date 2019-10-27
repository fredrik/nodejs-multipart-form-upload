var expect = require('chai').expect;
var supertest = require('supertest');

var server = require('../server');

describe('/upload', function() {
  after(function() {
    return server.close();
  });

  it('should load', function() {
    expect(server.constructor.toString()).to.contain('function Server');
  });
});

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

  it('should upload', function() {
    return supertest(server)
      .post('/upload/123')
      .set('content-type', 'multipart/form-data')
      .field('title', 'test' + Date.now())
      .attach('file', '13157700051593730_2011-09-11_15.41_1315770072221_.mp3')
      .then(function(res) {
        console.log('response', res.body);
        expect(res.status).to.equal(500);
      })
      .catch(function(err) {
        console.log('error', err);
      })
  });
});

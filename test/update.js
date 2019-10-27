var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../server');

describe('/update', function() {
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

  it('should update', function() {
    var id = 'testupdate' + Date.now();
    app.metadata[id] = {
      some: 'info'
    };
    var expectedTitle = 'test' + Date.now();
    return supertest(server)
      .post('/update/' + id)
      .set('content-type', 'multipart/form-data')
      .field('title', expectedTitle)
      .field('other', 'stuff')
      .then(function(res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({
          metadata: {
            other: 'stuff',
            some: 'info',
            title: expectedTitle,
          }
        });
      });
  });
});

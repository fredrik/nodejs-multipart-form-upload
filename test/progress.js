var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../server');

describe('/progress', function() {
  let server;
  before(function() {
    server =  app.server.listen(0);
  });

  after(function() {
    return server.close();
  });

  it('should load', function() {
    expect(server.constructor.toString()).to.contain('function Server');
  });

  it('should get progress', function() {
    var id = 'testprogress' + Date.now();
    app.progresses[id] = {
      some: 'info'
    };
    return supertest(server)
      .get('/progress/' + id)
      .then(function(res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({
          progress: {
            some: 'info'
          }
        });
      });
  });
});

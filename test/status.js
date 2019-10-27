var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../server');

describe('/status', function() {
  let server;
  before(function() {
    server = app.server.listen(0);
  });

  after(function() {
    return server.close();
  });

  it('should get status', function() {
    var id = 'teststatus' + Date.now();
    app.statuses[id] = {
      some: 'info'
    };
    return supertest(server)
      .get('/status/' + id)
      .then(function(res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal({
          status: {
            some: 'info'
          }
        });
      });
  });
});

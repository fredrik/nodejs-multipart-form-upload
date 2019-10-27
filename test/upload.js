var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../server');

describe('/upload', function() {
  let server;
  before(function() {
    server = app.server.listen(0);
  });

  after(function() {
    return server.close();
  });

  it('should upload', function() {
    var id = 'testupload' + Date.now();
    return supertest(server)
      .post('/upload/' + id)
      .set('content-type', 'multipart/form-data')
      .field('title', 'test' + Date.now())
      .field('filename', '13157700051593730_2011-09-11_15.41_1315770072221_.mp3')
      .attach('file', '13157700051593730_2011-09-11_15.41_1315770072221_.mp3')
      .then(function(res) {
        expect(res.status).to.equal(200);
        expect(res.text).to.contain('Dictation sent for transcription.\ntemp:filename\ndata/upload_');
      });
  });
});

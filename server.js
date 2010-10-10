var sys        = require('sys'),
    path       = require('path'),
    http       = require('http'),
    formidable = require('./lib/formidable'),
    paperboy   = require('./lib/paperboy');

var PUBLIC = path.join(path.dirname(__filename), 'public');

http.createServer(function(req, res) {
  var progresses = {}

  // parse a file upload using formidable
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.uploadDir = './data';
    form.keepExtensions = true;

    // keep track of progress.
    form.addListener('progress', function(recvd, expected) {
      progress = (recvd / expected * 100).toFixed(2);
      progresses['unique_key'] = progress
    });

    // done.
    form.parse(req, function(error, fields, files) {
      var path     = files['file']['path'],
          filename = files['file']['filename'],
          mime     = files['file']['mime']
      res.writeHead(200, {'content-type': 'text/html'});
      res.write('<textarea>');
      res.write(filename + ' landed at ' + path + '\n');
      res.write('</textarea>')
      res.end()
    });
    return;
  }

  // let paperboy handle any static content.
  paperboy
    .deliver(PUBLIC, req, res)
    .after(function(statCode) {
      sys.log('Served Request: ' + statCode + ' ' + req.url)
    })
    .otherwise(function() {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not Found');
      res.end();
    });

}).listen(8000, '127.0.0.1');

sys.log('ready at http://localhost:8000/')
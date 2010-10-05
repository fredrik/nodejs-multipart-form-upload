var sys        = require('sys'),
    path       = require('path'),
    http       = require('http'),
    formidable = require('./lib/formidable'),
    paperboy   = require('./lib/paperboy');

var PUBLIC = path.join(path.dirname(__filename), 'public');

http.createServer(function(req, res) {

  // parse a file upload using formidable
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
      form.parse(req, function(fields, files) {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end('<textarea>heh</textarea>')
        // res.write('received upload:\n\n');
        // res.end(sys.inspect({fields: fields, files: files}));
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
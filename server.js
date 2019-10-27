var bunyan = require('bunyan');
var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');
var http = require('http');
var formidable = require('./lib/formidable');
var paperboy = require('./lib/paperboy');

var log = bunyan.createLogger({
  name: 'nodejs-sphinx'
});

var PUBLIC = path.join(path.dirname(__filename), 'public');
var devmode = false;
var port = 8126;
if (devmode) {
  port = 8124;
}
var statuses = {};
var progresses = {};
var metadata = {};

var child;

function puts(error) {
  log.error(error);
};

function logsAndFlagsFresh(error, uuid, stdout, stderr) {
  log.error(error);
  var setFresh = function() {
    statuses[uuid] = "transcription fresh";
    log.info("\nProcessed uuid: " + uuid + " set to: " + statuses[uuid] + "\n\n");
  }
  return setFresh;
};

function handleError(err, req, res) {
  log.error('Error processing upload', err);
  res.writeHead(500, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify({
    message: err.message,
    status: 500
  }));
  res.end();
}

function handleUpload(req, res) {
  var uuid = match[1];
  uuid = uuid.replace(/.mp3/, "");
  uuid = uuid.replace(/.srt/, "");
  uuid = uuid.replace(/_client/, "");
  uuid = uuid.replace(/_server/, "");
  log.info("Receiving transcription request: " + uuid);

  var form = new formidable.IncomingForm();
  form.uploadDir = './data';
  form.keepExtensions = true;

  // keep track of progress.
  form.addListener('progress', function(recvd, expected) {
    progress = (recvd / expected * 100).toFixed(2);
    progresses[uuid] = progress;
  });

  form.parse(req, function(error, fields, files) {
    var path = files['file']['path'],
      filename = files['file']['filename'] || 'temp',
      mime = files['file']['mime'];
    log.info({
      filename: filename,
      path: path
    }, 'Users file: ' + filename + ':filename\nIs server file: ' + path + ':path\n');
    /*
     * Rename to original name (sanitize, although it shoudl already be sanitized by the android client.)
     */
    var safeFilename = filename.replace(/[^\w\.]/g, "_");
    safeFilename = safeFilename.replace(/[;:|@&*/\\]/g, "_");
    //safeFilename=safeFilename.replace(/_client\./,".");
    safeFilename = safeFilename.replace(/\.mp3/, ".amr");
    var tempdir = "../nodejs-pocketsphinxtemp/";
    fs.mkdirSync(tempdir);
    fs.renameSync(path, tempdir + safeFilename);
    safeFilenameServer = safeFilename.replace(/_client/, "_server");

    var subtitleregex = new RegExp('(.+).srt');
    var matchsubtitle = subtitleregex.exec(filename);
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    if (matchsubtitle) {
      if (statuses[uuid] === "dictation recieved") {
        res.write("Transcription machine is thinking...\n");
      } else {
        res.write("Server is Processing.\n");
      }
      res.write(filename + ':filename\n' + path + ':path\n');
      //not using closure to set fresh, instead, running sphinx every time the user uploads the srt of the same uuid. this lets the user control the transcription more.
      if (statuses[uuid] === "dictation received" || statuses[uuid] === "transcription nothing fresh") {
        var runTranscription = function(uuid) {
          var uuidchange = uuid; //local variable bound by closure
          exec("sh audio2text.sh " + safeFilename.replace(/_client\.srt/, ""), puts);
          var setFresh = function() {
            statuses[uuidchange] = "transcription fresh";
            log.info("Processed uuid: " + uuidchange + " set to: " + statuses[uuidchange]);
          }
          //http://stackoverflow.com/questions/111102/how-do-javascript-closures-work
          return setFresh;
        }
        var resultFresh = runTranscription(uuid);
        setTimeout(resultFresh, 30000); //this is running before exec finishes.
      }

      /*
       * copy the file to the response, if the status was dictation received
       * and we just got the client .srt, then thi should copy the client .srt
       * with the timecode from audio2text saying that the transcription
       * will apear below when it is ready
       *
       * other wise if the transcription is fresh it will provide
       * the transcription
       */
      fs.readFile(tempdir + safeFilenameServer, "binary", function(err, file) {
        if (err) {
          //res.sendHeader(500, {"Content-Type": "text/plain"});
          log.info("There was an err reading the file" + err + "\nReturning nothing to the user\n");
          //res.write("The machine transcription hasn't returned any hypotheses yet.\n");
          //log.info("The machine transcription hasn't returned any hypotheses yet.\n");

        } else {
          log.info("\nReturning the machine transcription to the user.\n");
          log.info("___________________________+++_____________________\n");
          res.write(file, "binary");
          res.end();
          log.info(file);
          log.info("___________________________+++_____________________\n");
          exec("date", puts);
          log.info("Returned above transcription to user.\n");
        }
      });
      statuses[uuid] = "transcription nothing fresh"
      log.info("Server's transcription was returned to client. ");
    } else {
      //if the user just sent an mp3/amr
      res.write("Dictation sent for transcription.\n");
      res.write(filename + ':filename\n' + path + ':path\n');
      res.end();
      statuses[uuid] = "dictation received";
    }
    exec("date", puts);
    log.info("Finished upload processing.");
  });
}

function handleUpdate(req, res) {
  uuid = match[1];
  var form = new formidable.IncomingForm();
  form.addListener('field', function(name, value) {
    log.info("fresh metadata for " + uuid + ": " + name + " => " + value + "\n")
    metadata[uuid] = metadata[uuid] || {};
    metadata[uuid][name] = value;
  });
  form.parse(req, function(error, fields, files) {
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.write(JSON.stringify({
      'metadata': metadata[uuid]
    }));
    log.info(metadata[uuid], 'Done parsing form');
    res.end();
  });
}

function handleStatus(req, res) {
  uuid = match[1];
  uuid = uuid.replace(/.mp3/, "");
  uuid = uuid.replace(/.srt/, "");
  uuid = uuid.replace(/_client/, "");
  uuid = uuid.replace(/_server/, "");

  res.writeHead(200, {
    'content-type': 'application/json'
  });
  res.write(JSON.stringify({
    'status': statuses[uuid]
  }));
  res.end();

  exec("date", puts);
  log.info({
    'status': statuses[uuid]
  }, uuid + "\nReplied to status request: ");
  log.info("\n\n");
}

function handleProgress(req, res) {
  uuid = match[1];
  res.writeHead(200, {
    'content-type': 'application/json'
  });
  res.write(JSON.stringify({
    'progress': progresses[uuid]
  }));
  res.end();
}

function handleStatic(req, res) {
  // let paperboy handle any static content.
  paperboy
    .deliver(PUBLIC, req, res)
    .after(function(statCode) {
      log.info('Served Request: ' + statCode + ' ' + req.url)
    })
    .otherwise(function() {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('Not Found');
      res.end();
    });
}

var server = http.createServer(function(req, res) {
  /*TODO check for API key and non banned install id in this regex */
  regex = new RegExp('/upload/(.+)');
  match = regex.exec(req.url);
  if (match && req.method.toLowerCase() == 'post') {
    try {
      handleUpload(req, res);
    } catch (err) {
      handleError(err, req, res);
    }
    return;
  }

  // (update) metadata
  regex = new RegExp('/update/(.+)');
  match = regex.exec(req.url);
  if (match && req.method.toLowerCase() == 'post') {
    try {
      handleUpdate(req, res);
    } catch (err) {
      handleError(err, req, res);
    }
    return;
  }
  // respond to status queries
  regex = new RegExp('/status/(.+)');
  match = regex.exec(req.url);
  if (match) {
    try {
      handleStatus(req, res);
    } catch (err) {
      handleError(err, req, res);
    }
    return;
  }

  // respond to progress queries.
  regex = new RegExp('/progress/(.+)');
  match = regex.exec(req.url);
  if (match) {
    try {
      handleProgress(req, res);
    } catch (err) {
      handleError(err, req, res);
    }
    return;
  }

  handleStatic(req, res);
})

if (!module.parent) {
  server.listen(port);
  log.info('ready at http://localhost:' + port + '/')
} else {
  module.exports = {
    server: server,
    statuses: statuses,
    progresses: progresses,
    metadata: metadata,
  };
}


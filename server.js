var fs         = require('fs'),
    exec       = require('child_process').exec,
    sys        = require('sys'),
    path       = require('path'),
    http       = require('http'),
    formidable = require('./lib/formidable'),
    paperboy   = require('./lib/paperboy');

var PUBLIC = path.join(path.dirname(__filename), 'public');

var statuses = {};
var progresses = {};
var metadata   = {};

var child;

http.createServer(function(req, res) {
  /*TODO check for API key and non banned install id in this regex */
  regex = new RegExp('/upload/(.+)');
  match = regex.exec(req.url);
  if (match && req.method.toLowerCase() == 'post') {
    var uuid = match[1];
    uuid = uuid.replace(/.mp3/,"");
    uuid = uuid.replace(/.srt/,"");
    uuid = uuid.replace(/_client/,"");
    uuid = uuid.replace(/_server/,"");
    sys.print("Receiving transcription request: "+uuid+'\n');
    
    var form = new formidable.IncomingForm();
    form.uploadDir = './data';
    form.keepExtensions = true;

    // keep track of progress.
    form.addListener('progress', function(recvd, expected) {
      progress = (recvd / expected * 100).toFixed(2);
      progresses[uuid] = progress;
    });

    form.parse(req, function(error, fields, files) {
      var path     = files['file']['path'],
          filename = files['file']['filename'],
          mime     = files['file']['mime'];
      res.writeHead(200, {'content-type': 'text/html'});
      var subtitleregex = new RegExp('(.+).srt');
      var matchsubtitle = subtitleregex.exec(filename);
      if(matchsubtitle){
        //keep track of status.
        statuses[uuid] = "transcription nothing fresh";
        res.write("Transcription results received.\n");
      }else{
        //keep track of status
        statuses[uuid] = "dictation received";
        res.write("Dictation sent for transcription.\n");
      }

      res.write(filename + ':filename\n' + path + ':path\n');
      sys.print('Users file: '+filename + ':filename\nIs server file: ' + path +  ':path\n');
      /*
       * Rename to original name (sanitize, although it shoudl already be sanitized by the android client.)
       */
      var safeFilename=filename.replace(/[^\w\.]/g,"_");
      safeFilename=safeFilename.replace(/[;:|@&*/\\]/g,"_");
      var datadir = "../nodejs-pocketsphinxdata/";
      fs.renameSync(path,datadir+safeFilename);

      /*TODO open the coressponding _finished.srt and paste its contents in the
       * response res use git repository to do diffs on the srt.
       */
      function puts(error, stdout, stderr) { sys.puts(stdout) };
      if(matchsubtitle){
        //exec("cd ../nodejs-pocketsphinxdata/",puts);
        exec("cp "+datadir+safeFilename+" "+datadir+safeFilename.replace(/_client\.srt/,"_server.srt"),puts);
        //exec("ls -al "+datadir,puts);

        res.write("0:00:00.020,0:00:00.020\nBelow are the results of the machine transcription.\n\n");
        sys.print("Server's transcription was returned to client. "+'\n');
      }else{
        //statuses[uuid]="dictation received";
        /*open bash script, call back to change the status to finished*/
        //statuses[uuid]="transcription fresh";
      }
      res.end();
      sys.print("Finished upload."+'\n');
    });
    
    return;
  }

  // (update) metadata
  regex = new RegExp('/update/(.+)');
  match = regex.exec(req.url);
  if (match && req.method.toLowerCase() == 'post') {
    uuid = match[1];
    var form = new formidable.IncomingForm();
    form.addListener('field', function(name, value) {
      sys.print("fresh metadata for "+uuid+": "+name+" => "+value+"\n")
      metadata[name] = value;
    });
    form.parse(req);
  }
  // respond to status queries
  regex = new RegExp('/status/(.+)');
  match = regex.exec(req.url);
  if (match) {
    uuid = match[1];
    uuid = uuid.replace(/.mp3/,"");
    uuid = uuid.replace(/.srt/,"");
    uuid = uuid.replace(/_client/,"");
    uuid = uuid.replace(/_server/,"");

    res.writeHead(200, {'content-type': 'application/json'});
    res.write(JSON.stringify({'status': statuses[uuid]}));
    res.end();
    sys.print("Replied to status request: "+JSON.stringify({'status': statuses[uuid]}));
    sys.print("\n\n");
  }

  // respond to progress queries.
  regex = new RegExp('/progress/(.+)');
  match = regex.exec(req.url);
  if (match) {
    uuid = match[1];
    res.writeHead(200, {'content-type': 'application/json'});
    res.write(JSON.stringify({'progress': progresses[uuid]}));
    res.end();
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

}).listen(8126);

sys.log('ready at http://localhost:8126/')

// random numbers that look like GUIDs - http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
function S4()   { return (((1+Math.random())*0x10000)|0).toString(16).substring(1); }
function guid() { return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()); }

$(document).ready(function() {
  $('#submit_button').click(function(e) {
    var file = $("input:file").val();

    if (file == '') {
      $('#status').css({background: 'red'});
      $('#status').html('INSERT DISK.')
    } else {
      // ok.
      $('#status').css({background: 'white'});
      $('#status').html('uploading: ' + file);
      // TODO: disable submit button.

      // submit form in hidden iframe.
      var iframe = $('<iframe name="postframe" id="postframe" class="hidden" src="about:none" />');
      $('div#target').html(iframe);
      $('#uploadform').attr('target', 'postframe');
      $('#uploadform').attr('action', '/upload/'+guid());
      $('#uploadform').submit();

      $('#postframe').load(function() {
        var status = $('#postframe')[0].contentDocument.body.textContent;
        $('div#status').html(status);
      });

      // TODO: poll localhost:8000/progress
    }
  })
});

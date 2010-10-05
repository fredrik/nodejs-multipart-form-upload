// empties
$(document).ready(function() {
  // register event on submit_button#click()
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
      $('#uploadform').submit();

      $('#postframe').load(function() {
        iframecontents = $('#postframe')[0].contentDocument.body.textContent;
        $('div#status').html(iframecontents);
      });

      // TODO: start polling localhost:8000/status
    }
  })
});

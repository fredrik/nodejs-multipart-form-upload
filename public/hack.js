// empties
$(document).ready(function() {
  // register event on submit_button#click()
  $('#submit_button').click(function(e) {

    var f = $("input:file");
    if (f.val() == '') {
      $('#status').css({background: 'red'});
      $('#status').html('INSERT DISK.')
    } else {
      $('#status').css({background: 'white'});
      $('#status').html('uploading: ' + f.val());
      // TODO: disable submit button.
      // TODO: submit form.
      // TODO: start polling localhost:8000/status
    }
  })
});

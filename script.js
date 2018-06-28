$(document).ready(function() {
  var characterCount = function( elem, maxChars, span_id) {
    $( elem ).keyup( function() {
      if ($(elem).val().length == 0) {
        $(span_id).text('');
      }
      else {
        $(span_id).text(maxChars - $(elem).val().length + ' characters remaining.');
      };
    });
  };

  var confirmPassword = function() {
    var $elem = $( 'input[name=password_confirmation]' );
    $elem.keyup( function() {
      if ($elem.val().length == 0){
        $('#password_tracker').text('');
      } else if ($elem.val() != $('input[name=password]').val()){
        $('#password_tracker').text('Passwords do not match...');
      } else {
        $('#password_tracker').text('Passwords match!');
      };
    });
  };

  var validateForm = function() {
    $('form').submit( function( event ) {
      event.preventDefault();
      if ($('#short_text').val().length < 4) {
        $('#short_text').css('border-color', 'red');
        $('#short_text_error').text('Entry must be at least 4 characters long.');
      } else if ($('#short_text').val().length > 32) {
        $('#short_text').css('border-color', 'red');
        $('#short_text_error').text('Entry must less than 32 characters long.');
      }; 

      if ($('#long_text').val().length < 4) {
        $('#long_text').css('border-color', 'red');
        $('#long_text_error').text('Entry must be at least 4 characters long.');
      } else if ($('#long_text').val().length > 140) {
        $('#long_text').css('border-color', 'red');
        $('#long_text_error').text('Entry must be less than 140 characters long.');
      }; 
    })
  };

  characterCount($('#short_text'), 32, '#short_text_countdown');
  characterCount($('textarea'), 140, '#long_text_countdown');
  characterCount($('input[name=password]'), 16, '#password_countdown');
  characterCount($('input[name=password_confirmation]'), 16, '#password_confirmation_countdown');
  confirmPassword();
  validateForm();
});
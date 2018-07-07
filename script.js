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
        return false;
      } else {
        $('#password_tracker').text('Passwords match!');
        return true;
      };
    });
  };

  var reddenBorder = function( elem ) {
    $( elem ).css('border-color', 'red');
  };

  var issueWarning = function( elem, minLength, maxLength ) {
    if ($(elem).val().length < minLength) {
        reddenBorder(elem);
        $(`${elem}_error`).text(`Entry must be at least ${minLength} characters long.`);
      } else if ($(elem).val().length > maxLength) {
        reddenBorder(elem);
        $(`${elem}_error`).text(`Entry must less than ${maxLength} characters long.`);
      };    
  }

  var validateForm = function() {
    $('form').submit( function( event ) {
      event.preventDefault();
      issueWarning('#short_text', 4, 32);
      issueWarning('#long_text', 4, 140);
      issueWarning('#password',4, 16);
      issueWarning('#password_confirmation', 4, 16);
      if (!confirmPassword()) {
        reddenBorder('#password_confirmation');
        $('#password_confirmation_error').text('Passwords do not match!');
      }
    })
  };

  var dropdown = function() {
    $("#options").hide();

    $("input[name=selection]").mouseenter( function(){
      $("#options").slideDown();
    });

    $('.option').hover( function() {
      $(this).css('cursor', 'pointer');
      $(this).css('background-color', 'grey');
    }, function () {
      $(this).css('background-color', 'white');
    } );

    $("#options").mouseleave( function(){
      $("#options").slideUp();
    });

    $('.option').click(function() {
      $("input[name=selection]").val($(this).text());
      $("#options").slideUp();
    });
  }

  var tagBoxHover = function( elem ){
    $('#MNS').mouseover( function(e){
      $(elem).show();
      $(elem).css({
        top: e.pageY - 50,
        left: e.pageX - 50
      });
    });
  }

  var hideTagBox = function( elem ) {
    $(elem).mouseout( function(){
      $(this).hide();
    });
  }

  let boxNumber = 1;
  var situateTagBox = function() {

    let $tagBox = $("<div class='tag-box'></div");
    let $targetBox = $("<div class='target-box'></div");
    let $photoTags = $("<div class='photo-tags'></div");
    let $selection = $("<div class='selection'></div");
    let $photoTagName = $("<div class='photo-tag-name'>Jimbo</div> <div class='photo-tag-name'>Steve</div> <div class='photo-tag-name'>Midge</div>");

    $tagBox.addClass(`${boxNumber}`);
    $targetBox.addClass(`${boxNumber}`);
    $photoTags.addClass(`${boxNumber}`);
    $selection.addClass(`${boxNumber}`);
    $photoTagName.addClass(`${boxNumber}`);

    $('body').append($tagBox);
    $tagBox.append($targetBox);
    $tagBox.append($photoTags);
    $photoTags.append($selection);
    $photoTags.append($photoTagName);
    
    $(`.tag-box.${boxNumber}`).hide();
    $(`.photo-tags.${boxNumber}`).hide();
    
    tagBoxHover(`.tag-box.${boxNumber}`);

    $(`.tag-box.${boxNumber}`).click( function(e){
      $('#MNS').off('mouseover');
      $(this).off('mouseout');
      $(`.photo-tags.${boxNumber}`).slideDown();
      $(`.photo-tag-name.${boxNumber}`).slideDown();

      $(`.photo-tag-name.${boxNumber}`).hover( function() {
          $(this).css('cursor', 'pointer');
          $(this).css('background-color', 'grey');
        }, function () {
          $(this).css('background-color', 'white');
        });
      
    });

    $('#MNS').click( function(){
      if ($(`.photo-tag-name.${boxNumber}`).is(':visible')){
        $(`.selection.${boxNumber}`).text('');
        $(`.photo-tags.${boxNumber}`).hide();
        
        tagBoxHover(`.tag-box.${boxNumber}`);
        hideTagBox(`.tag-box.${boxNumber}`);
      };
    });


   $(`.photo-tag-name.${boxNumber}`).click( function(e) {
      e.stopPropagation();
      
      $(`.selection.${boxNumber}`).text($(this).text());
      $(`.photo-tag-name.${boxNumber}`).slideUp();
      reddenBorder($targetBox);
      reddenBorder($photoTags);
      
      boxNumber++

      situateTagBox();
    });

    hideTagBox(`.tag-box.${boxNumber}`);
  }

  characterCount($('#short_text'), 32, '#short_text_countdown');
  characterCount($('#long_text'), 140, '#long_text_countdown');
  characterCount($('#password'), 16, '#password_countdown');
  characterCount($('#password_confirmation'), 16, '#password_confirmation_countdown');
  confirmPassword();
  validateForm();
  dropdown();
  situateTagBox();
});
$(document).ready(function() {

  //===============
  //Form Validation
  //===============

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

  //=============
  //Dropdown Menu
  //=============

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

  //=============
  //Photo Tagging
  //=============

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
  
  //=====
  //Simon
  //=====

  let $panels = [$('#blue'), $('#red'), $('#yellow'), $('#green')];

  let sequence = [];


  var dim = function(square){
    $panels[square].css({
      opacity: .5
    });
  };

  var light = function(square){
    $panels[square].css({
      opacity: 1
    });
  };

  let dimTimeout;
  let lightTimeout; 

  var squareSequence = function(num){ 
    setTimeout( function(){
      dim(num);}, dimTimeout);
    setTimeout( function(){
      light(num);}, lightTimeout);
  };

  let timeout;

  var simonLights = function(seq, i) {
    //clearInterval(timer());
    if (seq[i] == undefined){
      //timer();
      return;
    } else {
      squareSequence(seq[i])
      setTimeout(simonLights, timeout, seq, i+1)
    };
  }

  let countdown;

  var timer = function(){
    countdown = 0;
    setInterval(function(){
      $('#countdown').text(countdown);
      countdown++;
    }, 1000);
  }

  var panelClick = function(panel, upPanelColor, downPanelColor, panelIndex) {
    $(panel).mousedown(function(e) {
      $(this).css('background-color', downPanelColor);  
    });
     $(panel).mouseup( function(e) {
      
      $(this).css('background-color', upPanelColor);
      e.stopPropagation();
      playerRepeatSequence.push(panelIndex);
      
    
      if (playerRepeatSequence[playerRepeatSequence.length - 1] != sequence[playerRepeatSequence.length - 1]) {
        alert("Nope!");
        return false;
      } else if (playerRepeatSequence[playerRepeatSequence.length - 1] == sequence[playerRepeatSequence.length - 1] && playerRepeatSequence.length < sequence.length){
        return;
      } else {
        play();
      };
    });
  }

  let playerRepeatSequence = [];

  var playerRepeat = function() {
    panelClick('#blue', 'blue', 'cyan', 0);
    panelClick('#red', 'red', 'pink', 1);
    panelClick('#yellow', 'yellow', 'LightYellow', 2);
    panelClick('#green', 'green', 'LightGreen', 3);
  }

  var play = function() {
    playerRepeatSequence = [];
    sequence.push(Math.floor(Math.random() * $panels.length));
    simonLights(sequence, 0);
    //if (round % 4 == 0) {
        timeout /= 1.2;
        dimTimeout /= 1.2;
        lightTimeout /= 1.2;
      //};
    round++;
  }
  characterCount($('#short_text'), 32, '#short_text_countdown');
  characterCount($('#long_text'), 140, '#long_text_countdown');
  characterCount($('#password'), 16, '#password_countdown');
  characterCount($('#password_confirmation'), 16, '#password_confirmation_countdown');
  confirmPassword();
  validateForm();
  dropdown();
  situateTagBox();
  playerRepeat();
  let round;
  $('#play').click( function() {
    round = 1;
    dimTimeout = 500;
    lightTimeout = 1000;
    timeout = 1000; 
    sequence = [];
    play();
  });
});
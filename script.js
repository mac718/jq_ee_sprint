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

  
  let $panels = [$('#blue'), $('#red'), $('#yellow'), $('#green')];

  let sequence = [];

  //sequence.push(Math.floor(Math.random() * $panels.length));


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

  var squareSequence = function(num){  
    setTimeout( function(){
      dim(num);}, 500);
    setTimeout( function(){
      light(num);}, 1000);
  };


    //squareSequence(1);
   //for ( let i = 0; i < sequence.length; i++ ) {
    //setTimeout( function(){
      //dim(i);
      //light(i);
    //}, 1000*i+1);
    //};

    //squareSequence(sequence[i], 

  var simonLights = function(seq, i) {
    if (seq[i] == undefined){
      return;
    } else {
      squareSequence(seq[i])
      setTimeout(simonLights, 500, seq, i+1)
    };
  }

  let playerRepeatSequence = [];
  var playerRepeat = function() {

    $('#blue').mousedown(function(e) {
    $(this).css('background-color', 'cyan');
    //e.stopPropagation();
      
    });
     $('#blue').mouseup( function(e) {
      
      $(this).css('background-color', 'blue');
      e.stopPropagation();
      playerRepeatSequence.push(0);
      
    
      if (playerRepeatSequence[playerRepeatSequence.length - 1] != sequence[playerRepeatSequence.length - 1]) {
        alert("Nope!");
        return false;
      } else if (playerRepeatSequence[playerRepeatSequence.length - 1] == sequence[playerRepeatSequence.length - 1] && playerRepeatSequence.length < sequence.length){
        return;
      } else {
        play();
      };
      //if (sequence.length == playerRepeatSequence.length) {
        //return true;
      //};
    });
    $('#green').mousedown(function(e) {
      $(this).css('background-color', 'LightGreen');
    //e.stopPropagation();
      
    });
     $('#green').mouseup( function(e) {
      
      $(this).css('background-color', 'green');
      e.stopPropagation();
      playerRepeatSequence.push(3);
      

      
      if (playerRepeatSequence[playerRepeatSequence.length - 1] != sequence[playerRepeatSequence.length - 1]) {
        alert("Nope!");
        return false;
      } else if (playerRepeatSequence[playerRepeatSequence.length - 1] == sequence[playerRepeatSequence.length - 1] && playerRepeatSequence.length < sequence.length){
        return;
      } else {
        play();
      };
      
      //if (sequence.length == playerRepeatSequence.length) {
        //return true;
      //};
    });
    $('#red').mousedown(function(e) {
      $(this).css('background-color', 'pink');
    //e.stopPropagation();

    });
      
     $('#red').mouseup( function(e) {
      

      $(this).css('background-color', 'red');
      e.stopPropagation();
      playerRepeatSequence.push(1);
    

      
      if (playerRepeatSequence[playerRepeatSequence.length - 1] != sequence[playerRepeatSequence.length - 1]) {
        alert("Nope!");
        return false;
      } else if (playerRepeatSequence[playerRepeatSequence.length - 1] == sequence[playerRepeatSequence.length - 1] && playerRepeatSequence.length < sequence.length){
        return;
      } else {
        play();
      };
    });
      
      
      //if (sequence.length == playerRepeatSequence.length) {
        //return true;
      //};
    $('#yellow').mousedown(function(e) {
      $(this).css('background-color', 'LightYellow');
    //e.stopPropagation();
       
    });
    
    $('#yellow').mouseup( function(e) {
      //let i = 0;

      $(this).css('background-color', 'yellow');
      //if (i < 1){
        e.stopPropagation();
      playerRepeatSequence.push(2);
    //};
      //i++
      

      
       if (playerRepeatSequence[playerRepeatSequence.length - 1] != sequence[playerRepeatSequence.length - 1]) {
        alert("Nope!");
        return;
      } else if (playerRepeatSequence[playerRepeatSequence.length - 1] == sequence[playerRepeatSequence.length - 1] && playerRepeatSequence.length < sequence.length){
        //playerRepeat();
      } else {
        play();
      };
     
      //if (sequence.length == playerRepeatSequence.length) {
        //return true;
      //};
    });
    
  }


  //playerRepeat();
  

  var play = function() {
    playerRepeatSequence = [];
    sequence.push(Math.floor(Math.random() * $panels.length));
    simonLights(sequence, 0);
    
  }

  //$('#play').click(function(){
  //    play();
  //  });
playerRepeat();
$('#play').click( function() {
  play();
})
  

  

  
  

  

  characterCount($('#short_text'), 32, '#short_text_countdown');
  characterCount($('#long_text'), 140, '#long_text_countdown');
  characterCount($('#password'), 16, '#password_countdown');
  characterCount($('#password_confirmation'), 16, '#password_confirmation_countdown');
  confirmPassword();
  validateForm();
  dropdown();
  situateTagBox();
});
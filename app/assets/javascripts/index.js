status = 1
playedCounter = 0

var ready = function() {
  $(window).keyup(handleKeypressStart)
}

$(document).on('ready', ready);
$(document).on('load', ready);

var handleKeypressStart = function (){
    if (status == 1) {
      $('#toptier-logo').fadeOut(1000);
      status++;
      loadPage();
    }
}

var loadPage = function () {
    var context = $('#demo')[0].getContext('2d');
    var ficha = $('#chip')[0];
    var clock = $('#clock-main')[0];
    var canvasMove = $('#movementCanvas')[0].getContext('2d');
    var audio = document.createElement("audio");
    audio.src = "../assets/music.mp3";

    window.onkeyup = Game.handleKeypress;

    Game.run(context, ficha, clock, canvasMove, audio);
};

var restartPage = function(){

  lose = false;
  allMovements = [];
  movements = {
    allMovements,
    getMovement: function(pos){
      return this.allMovements[pos];
    },
  }

  $('#card-movements').attr('class', 'card');

  $('#movementCanvas')[0].getContext('2d').clearRect(0, 0, movementCanvas.width, movementCanvas.height);
  // $('#right').attr('class', 'movements-container');
  $('#chip').css( {transform: 'scale(1.0)'} );
  clearInterval(window.timeinterval);
  $('.restart-button').attr('disabled', true);
  loadPage();
}




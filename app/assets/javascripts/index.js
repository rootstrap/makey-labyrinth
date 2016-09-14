status = 1
playedCounter = 0

var ready = function() {
  $(window).keyup(handleKeypressStart);

  $('#restart-button').on('click', restartPage);
  $('#register-button, #register-button-win').on('click', showRegisterModal);

  playVideo();
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
    playedCounter = 0;
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
  playedCounter++;
  lose = false;
  allMovements = [];
  movements = {
    allMovements,
    getMovement: function(pos){
      return this.allMovements[pos];
    },
  }
  $('#lose-modal').modal('hide');

  $('#card-movements').attr('class', 'card');

  $('#movementCanvas')[0].getContext('2d').clearRect(0, 0, movementCanvas.width, movementCanvas.height);
  $('#chip').css( {transform: 'rotate(-360deg) scale(1.0)'} );
  clearInterval(window.timeinterval);
  $('.restart-button').attr('disabled', true);
  loadPage();
}


var showRegisterModal = function (){
  $('#lose-modal').modal('hide');
  $('#win-modal').modal('hide');
  $('#register-modal').modal('show');
}

var playVideo = function() {
  var myVideo = $('#video1');
  myVideo.autoplay = true;
  // myVideo.play();

  myVideo.on('ended', function () { this.play(); });
}

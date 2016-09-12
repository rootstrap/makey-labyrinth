status = 1

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
    var clock = $('#clockdiv')[0];
    var canvasMove = $('#can')[0].getContext('2d');
    var audio = document.createElement("audio");
    audio.src = "../assets/music.mp3";

    window.onkeyup = Game.handleKeypress;

    Game.run(context, ficha, clock, canvasMove, audio);
};



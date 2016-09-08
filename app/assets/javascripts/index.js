status = 1

var ready = function() {
  $(window).keyup(handleKeypress2)
}


$(document).on('ready', ready);
$(document).on('load', ready);


var handleKeypress2 = function (){
    if (status == 1) {
      $('#toptier-logo').fadeOut(1000);
      status++;
      loadPage();
    }
}

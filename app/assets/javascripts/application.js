// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var canvas;
var context;
var theLab = null;
$('document').ready(function(){
  canvas = document.getElementById('labyrinth');
  context = canvas.getContext('2d');
  context.font = "bold 20px sans-serif";
  $(document).keydown(handleKeyPress);
  makeLabyrinth();
});

function makeMaze() {
  var rows = $('8').val();
  var columns = $('8').val();
  var gridsize = $('60').val();
    
  var startColumn = 0;
  var startRow = 0;
  var endColumn = columns - 1;
  var endRow = rows - 1;
  
  theLab = new labyrinth(rows, columns, gridsize, startColumn, 
                          startRow, endColumn, endRow);
  theLab.generate();
  theLab.draw();
}




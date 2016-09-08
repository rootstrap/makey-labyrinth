var Loader = {
    images: {}
};

Loader.loadImage = function (key, src) {
    var img = new Image();

    var d = new Promise(function (resolve, reject) {
        img.onload = function () {
            this.images[key] = img;
            resolve(img);
        }.bind(this);

        img.onerror = function () {
            reject('Could not load image: ' + src);
        };
    }.bind(this));

    img.src = src;
    return d;
};

Loader.getImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};

//
// Keyboard handler
//

var Keyboard = {};

Keyboard.SPACE = 32;
Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;

Keyboard._keys = {};

Keyboard.listenForEvents = function (keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach(function (key) {
        this._keys[key] = false;
    }.bind(this));
}

Keyboard._onKeyDown = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = true;
    }
};

Keyboard._onKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
    }
};

Keyboard.isDown = function (keyCode) {
    if (!keyCode in this._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
};




//
// Game object
//

var Game = {};

Game.run = function (context, chip, clock, canvasMove) {
    this.ctx = context;
    this._previousElapsed = 0;
    this.chip = chip;
    this.start = false;
    this.clock = clock;
   // this.setMovement = setMovement;
    this.canvasMove = canvasMove;

    var p = this.load();
    Promise.all(p).then(function (loaded) {
        this.init();
        window.requestAnimationFrame(this.tick);
    }.bind(this));
};

Game.tick = function (elapsed) {
    //window.requestAnimationFrame(this.tick);

    // clear previous frame
    this.ctx.clearRect(0, 0, 624, 688);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    this._previousElapsed = elapsed;

    this.update(delta);
    this.render();
    var deadline = new Date(Date.parse(new Date()) + 10 * 1000);
    Game.initClock('clockdiv', deadline);

}.bind(Game);

// override these methods to create the demo
Game.init = function () {};
Game.update = function (delta) {};
Game.render = function () {};
Game.moveChip = function () {};
Game.initClock = function (id, deadline) {};
Game.handleKeypress = function(event) {};
//
// start up function
//

var loadPage = function () {
    console.log('window on load aca')
    var context = document.getElementById('demo').getContext('2d');
    var ficha = document.getElementById('chip');
    var clock = document.getElementById('clockdiv');
   // var setMovement =  document.getElementById('kinput');
    var canvasMove = document.getElementById('can').getContext('2d');

    // setMovement.onkeyup = handleKeypress
    window.onkeyup = handleKeypress;



    Game.run(context, ficha, clock, canvasMove);
};



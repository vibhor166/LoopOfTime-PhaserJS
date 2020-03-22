class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }
  preload() {
    //load our images or sounds

    //////////////////////////////////////////////////

    // this.load.image('button1', 'images/ui/buttons/1/1.png');
    // this.load.image('button2', 'images/ui/buttons/1/5.png');
    // this.load.audio('cat', ['audio/meow.mp3', 'audio/meow.ogg']);
    // this.load.audio('background', [
    //   'audio/background.mp3',
    //   'audio/background.ogg'
    // ]);

    //////////////////////////////////////////////////

    this.load.image('road', 'images/road.jpg');
    this.load.spritesheet('cars', 'images/cars.png', {
      frameWidth: 60,
      frameHeight: 126
    }); //as it is a spritesheet, we need to give it framewidth and frameheight
    this.load.image('line', 'images/line.png');
    this.load.image('pcar1', 'images/pcar1.png');
    this.load.image('pcar2', 'images/pcar2.png');
    this.load.image('cone', 'images/cone.png');
    this.load.image('barrier', 'images/barrier.png');
    this.load.image('1', 'images/1.png');
    this.load.image('2', 'images/2.png');
    this.load.image('3', 'images/3.png');
    this.load.image('4', 'images/4.png');
    this.load.image('toggleBack', 'images/ui/toggles/1.png');
    this.load.image('sfxOff', 'images/ui/icons/sfx_off.png');
    this.load.image('sfxOn', 'images/ui/icons/sfx_on.png');
    this.load.image('musicOn', 'images/ui/icons/music_on.png');
    this.load.image('musicOff', 'images/ui/icons/music_off.png');

    this.load.audio('backgroundMusic', [
      'audio/random-race.mp3',
      'audio/random-race.ogg'
    ]);
    this.load.audio('boom', ['audio/boom.mp3', 'audio/boom.ogg']);
    this.load.audio('whoosh', ['audio/whoosh.mp3', 'audio/whoosh.ogg']);
  }
  create() {
    //used for defining objects such as space ships or bullets

    ////////////////////////////
    // var gridConfig ={rows:5, cols:5, scene: this};
    // var alignGrid = new AlignGrid(gridConfig);
    // alignGrid.show();
    // var fireText = { color: 'black', fontSize: 30 };
    // var flatButton = new FlatButton({
    //   scene: this,
    //   key: 'button1',
    //   text: 'Fire',
    //   x: 240,
    //   y: 100,
    //   event: 'button_pressed',
    //   params: 'fire_lasers',
    //   textConfig: fireText
    // });
    // var flatButton2 = new FlatButton({
    //   scene: this,
    //   key: 'button2',
    //   text: 'Destruct',
    //   x: 240,
    //   y: 300,
    //   event: 'button_pressed',
    //   params: 'self_destruct'
    // });
    // var toggleButton = new ToggleButton({
    //   scene: this,
    //   backKey: 'toggleBack',
    //   onIcon: 'musicOn',
    //   offIcon: 'musicOff',
    //   event: G.TOGGLE_MUSIC,
    //   X: 240,
    //   Y: 450
    // });

    /////////////////////////
    emitter = new Phaser.Events.EventEmitter();
    controller = new Controller();

    model.gameOver = false;
    model.speed = 1;
    model.score = 0;
    var sb = new SoundButtons({ scene: this });
    // var bar = new Bar({ scene: this, x: 240, y: 320 });
    // bar.setPercent(0.5);
    // emitter.on('button_pressed', this.buttonPressed, this);

    console.log('Ready!');

    this.road = new Road({ scene: this });
    this.road.x = game.config.width * 0.25;
    this.road.makeLines();
    /////////////////////////////
    this.road2 = new Road({ scene: this });
    this.road2.x = game.config.width * 0.75;
    this.road2.makeLines();
    this.road2.car.setFrame(1);

    ////////////////////////////////

    this.alignGrid = new AlignGrid({ scene: this, rows: 5, cols: 5 });
    // this.alignGrid.showNumbers();

    var soundButtons = new SoundButtons({ scene: this });
    this.sb = new ScoreBox({ scene: this });
    this.sb.x = game.config.width / 2;
    this.sb.y = 50;
    emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
  }
  scoreUpdated() {
    if (model.score / 5 == Math.floor(model.score / 5)) {
      model.speed += 0.25;
      if (model.speed > 1.5) {
        model.speed = 1.5;
      }
    }
  }
  update() {
    //this is a constant running loop, if we want to constantly update something, that can be done here
    this.road.moveLines();
    this.road.moveObject();

    this.road2.moveLines();
    this.road2.moveObject();
  }

  customFunc() {
    //we can create our own custom functions here, which we can call when we need them
  }
  // buttonPressed(params) {
  //   console.log(params);
  //   model.musicOn = !model.musicOn;
  //   emitter.emit(G.PLAY_SOUND, 'cat');
  //   this.scene.start('SceneOver');
  // }
}

export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {

    this.load.image('truffles_splash', 'assets/splash/splash.png')

    this.load.image('the_hunt_museum', 'assets/logos/the_hunt_museum.png')
    this.load.image('limerick_museum', 'assets/logos/limerick_museum.png')
    this.load.image('limerick_gallery_of_art', 'assets/logos/limerick_gallery_of_art.png')
    this.load.image('SETU_Ireland_logo', 'assets/logos/SETU_Ireland_logo.png')

    this.load.image('cannon-ball', 'assets/img/cannon-ball.png')

    // Backing Tracks
    this.load.audio('splash_screen_track', ['assets/audio/splash_screen_track.mp3', 'assets/audio/splash_screen_track.ogg']);
    this.load.audio('level_backing_track', ['assets/audio/level_backing_track.mp3', 'assets/audio/level_backing_track.ogg']);

    // Idioms
    this.load.audio('unreal', ['assets/audio/idioms/unreal.mp3', 'assets/audio/idioms/unreal.ogg']);
    this.load.audio('story', ['assets/audio/idioms/story.mp3', 'assets/audio/idioms/story.ogg']);
    this.load.audio('mup', ['assets/audio/idioms/mup.mp3', 'assets/audio/idioms/mup.ogg']);
    this.load.audio('tackies', ['assets/audio/idioms/tackies.mp3', 'assets/audio/idioms/tackies.ogg']);
    this.load.audio('langers', ['assets/audio/idioms/langers.mp3', 'assets/audio/idioms/langers.ogg']);
    this.load.audio('took_a_hopper', ['assets/audio/idioms/took_a_hopper.mp3', 'assets/audio/idioms/took_a_hopper.ogg']);

    this.load.audio('a_boy_the_kid', ['assets/audio/idioms/a_boy_the_kid.mp3', 'assets/audio/idioms/a_boy_the_kid.ogg']);
    this.load.audio('head_like_a_chewed_toffee', ['assets/audio/idioms/head_like_a_chewed_toffee.mp3', 'assets/audio/idioms/head_like_a_chewed_toffee.ogg']);
  }

  create() {
    //this.scene.start('SplashScene')
    this.scene.start('GameScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
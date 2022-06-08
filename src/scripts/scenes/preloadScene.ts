export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {

    this.load.image('the_hunt_museum', 'assets/logos/the_hunt_museum.png')
    this.load.image('limerick_museum', 'assets/logos/limerick_museum.png')
    this.load.image('limerick_gallery_of_art', 'assets/logos/limerick_gallery_of_art.png')
    this.load.image('SETU_Ireland_logo', 'assets/logos/SETU_Ireland_logo.png')

    this.load.image('cannon-ball', 'assets/img/cannon-ball.png')

    this.load.audio('backing-track', ['assets/audio/level01.mp3', 'assets/audio/level01.ogg']);

    // Idioms
    this.load.audio('a_boy_the_kid', ['assets/audio/idioms/a_boy_the_kid.mp3', 'assets/audio/idioms/a_boy_the_kid.ogg']);
    this.load.audio('head_like_a_chewed_toffee', ['assets/audio/idioms/head_like_a_chewed_toffee.mp3', 'assets/audio/idioms/head_like_a_chewed_toffee.ogg']);
  }

  create() {
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
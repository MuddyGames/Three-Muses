import FpsText from '../objects/fpsText'
import FrameText from '../objects/frameText'

export default class ArtiFactScene extends Phaser.Scene {
  timedEvents : Phaser.Time.TimerEvent[] = []
  backingMusic

  element

  constructor() {
    super({
      key: 'ArtiFactScene'
    })
  }

  preload() {
    this.load.script('fractals', 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.0.js');
    this.load.html('test1', 'assets/html/test.html');
  }

  create() {

    this.element = this.add.dom(this.cameras.main.width / 2, 100).createFromCache('test1');

    this.element.setPerspective(800);

    this.backingMusic = this.sound.add('splash_screen_track',{ loop: true })
		this.backingMusic.play()

    // Drop Logos
    this.timedEvents.push(this.time.delayedCall(2000, this.onEventGame, [], this))

  }

  update() {

  }


  private onEventGame() {
    this.scene.start('GameScene')
    this.backingMusic.stop()
  }

}
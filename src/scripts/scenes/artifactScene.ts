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
    this.load.html('test1', 'assets/html/test.html');
  }

  create() {

    this.element = this.add.dom(400, 600).createFromCache('test1');

    this.element.setPerspective(800);

    this.backingMusic = this.sound.add('splash_screen_track',{ loop: true })
		this.backingMusic.play()

    // Drop Logos
    this.timedEvents.push(this.time.delayedCall(2000, this.onEventGame, [], this))

    this.tweens.add({
      targets: this.element,
      y: 300,
      duration: 3000,
      ease: 'Power3'
  });

  }

  update() {

  }


  private onEventGame() {
    this.scene.start('GameScene')
    this.backingMusic.stop()
  }

}
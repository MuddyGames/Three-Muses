import FpsText from '../objects/fpsText'
import FrameText from '../objects/frameText'

export default class ArtiFactScene extends Phaser.Scene {
  timedEvents : Phaser.Time.TimerEvent[] = []
  backingMusic

  constructor() {
    super({
      key: 'ArtiFactScene'
    })
  }

  preload() {
    this.load.script('sketchfab','https://static.sketchfab.com/api/sketchfab-viewer-1.12.0.js')
  }

  create() {

    this.add.dom(350,250).createFromHTML('test')


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
import FpsText from '../objects/fpsText'
import HudText from '../objects/hudText'

export default class Credits extends Phaser.Scene {
  timedEvents : Phaser.Time.TimerEvent[] = []
  backingMusic
  element

  constructor() {
    super({
      key: 'Credits'
    })
  }

  preload() {
    this.load.html('credits', 'assets/credits/credits.html');
  }

  create() {

    this.element = this.add.dom(this.cameras.main.width / 2, 100).createFromCache('credits');

    this.element.setPerspective(800);

    this.backingMusic = this.sound.add('splash_screen_track',{ loop: true })
		this.backingMusic.play()

    // Move to next Artifact
    this.timedEvents.push(this.time.delayedCall(2000, this.onEventGame, [], this))

  }

  update() {

  }


  private onEventGame() {
    this.backingMusic.stop()
    window.location.reload()
    this.scene.start('PreloadScene')
  }
}
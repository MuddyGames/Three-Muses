import FpsText from '../objects/fpsText'
import HudText from '../objects/hudText'

export default class ArtiFactOneScene extends Phaser.Scene {
  timedEvents : Phaser.Time.TimerEvent[] = []
  backingMusic

  element

  constructor() {
    super({
      key: 'ArtiFactOneScene'
    })
  }

  preload() {
    this.load.script('fractals', 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.0.js');
    this.load.html('artifact_one', 'assets/artifacts/artifact_one.html');
  }

  create() {

    this.element = this.add.dom(this.cameras.main.width / 2, 100).createFromCache('artifact_one');

    this.element.setPerspective(800);

    this.backingMusic = this.sound.add('splash_screen_track',{ loop: true })
		this.backingMusic.play()

    // Move to next Artifact
    this.timedEvents.push(this.time.delayedCall(2000, this.onEventGame, [], this))

  }

  update() {

  }


  private onEventGame() {
    this.scene.start('ArtiFactFourScene')
    this.backingMusic.stop()
  }

}
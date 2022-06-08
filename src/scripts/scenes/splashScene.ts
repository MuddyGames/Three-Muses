import FpsText from '../objects/fpsText'
import Logo from '../objects/logo'

export default class SplashScene extends Phaser.Scene {
  fpsText
  timedEvent
  backingMusic

  logo

  constructor() {
    super({
      key: 'SplashScene'
    })
  }

  preload() {

  }

  create() {

    this.backingMusic = this.sound.add('splash_screen_track',{ loop: true })
		this.backingMusic.play()

    this.timedEvent = this.time.delayedCall(10, this.onEventLogo, [], this);

    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)
  }

  update() {
    this.fpsText.update()
  }

  private onEventLogo() {
    this.timedEvent = this.time.delayedCall(2000, this.onEventTHM, [], this);
    this.logo = new Logo(this, this.cameras.main.width / 2, 0, 'the_hunt_museum')
  }

  private onEventTHM() {
    this.logo.destroy();
    this.timedEvent = this.time.delayedCall(2000, this.onEventLM, [], this);
    this.logo = new Logo(this, this.cameras.main.width / 2, 0, 'limerick_museum')
  }

  private onEventLM() {
    this.logo.destroy();
    this.timedEvent = this.time.delayedCall(2000, this.onEventLG, [], this);
    this.logo = new Logo(this, this.cameras.main.width / 2, 0, 'limerick_gallery_of_art')
  }

  private onEventLG() {
    this.logo.destroy();
    this.timedEvent = this.time.delayedCall(2000, this.onEventGame, [], this)
    this.logo = new Logo(this, this.cameras.main.width / 2, 0, 'SETU_Ireland_logo')
  }

  private onEventGame() {
    this.logo.destroy();
    this.scene.start('GameScene')
    this.backingMusic.stop()
  }

}
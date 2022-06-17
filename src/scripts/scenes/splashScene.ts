import FpsText from '../objects/fpsText'
import HudText from '../objects/hudText'
import Logo from '../objects/logo'

export default class SplashScene extends Phaser.Scene {
  // Cycle through logos
  private timedEvents : Phaser.Time.TimerEvent[] = []
  private backingMusic!: Phaser.Sound.BaseSound
  private splashTextTitle!: HudText
  private splashTextSubTitle!: HudText
  private logo!:Logo

  constructor() {
    super({
      key: 'SplashScene'
    })
  }

  preload() {

  }

  create() {
    // Title
    this.splashTextTitle = new HudText(this)
		this.splashTextTitle.setShadow(3, 3)
		this.splashTextTitle.setStroke('#fff', 16);
		this.splashTextTitle.setShadow(2, 2, "#333333", 2, true, true);

    // Sub Title
    this.splashTextSubTitle = new HudText(this)
		this.splashTextSubTitle.setShadow(3, 3)
		this.splashTextSubTitle.setStroke('#fff', 16);
		this.splashTextSubTitle.setShadow(2, 2, "#333333", 2, true, true);

    this.backingMusic = this.sound.add('splash_screen_track',{ loop: true })
		this.backingMusic.play()

    // Drop Logos
    this.logo = new Logo(this, this.cameras.main.width / 2, 0, 'truffles_splash')
    this.timedEvents.push(this.time.delayedCall(4500, this.onEventLogo, ['the_hunt_museum'], this))
    this.timedEvents.push(this.time.delayedCall(5500, this.onEventLogo, ['limerick_museum'], this))
    this.timedEvents.push(this.time.delayedCall(6500, this.onEventLogo, ['limerick_gallery_of_art'], this))
    this.timedEvents.push(this.time.delayedCall(7500, this.onEventLogo, ['SETU_Ireland_logo'], this))
    this.timedEvents.push(this.time.delayedCall(8500, this.onEventGame, [], this))


  }

  update() {

    //this.output = [];

    //this.fpsText.update()

    //for (var i = 0; i < this.timedEvents.length; i++)
    //{
    //    this.output.push('Event.progress: ' + this.timedEvents[i].getProgress().toString().substr(0, 4));
    //}
    //this.text.setText(this.output)
  }

  private onEventLogo(logo) {
    this.logo.destroy();
    this.logo = new Logo(this, this.cameras.main.width / 2, 0, logo)
  }

  private onEventGame() {
    this.logo.destroy();
    this.scene.start('GameScene')
    this.backingMusic.stop()
  }

}
import FpsText from '../objects/fpsText'
import ScoreText from '../objects/scoreText'
import Logo from '../objects/logo'

export default class SplashScene extends Phaser.Scene {
  fpsText
  timedEvents : Phaser.Time.TimerEvent[] = []
  backingMusic

  //output

  logo

  //text

  constructor() {
    super({
      key: 'SplashScene'
    })
  }

  preload() {

  }

  create() {

    //this.text = new FrameText(this)

    this.backingMusic = this.sound.add('splash_screen_track',{ loop: true })
		this.backingMusic.play()

    // Drop Logos
    this.logo = new Logo(this, this.cameras.main.width / 2, 0, 'truffles_splash')
    this.timedEvents.push(this.time.delayedCall(4500, this.onEventLogo, ['the_hunt_museum'], this))
    this.timedEvents.push(this.time.delayedCall(5500, this.onEventLogo, ['limerick_museum'], this))
    this.timedEvents.push(this.time.delayedCall(6500, this.onEventLogo, ['limerick_gallery_of_art'], this))
    this.timedEvents.push(this.time.delayedCall(7500, this.onEventLogo, ['SETU_Ireland_logo'], this))
    this.timedEvents.push(this.time.delayedCall(8500, this.onEventGame, [], this))

    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    //this.add
    //  .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
    //    color: '#000000',
    //    fontSize: '24px'
    //  })
    //  .setOrigin(1, 0)
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
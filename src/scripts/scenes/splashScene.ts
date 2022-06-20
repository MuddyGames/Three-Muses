import FpsText from '../objects/fpsText'
import HudText from '../objects/hudText'
import Logo from '../objects/logo'

export default class SplashScene extends Phaser.Scene {
  // Cycle through logos
  private timedEvents: Phaser.Time.TimerEvent[] = []
  private backingMusic!: Phaser.Sound.BaseSound
  private logo!: Logo

  // Screen dimensions
  private screenX!: number
  private screenY!: number

  constructor() {
    super({
      key: 'SplashScene'
    })
  }

  preload() {

  }

  create() {

    // Setup Screen Dimensions
    let {
      width,
      height
    } = this.sys.game.canvas;
    this.screenX = width;
    this.screenY = height

    this.backingMusic = this.sound.add('splash_screen_track', {
      loop: true
    })
    this.backingMusic.play()

    // Drop Logos
    this.logo = new Logo(this, this.cameras.main.width / 2, 0, 'truffles_splash')
    this.timedEvents.push(this.time.delayedCall(4500, this.onEventLogo, ['the_hunt_museum'], this))
    this.timedEvents.push(this.time.delayedCall(5500, this.onEventLogo, ['limerick_museum'], this))
    this.timedEvents.push(this.time.delayedCall(6500, this.onEventLogo, ['limerick_gallery_of_art'], this))
    this.timedEvents.push(this.time.delayedCall(7500, this.onEventLogo, ['SETU_Ireland_logo'], this))
    this.timedEvents.push(this.time.delayedCall(8500, this.onEventGame, [], this))


  }

  update(time: number, delta: number): void {

  }

  private onEventLogo(logo): void {
    this.logo.destroy();
    this.logo = new Logo(this, this.cameras.main.width / 2, 0, logo)
  }

  private onEventGame(): void {
    this.logo.destroy();
    this.scene.start('LEVEL_01')
    this.backingMusic.stop()
  }
}
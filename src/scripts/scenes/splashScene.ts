import FpsText from '../objects/fpsText'

export default class SplashScene extends Phaser.Scene {
  fpsText
  timedEvent

  constructor() {
    super({
      key: 'SplashScene'
    })
  }

  preload() {

  }

  create() {

    this.timedEvent = this.time.delayedCall(3000, this.onEvent, [], this);

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

  private onEvent() {
    this.scene.start('GameScene')
  }

}
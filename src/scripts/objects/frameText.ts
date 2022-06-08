export default class FrameText extends Phaser.GameObjects.Text {
  constructor(scene) {
    super(scene, 10, 50, '', { color: 'black', fontSize: '28px' })
    scene.add.existing(this)
    this.setOrigin(0)
  }

  public update() {
  }
}

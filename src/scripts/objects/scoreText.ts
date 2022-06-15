export default class ScoreText extends Phaser.GameObjects.Text {
  constructor(scene) {
    super(scene, 10, 50, '', { color: 'black', fontSize: '28px', fontFamily: 'gamefont' })
    scene.add.existing(this)
    this.setOrigin(0)
  }

  public update() {
    this.setText(`SCORE!`)
  }
}

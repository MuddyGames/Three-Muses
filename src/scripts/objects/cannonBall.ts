export default class CannonBall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'cannon-ball')
    scene.add.existing(this)
    this.setDisplaySize(20, 20)

    /*this.setCollideWorldBounds(true)
      .setBounce(0.6)
      .setInteractive()
      .on('pointerdown', () => {
        this.setVelocityY(-400)
      })*/
  }
  public update() {
    this.x += 10;
    this.setPosition(this.x, this.y)
  }
}

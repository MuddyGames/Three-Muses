export default class Logo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, logo) {
    super(scene, x, y, logo)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
      .setBounce(0.6)
      .setInteractive()
      .on('pointerdown', () => {
        this.setVelocityY(-400)
      })
  }
}

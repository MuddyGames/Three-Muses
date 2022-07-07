export default class HudText extends Phaser.GameObjects.Text {
    counter!: number
    constructor(scene, x, y, score, count) {
      super(scene, x, y, score.toString(), {
        color: '#EC00D7',
        fontSize: '24px',
        fontFamily: 'gamefont'
      })
      scene.add.existing(this)
      this.setOrigin(0, 0.5)
      this.counter = count
    }
  
    public update(): boolean {
      //this.setText(`0`)
      this.y--
      this.counter--
      if(this.counter <= 0) {
        return false
      }
      return true
    }
  }
import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'


const SPINEBOY_KEY = 'spineboy'

export default class GameScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'GameScene' })
  }

  preload(){
    this.load.setPath('assets/spine/')
		//this.load.spine(SPINEBOY_KEY, 'spineboy.json', 'spineboy.atlas')
	}

  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Game Scene Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)

      //this.add.spine(400, 600, SPINEBOY_KEY, 'idle', true)
  }

  update() {
    this.fpsText.update()
    //this.scene.start('MainScene')
  }
}
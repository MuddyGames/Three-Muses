import HudText from '../objects/hudText'

export default class ArtiFactOneScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image
  private backingMusic!: Phaser.Sound.BaseSound
  private element!: Phaser.GameObjects.DOMElement 
  private nextLevel!: HudText

  constructor() {
    super({
      key: 'ArtiFactOneScene'
    })
  }

  preload() {
    this.load.script('fractals', 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.0.js');
    this.load.html('artifact_one', 'assets/artifacts/artifact_one.html');
  }

  create() {

    // Setup Screen Dimensions
		let {
			width,
			height
		} = this.sys.game.canvas;

    this.background = this.add.image(width / 2 , height / 2, 'artifact_scene_background')
    this.background.setDisplaySize(width, height);
    this.background.setOrigin(0.5, 0.5)

    this.element = this.add.dom(this.cameras.main.width / 2, 100).createFromCache('artifact_one');

    this.backingMusic = this.sound.add('splash_screen_track',{ loop: true })
		this.backingMusic.play()

    // Move to next Level
    this.nextLevel = new HudText(this)
    this.nextLevel.setShadow(3, 3)
		this.nextLevel.setStroke('#fff', 16);
		this.nextLevel.setShadow(2, 2, "#333333", 2, true, true);
    this.nextLevel.setPosition(width * 0.25, height * 0.80)
    this.nextLevel.on('pointerdown', () => this.onClickNextLevel());
  }

  update() {
    this.nextLevel.update()
    this.nextLevel.setText('Next Level')
    this.nextLevel.setInteractive()
  }


  private onClickNextLevel() {
    this.backingMusic.stop()
    this.scene.start('LEVEL_02')
  }
}
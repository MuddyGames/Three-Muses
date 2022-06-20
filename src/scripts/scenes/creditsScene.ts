import HudText from '../objects/hudText'

// Game State Management
import {
	FRUITS,
	GOAL,
	GSM,
	DIVER,
	LEVELS,
	LEVEL_DATA_KEY,
	DIVER_ANIM
} from '../objects/gameENUMS'

export default class Credits extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image
  private backingMusic!: Phaser.Sound.BaseSound
  private element!: Phaser.GameObjects.DOMElement 
  private nextLevel!: HudText

  constructor() {
    super({
      key: 'Credits'
    })
  }

  preload() {
    this.load.script('fractals', 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.0.js');
    this.load.html('credits', 'assets/artifacts/artifact_two.html');
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

    this.element = this.add.dom(this.cameras.main.width / 2, 100).createFromCache('credits');


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
    this.nextLevel.setText('Replay')
    this.nextLevel.setInteractive()
  }


  private onClickNextLevel() {
    // Set Level Back to Level 01
    window.localStorage.setItem(LEVEL_DATA_KEY.CURRENT, LEVELS.LEVEL_01)

    this.backingMusic.stop()
    window.location.reload()
    this.scene.start('PreloadScene')
  }
}
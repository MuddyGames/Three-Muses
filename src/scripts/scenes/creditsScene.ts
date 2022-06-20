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
  timedEvents : Phaser.Time.TimerEvent[] = []
  backingMusic
  element

  constructor() {
    super({
      key: 'Credits'
    })
  }

  preload() {
    this.load.html('credits', 'assets/credits/credits.html');
  }

  create() {

    this.element = this.add.dom(this.cameras.main.width / 2, 100).createFromCache('credits');

    this.element.setPerspective(800);

    this.backingMusic = this.sound.add('splash_screen_track',{ loop: true })
		this.backingMusic.play()

    // Move to next Artifact
    this.timedEvents.push(this.time.delayedCall(2000, this.onEventGame, [], this))

  }

  update() {

  }


  private onEventGame() {
    // Set Level Back to Level 01
    window.localStorage.setItem(LEVEL_DATA_KEY.CURRENT, LEVELS.LEVEL_02)

    this.backingMusic.stop()
    window.location.reload()
    this.scene.start('PreloadScene')
  }
}
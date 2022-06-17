import HudText from '../objects/hudText'
import {
  GSM
} from '../objects/gameStates'

export default class TestScene extends Phaser.Scene {
  // Game State Management
  private gameState!: GSM

  // Hud Text
  private collectablePoints!: number
  private levelScore!: number
  private bestRecordedTime!: number
  private newRecordTime!: number
  private currentScoreText!: HudText
  private elapsedTimeText!: HudText
  private recordTimeText!: HudText
  private screenX!: number
  private screenY!: number
  private elapsedLevelTime!: number


  constructor() {
    super({
      key: 'TestScene'
    })
    this.collectablePoints = 0
    this.levelScore = 0
    this.newRecordTime = 0
    this.screenX = 0
    this.screenY = 0
  }

  preload() {}

  create() {

    //Setup Game State
    this.gameState = GSM.PLAY

    // Retrive Recorded Score and Time from LocalStorage
    this.fetchRecordedScore()
    this.fetchRecordedTime()

    // Setup Screen Dimensions
    let {
      width,
      height
    } = this.sys.game.canvas;
    this.screenX = width;
    this.screenY = height

    // Setup HUD
    // Score
    this.currentScoreText = new HudText(this)
    this.currentScoreText.setShadow(3, 3)
    this.currentScoreText.setStroke('#fff', 16);
    this.currentScoreText.setShadow(2, 2, "#333333", 2, true, true);
    // Elapsed Time
    this.elapsedTimeText = new HudText(this)
    this.elapsedTimeText.setShadow(3, 3)
    this.elapsedTimeText.setStroke('#fff', 16);
    this.elapsedTimeText.setShadow(2, 2, "#333333", 2, true, true);
    // Record Time
    this.recordTimeText = new HudText(this)
    this.recordTimeText.setShadow(3, 3)
    this.recordTimeText.setStroke('#fff', 16);
    this.recordTimeText.setShadow(2, 2, "#333333", 2, true, true);

    // Update Score Frequency
    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: this.fetchRecordedScore,
      callbackScope: this
    });

    // Change Game State
    this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: this.gsmUpdate,
      callbackScope: this
    });

  }

  // Update Method
  update(time: number, delta: number): void {

    //If level Playable Update
    if (this.gameState === GSM.PLAY) {
      this.elapsedLevelTime = time;
      let points = Phaser.Math.Between(50, 100);
      this.setPoints(points)

    } else if (this.gameState === GSM.LEVEL_COMPLETE) {

      //Store Record Time
      if (Math.round((this.elapsedLevelTime * 0.001)) <= this.bestRecordedTime) {
        this.setRecord(Math.round((this.elapsedLevelTime * 0.001)))
        this.fetchRecordedTime()

      } else {
        this.newRecordTime = this.bestRecordedTime
      }

    }

    // Display Updated HUD
    this.currentScoreText.setPosition(this.screenX * 0.90, this.screenY * 0.06)
    this.currentScoreText.update()
    this.currentScoreText.setText(' ' + this.levelScore + ' ')

    this.elapsedTimeText.setPosition(this.screenX * 0.65, this.screenY * 0.06)
    this.elapsedTimeText.update()
    this.elapsedTimeText.setText('Timer : ' + Math.round((this.elapsedLevelTime * 0.001)) + ' ')

    this.recordTimeText.setPosition(this.screenX * 0.40, this.screenY * 0.06)
    this.recordTimeText.update()
    this.recordTimeText.setText('Best time : ' + this.bestRecordedTime + ' ')

  }

  // Set Record Time
  private setRecord(time: number) {
    this.newRecordTime = time
  }

  // Add Points
  private setPoints(points: number) {
    this.collectablePoints += points
  }

  private fetchRecordedTime() {
    let temp = window.localStorage.getItem('time')
    if (temp !== null) {
      this.bestRecordedTime = parseInt(temp) || 0
      if (this.bestRecordedTime === 0) {
        this.bestRecordedTime = 1000
      }
    } else {
      this.bestRecordedTime = 0
    }

    window.localStorage.setItem('time', this.newRecordTime.toString())
  }

  private fetchRecordedScore() {
    let temp = window.localStorage.getItem('score')
    if (temp !== null) {
      this.levelScore = parseInt(temp) || 0
    } else {
      this.levelScore = 0
    }
    this.levelScore += this.collectablePoints
    this.collectablePoints = 0 // Reset Points
    window.localStorage.setItem('score', this.levelScore.toString())
  }

  private gsmUpdate() {
    this.gameState = GSM.LEVEL_COMPLETE
    console.log('level complete')
  }
}
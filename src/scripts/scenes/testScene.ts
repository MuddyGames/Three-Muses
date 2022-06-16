import HudText from '../objects/hudText'
import {
  GSM
} from '../objects/gameStates'

export default class TestScene extends Phaser.Scene {
  // Game State Management
  private gameState!: GSM

  // Hud Text
  private points!: number
  private score!: number
  private bestTime!: number
  private newRecord!: number
  private scoreText!: HudText
  private timeText!: HudText
  private bestText!: HudText
  private screenX!: number
  private screenY!: number
  private elapsed!: number


  constructor() {
    super({
      key: 'TestScene'
    })
    this.points = 0
    this.score = 0
    this.newRecord = 0
    this.screenX = 0
    this.screenY = 0
  }

  preload() {}

  create() {

    this.gameState = GSM.PLAY

    this.scoreUpdate()
    this.timeUpdate()

    let {
      width,
      height
    } = this.sys.game.canvas;
    this.screenX = width;
    this.screenY = height

    this.scoreText = new HudText(this)
    this.scoreText.setShadow(3, 3)
    this.scoreText.setStroke('#fff', 16);
    this.scoreText.setShadow(2, 2, "#333333", 2, true, true);


    this.timeText = new HudText(this)
    this.timeText.setShadow(3, 3)
    this.timeText.setStroke('#fff', 16);
    this.timeText.setShadow(2, 2, "#333333", 2, true, true);

    this.bestText = new HudText(this)
    this.bestText.setShadow(3, 3)
    this.bestText.setStroke('#fff', 16);
    this.bestText.setShadow(2, 2, "#333333", 2, true, true);

    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: this.scoreUpdate,
      callbackScope: this
    });

    this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: this.gsmUpdate,
      callbackScope: this
    });

  }

  update(time: number, delta: number): void {

    if (this.gameState === GSM.PLAY) {
      this.elapsed = time;
      let points = Phaser.Math.Between(50, 100);
      this.setPoints(points)

      this.scoreText.setPosition(this.screenX * 0.90, this.screenY * 0.06)
      this.scoreText.update()
      this.scoreText.setText(' ' + this.score + ' ')
  
      this.timeText.setPosition(this.screenX * 0.65, this.screenY * 0.06)
      this.timeText.update()
      this.timeText.setText('Timer : ' + this.elapsed + ' ')
  
      this.bestText.setPosition(this.screenX * 0.40, this.screenY * 0.06)
      this.bestText.update()
      this.bestText.setText('Best time : ' + this.bestTime + ' ')

    } else if (this.gameState === GSM.LEVEL_COMPLETE) {

      //Store Time
      if (Math.round((this.elapsed * 0.001)) <= this.bestTime) {
        this.newRecord = Math.round((this.elapsed * 0.001))
        this.timeUpdate()

        this.scoreText.setPosition(this.screenX * 0.90, this.screenY * 0.06)
        this.scoreText.update()
        this.scoreText.setText(' ' + this.score + ' ')
    
        this.timeText.setPosition(this.screenX * 0.65, this.screenY * 0.06)
        this.timeText.update()
        this.timeText.setText('Timer : ' + this.newRecord + ' ')
    
        this.bestText.setPosition(this.screenX * 0.40, this.screenY * 0.06)
        this.bestText.update()
        this.bestText.setText('Best time : ' + this.bestTime + ' ')

      } else {
        this.newRecord = this.bestTime
      }

    }

  }


  private setPoints(points: number) {
    this.points += points
  }

  private timeUpdate() {
    let temp = window.localStorage.getItem('time')
    if (temp !== null) {
      this.bestTime = parseInt(temp) || 0
      if (this.bestTime === 0) {
        this.bestTime = 0
      }
    } else {
      this.bestTime = 0
    }
    window.localStorage.setItem('time', this.newRecord.toString())
  }

  private scoreUpdate() {
    let temp = window.localStorage.getItem('score')
    if (temp !== null) {
      this.score = parseInt(temp) || 0
    } else {
      this.score = 0
    }
    this.score += this.points
    this.points = 0 // Reset Points
    window.localStorage.setItem('score', this.score.toString())
  }

  private gsmUpdate() {
    this.gameState = GSM.LEVEL_COMPLETE
    console.log('level complete')
  }
}
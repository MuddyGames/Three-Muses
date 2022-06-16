import HudText from '../objects/hudText'
import {
  GSM
} from '../objects/gameStates'

export default class TestScene extends Phaser.Scene {
  private points!: number
  private score!: number
  private bestTime!:number
  private scoreText!: HudText
  private timeText!: HudText
  private bestText!: HudText
  private screenX!: number
  private screenY!: number

  private elapsed!: number

  private gameState!:GSM

  constructor() {
    super({
      key: 'TestScene'
    })
    this.points = 0
    this.score = 0
    this.screenX = 0
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

    this.elapsed = time;
    if (this.gameState === GSM.PLAY) {
      let points = Phaser.Math.Between(50, 100);
      this.setPoints(points)
    }else if(this.gameState === GSM.LEVEL_COMPLETE){
      //Store Time
      if(this.bestTime >= this.elapsed){
        this.timeUpdate()
      }
    }else{
      //Do Stuff
    }

    this.scoreText.setPosition(this.screenX * 0.90, this.screenY * 0.06)
    this.scoreText.update()
    this.scoreText.setText(' ' + this.score + ' ')

    this.timeText.setPosition(this.screenX * 0.65, this.screenY * 0.06)
    this.timeText.update()
    this.timeText.setText('Timer : ' + Math.round((this.elapsed * 0.001)) + ' ')

    this.bestText.setPosition(this.screenX * 0.40, this.screenY * 0.06)
    this.bestText.update()
    this.bestText.setText('Best time : ' + this.bestTime + ' ')

  }


  private setPoints(points: number) {
    this.points += points
  }

  private timeUpdate() {
    let temp = window.localStorage.getItem('time')
    if(temp!==null){
      this.bestTime = parseInt(temp) || 0
      if(this.bestTime === 0){
        this.bestTime = 180
      }
    }else{
      this.bestTime = 0
    }
    window.localStorage.setItem('time', this.bestTime.toString())
  }

  private scoreUpdate() {
    let temp = window.localStorage.getItem('score')
    if(temp!==null){
      this.score = parseInt(temp) || 0
    }else{
      this.score = 0
    }
    this.score += this.points
    this.points = 0 // Reset Points
    window.localStorage.setItem('score', this.score.toString())
  }

  private gsmUpdate(){
    this.gameState = GSM.LEVEL_COMPLETE
    console.log('level complete')
  }
}
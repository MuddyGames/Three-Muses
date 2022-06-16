import HudText from '../objects/hudText'
import {
  GSM
} from '../objects/gameStates'

export default class TestScene extends Phaser.Scene {
  private points!: number
  private score!: number
  private scoreText!: HudText
  private timeText!: HudText
  private bestText!: HudText
  private screenX!: number
  private screenY!: number

  private timer!: Phaser.Time.TimerEvent
  private elapsed!: number

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
    //console.log(width, height)
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

  }

  update(time: number, delta: number): void {

    this.elapsed = time;
    if (GSM.PLAY) {
      let points = Phaser.Math.Between(50, 100);
      this.setPoints(points)
    }else if(GSM.LEVEL_COMPLETE){
      //Store Time
    }else{
      //Best Time
    }

    this.scoreText.setPosition(this.screenX * 0.90, this.screenY * 0.06)
    this.scoreText.update()
    this.scoreText.setText(' ' + this.score + ' ')

    this.timeText.setPosition(this.screenX * 0.65, this.screenY * 0.06)
    this.timeText.update()
    this.timeText.setText('Timer : ' + Math.round((this.elapsed * 0.001)) + ' ')

    this.bestText.setPosition(this.screenX * 0.40, this.screenY * 0.06)
    this.bestText.update()
    this.bestText.setText('Best time : ' + 20 + ' ')

  }


  private setPoints(points: number) {
    this.points += points
  }

  private scoreUpdate() {
    this.score += this.points
    this.points = 0 // Reset Points
  }

}
import ScoreText from '../objects/scoreText'
import Logo from '../objects/logo'

export default class TestScene extends Phaser.Scene {
  hsv
  i
  counter
  score1!:ScoreText
  score2!:ScoreText
  score3!:ScoreText
  score4!:ScoreText
  score5!:ScoreText

  constructor() {
    super({
      key: 'TestScene'
    })
    this.i = 0
    this.counter = 0
  }

  preload() {
  }

  create() {

    this.hsv = Phaser.Display.Color.HSVColorWheel()

    this.score1 = new ScoreText(this)
    this.score1.setColor('0x0000FF')
    this.score1.setFill('0x0000FF')
    this.score1.setLineSpacing(10)
    this.score1.setShadow(2,2)
    this.score1.setTintFill(0xF8C8DC, 0xF8C8DC, 0xF8C8DC, 0xF8C8DC);


    this.score2 = new ScoreText(this)
    this.score2.setTintFill(0x0000ff, 0x0000ff, 0x0000ff, 0x0000ff);
    this.score2.setShadow(2,2)
    this.score2.setTintFill(0x00ff00, 0x00ff00, 0x00ff00, 0x00ff00);

    this.score3 = new ScoreText(this)
    const gradient = this.score3.context.createLinearGradient(0, 0, 0, this.score3.height);
    gradient.addColorStop(0, '#111111');
    gradient.addColorStop(.5, '#ffffff');
    gradient.addColorStop(.5, '#aaaaaa');
    gradient.addColorStop(1, '#111111');

    this.score3.setFill(gradient);
    this.score2.setShadow(2,2)

    this.score4 = new ScoreText(this)
    this.score4.setShadow(3,3)

    this.score5 = new ScoreText(this)
    this.score5.setShadow(3,3) 
    this.score5.setStroke('#fff', 16);
    this.score5.setShadow(2, 2, "#333333", 2, true, true); 

    this.time.addEvent({ delay: 300,  loop: true, callback: this.scoreUpdate, callbackScope: this });

  }

  update() {
    this.score1.update()
    this.score1.setText(' ' + this.counter + ' ')

    this.score2.setPosition(100, 200)
    this.score2.update()
    this.score2.setText(' ' + this.counter + ' ')

    this.score3.setPosition(300, 200)
    this.score3.update()
    this.score3.setText(' ' + this.counter + ' ')

    this.score4.setPosition(300, 400)
    this.score4.setText(' ' + this.counter + ' ')

    this.score5.setPosition(400, 600)
    this.score5.update()
    this.score5.setText(' ' + this.counter + ' ')

    const top = this.hsv[this.i].color;
    const bottom = this.hsv[359 - this.i].color;

    this.score5.setTint(top, top, bottom, bottom);
    this.score5.setTint(top, bottom, top, bottom);

    this.i++;

    if (this.i === 360)
    {
        this.i = 0;
    }

  }

  private scoreUpdate(){
    this.counter += 151
  }

}
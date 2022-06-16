/*import 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'

const CANNONBALL_KEY = 'cannon-ball'

export default class CannonBall{
  load: any
  
  
  constructor(scene: Phaser.Scene, spine: SpineGameObject){
    
  }
  private cannonball!: SpineGameObject


  preload() {
    this.load.spine(CANNONBALL_KEY, 'cannonball/cannonball.json', 'cannon/cannonball.atlas')
  }
  
  create(){

    this.cannonball = this.createSpineObject(CANNONBALL_KEY)
  }
  createSpineObject(CANNONBALL_KEY: string): SpineGameObject {
    throw new Error('Method not implemented.')
  }
}*/

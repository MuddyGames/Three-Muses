import 'phaser/plugins/spine/dist/SpinePlugin'
import StateMachine from './StateMachine'

export default class PlayerState{
    private state!:StateMachine
    constructor(spine: SpineGameObject){
        this.state = new StateMachine(spine)
    }

    handleInput(input:string){
        let state
        state = this.state.handleInput(input)
        if(state !== null){
            this.state.exit()
            this.state = state
            this.state.enter()
        }
    }
    update(){
        this.state.update()
    }

}
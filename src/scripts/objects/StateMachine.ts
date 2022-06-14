import 'phaser/plugins/spine/dist/SpinePlugin'

export default class StateMachine {
    spine!:SpineGameObject
    constructor(spine: SpineGameObject) {
        this.spine = spine
    }

    handleInput(input:string){}
    enter(){}
    update(){}
    exit(){}
}

export class Idle extends StateMachine{
    handleInput(input:string){
        if(input === 'walk-right'){
            console.log('Change State to Walking Right')
            return new WalkingRight(this.spine)
        }
        else{
            console.log('Staying in Idle')
            return
        }

    }
    enter(){
        console.log('Entering Idle State this runs on Entry')

    }
    update(){
        console.log('Updating the Idle State')
    }
    exit(){
        console.log('Exit the Idle State')
    }
}


export class WalkingRight extends StateMachine{
    handleInput(input:string){
        if(input === 'no-key'){
            console.log('Change State to Idle State')
            return new Idle(this.spine)
        }
        else{
            console.log('Staying in WalkingRight')
            return
        }

    }
    enter(){
        console.log('Entering WalkingRight State this runs on Entry')

    }
    update(){
        console.log('Updating the WalkingRight State')
    }
    exit(){
        console.log('Exiting the WalkingRight State')
    }
}

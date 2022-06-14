import 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'

export default class PlayerStateMachine {
    spine
    scene!: Phaser.Scene
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        this.scene = scene
        this.spine = spine
    }

    handleInput(input: string) {}
    enter() {}
    update() {}
    exit() {}
}

export class Idle extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }

    handleInput(input: string) {

        if (input === 'walk-right-key') {
            console.log('Change State to Walking Right')
            return new WalkingRight(this.scene, this.spine)
        } else {
            console.log('Staying in Idle')
            return null
        }

    }
    enter() {
        console.log('Entering Idle State this runs on Entry')

    }
    update() {
        console.log('Updating the Idle State')
    }
    exit() {
        console.log('Exit the Idle State')
    }
}


export class WalkingRight extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === 'no-key') {
            console.log('Change State to Idle State')
            return new Idle(this.scene, this.spine)
        } else {
            console.log('Staying in WalkingRight')
            return null
        }

    }
    enter() {
        console.log('Entering WalkingRight State this runs on Entry')

    }
    update() {
        console.log('Updating the WalkingRight State')
    }
    exit() {
        console.log('Exiting the WalkingRight State')
    }
}

export class WalkingLeft extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === 'no-key') {
            console.log('Change State to Idle State')
            return new Idle(this.scene, this.spine)
        } else {
            console.log('Staying in WalkingRight')
            return null
        }

    }
    enter() {
        console.log('Entering WalkingRight State this runs on Entry')

    }
    update() {
        console.log('Updating the WalkingRight State')
    }
    exit() {
        console.log('Exiting the WalkingRight State')
    }
}

export class WalkingUp extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === 'no-key') {
            console.log('Change State to Idle State')
            return new Idle(this.scene, this.spine)
        } else {
            console.log('Staying in WalkingRight')
            return null
        }

    }
    enter() {
        console.log('Entering WalkingRight State this runs on Entry')

    }
    update() {
        console.log('Updating the WalkingRight State')
    }
    exit() {
        console.log('Exiting the WalkingRight State')
    }
}

export class WalkingDown extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === 'no-key') {
            console.log('Change State to Idle State')
            return new Idle(this.scene, this.spine)
        } else {
            console.log('Staying in WalkingRight')
            return null
        }

    }
    enter() {
        console.log('Entering WalkingRight State this runs on Entry')

    }
    update() {
        console.log('Updating the WalkingRight State')
    }
    exit() {
        console.log('Exiting the WalkingRight State')
    }
}

export class Eating extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === 'no-key') {
            console.log('Change State to Idle State')
            return new Idle(this.scene, this.spine)
        } else {
            console.log('Staying in WalkingRight')
            return null
        }

    }
    enter() {
        console.log('Entering WalkingRight State this runs on Entry')

    }
    update() {
        console.log('Updating the WalkingRight State')
    }
    exit() {
        console.log('Exiting the WalkingRight State')
    }
}

export class UnderAttack extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === 'no-key') {
            console.log('Change State to Idle State')
            return new Idle(this.scene, this.spine)
        } else {
            console.log('Staying in WalkingRight')
            return null
        }

    }
    enter() {
        console.log('Entering WalkingRight State this runs on Entry')

    }
    update() {
        console.log('Updating the WalkingRight State')
    }
    exit() {
        console.log('Exiting the WalkingRight State')
    }
}
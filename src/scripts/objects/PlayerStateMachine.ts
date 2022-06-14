import 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'
import {INPUT_TYPES} from './inputs'

export default class PlayerStateMachine {
    spine!: SpineGameObject
    scene!: Phaser.Scene
    sound!: Phaser.Sound.BaseSound

    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        this.scene = scene
        this.spine = spine
    }

    handleInput(input: string) {}
    enter() {}
    update() {}
    exit() {}
}

// Possible States
// Idle -> Walking Right
// Idle -> Walking Left
// Idle -> Walking Up
// Idle -> Walking Down
// Idle -> Under Attack
export class Idle extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }

    handleInput(input: string) {

        if (input === INPUT_TYPES.WALK_RIGHT) {
            return new WalkingRight(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_LEFT) {
            return new WalkingLeft(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_UP) {
            return new WalkingUp(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_DOWN) {
            return new WalkingDown(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        this.sound = this.scene.sound.add('story')
        this.sound.play()
        this.spine.play('idle', true)
    }
    update() {
        console.log('Updating the Idle State')
    }
    exit() {
        console.log('Exit the Idle State')
    }
}

// Possible States
// WalkingRight -> Idle
// WalkingRight -> Walking Left
// WalkingRight -> Walking Up
// WalkingRight -> Walking Down
// WalkingRight -> Eating Right
// WalkingRight -> Under Attack

export class WalkingRight extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_LEFT) {
            return new WalkingLeft(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_UP) {
            return new WalkingUp(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_DOWN) {
            return new WalkingDown(this.scene, this.spine)
        } else if (input === 'eating-right-key') {
            console.log('Change State to Eating Right')
            return new EatingRight(this.scene, this.spine)
        } else if (input === 'under-attack-key') {
            console.log('Change State to Under Attack')
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }
    }
    enter() {
        this.sound = this.scene.sound.add('unreal')
        this.sound.play()
        this.spine.play('run_right', true)

    }
    update() {
        console.log('Updating the WalkingRight State')
    }
    exit() {
        console.log('Exiting the WalkingRight State')
    }
}

// Possible States
// WalkingLeft -> Idle
// WalkingLeft -> Walking Right
// WalkingLeft -> Walking Up
// WalkingLeft -> Walking Down
// WalkingLeft -> Eating Left
// WalkingLeft -> Under Attack
export class WalkingLeft extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === 'no-key') {
            console.log('Change State to Idle State')
            return new Idle(this.scene, this.spine)
        } else if (input === 'walk-right-key') {
            console.log('Change State to Walking Right')
            return new WalkingRight(this.scene, this.spine)
        } else if (input === 'walk-up-key') {
            console.log('Change State to Walking Up')
            return new WalkingUp(this.scene, this.spine)
        } else if (input === 'walk-down-key') {
            console.log('Change State to Walking Down')
            return new WalkingDown(this.scene, this.spine)
        } else if (input === 'eating-left-key') {
            console.log('Change State to Eating Right')
            return new EatingLeft(this.scene, this.spine)
        } else if (input === 'under-attack-key') {
            console.log('Change State to Under Attack')
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        this.sound = this.scene.sound.add('mup')
        this.sound.play()
        this.spine.play('run_left', true)

    }
    update() {
        console.log('Updating the WalkingRight State')
    }
    exit() {
        console.log('Exiting the WalkingRight State')
    }
}

// Possible States
// WalkingUp -> Idle
// WalkingUp -> Walking Left
// WalkingUp -> Walking Right
// WalkingUp -> Walking Up
// WalkingUp -> Walking Down
// WalkingUp -> Eating Up
// WalkingUp -> Under Attack
export class WalkingUp extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === 'no-key') {
            console.log('Change State to Idle State')
            return new Idle(this.scene, this.spine)
        } else if (input === 'walk-left-key') {
            console.log('Change State to Walking Left')
            return new WalkingLeft(this.scene, this.spine)
        } else if (input === 'walk-right-key') {
            console.log('Change State to Walking Right')
            return new WalkingRight(this.scene, this.spine)
        } else if (input === 'walk-down-key') {
            console.log('Change State to Walking Down')
            return new WalkingDown(this.scene, this.spine)
        } else if (input === 'eating-up-key') {
            console.log('Change State to Eating Up')
            return new EatingUp(this.scene, this.spine)
        } else if (input === 'under-attack-key') {
            console.log('Change State to Under Attack')
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        this.sound = this.scene.sound.add('tackies')
        this.sound.play()
        this.spine.play('run_up', true)

    }
    update() {
        console.log('Updating the WalkingRight State')
    }
    exit() {
        console.log('Exiting the WalkingRight State')
    }
}

// Possible States
// WalkingDown -> Idle
// WalkingDown -> Walking Left
// WalkingDown -> Walking Right
// WalkingDown -> Walking Up
// WalkingDown -> Walking Down
// WalkingDown -> Eating Up
// WalkingDown -> Under Attack
export class WalkingDown extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === 'no-key') {
            console.log('Change State to Idle State')
            return new Idle(this.scene, this.spine)
        } else if (input === 'walk-left-key') {
            console.log('Change State to Walking Left')
            return new WalkingLeft(this.scene, this.spine)
        } else if (input === 'walk-right-key') {
            console.log('Change State to Walking Right')
            return new WalkingRight(this.scene, this.spine)
        } else if (input === 'walk-up-key') {
            console.log('Change State to Walking Up')
            return new WalkingUp(this.scene, this.spine)
        } else if (input === 'eating-down-key') {
            console.log('Change State to Eating Down')
            return new EatingDown(this.scene, this.spine)
        } else if (input === 'under-attack-key') {
            console.log('Change State to Under Attack')
            return new UnderAttack(this.scene, this.spine)
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

export class EatingLeft extends PlayerStateMachine {
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

export class EatingRight extends PlayerStateMachine {
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
export class EatingUp extends PlayerStateMachine {
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
export class EatingDown extends PlayerStateMachine {
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

export class Expired extends PlayerStateMachine {
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
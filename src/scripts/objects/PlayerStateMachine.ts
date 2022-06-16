import 'phaser'
import { Time } from 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'
import {
    INPUT_TYPES
} from './inputs'

var canPlay!: boolean
export default class PlayerStateMachine {
    spine!: SpineGameObject
    scene!: Phaser.Scene
    sound!: Phaser.Sound.BaseSound
    timer!: Phaser.Time.TimerEvent

    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        this.scene = scene
        this.spine = spine
    }

    handleInput(input: string) {}
    enter() {}
    update() {}
    exit() {}
    playSound() {
        canPlay = true
    }
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
        if(canPlay){
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.IDLE, true)
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
        } else if (input === INPUT_TYPES.EATING_RIGHT) {
            return new EatingRight(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }
    }
    enter() {
        this.sound = this.scene.sound.add('unreal')
        if(canPlay){
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.WALK_RIGHT, true)
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
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_RIGHT) {
            return new WalkingRight(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_UP) {
            return new WalkingUp(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_DOWN) {
            return new WalkingDown(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EATING_LEFT) {
            return new EatingLeft(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        this.sound = this.scene.sound.add('gawke')
        if(canPlay){
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.WALK_LEFT, true)

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
// WalkingUp -> Walking Down
// WalkingUp -> Eating Up
// WalkingUp -> Under Attack
export class WalkingUp extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_LEFT) {
            return new WalkingLeft(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_RIGHT) {
            return new WalkingRight(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_DOWN) {
            return new WalkingDown(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EATING_UP) {
            return new EatingUp(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        this.sound = this.scene.sound.add('yurt')
        if(canPlay){
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.WALK_UP, true)

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
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_LEFT) {
            return new WalkingLeft(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_RIGHT) {
            return new WalkingRight(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_UP) {
            return new WalkingUp(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EATING_DOWN) {
            return new EatingDown(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }
    }
    enter() {
        this.sound = this.scene.sound.add('shades')
        if(canPlay){
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.WALK_DOWN, true)

    }
    update() {
        console.log('Updating the WalkingDowm State')
    }
    exit() {
        console.log('Exiting the WalkingDown State')
    }
}

// Possible States
// EatingLeft -> MunchingLeft
// EatingLeft -> Under Attack
export class EatingLeft extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.MUNCHING_LEFT) {
            return new MunchingLeft(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        this.sound = this.scene.sound.add('mup')
        if(canPlay){
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.EATING_LEFT, true)
        this.timer = this.scene.time.delayedCall(500,this.next)
        this.scene.time.addEvent(this.timer);
    }
    update() {
        console.log('Updating the Eating Left State')
    }
    exit() {
        console.log('Exiting the Eating Left State')
    }
    next(){
        console.log('OPPPPPPPS')
    }
}

// Possible States
// MunchingLeft -> Idle
// MunchingLeft -> Under Attack
export class MunchingLeft extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        console.log('Entering Munching Left State this runs on Entry')

    }
    update() {
        console.log('Updating the Munching Left State')
    }
    exit() {
        console.log('Exiting the Munching Left State')
    }
}

// Possible States
// EatingRight -> MunchingLeft
// EatingRight -> Under Attack
export class EatingRight extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.MUNCHING_RIGHT) {
            return new MunchingRight(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        console.log('Entering Eating Right State this runs on Entry')

    }
    update() {
        console.log('Updating the Eathing Right State')
    }
    exit() {
        console.log('Exiting the Eating Right State')
    }
}

// Possible States
// MunchingRight -> Idle
// MunchingRight -> Under Attack
export class MunchingRight extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        console.log('Entering Munching Right State this runs on Entry')

    }
    update() {
        console.log('Updating the Munching Right State')
    }
    exit() {
        console.log('Exiting the Munching Right State')
    }
}

// Possible States
// EatingUp -> MunchingLeft
// EatingUp -> Under Attack
export class EatingUp extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.MUNCHING_UP) {
            return new MunchingUp(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        console.log('Entering Eating Up State this runs on Entry')

    }
    update() {
        console.log('Updating the Eathing Up State')
    }
    exit() {
        console.log('Exiting the Eating Up State')
    }
}

// Possible States
// MunchingUp -> Idle
// MunchingUp -> Under Attack
export class MunchingUp extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        console.log('Entering Munching Up State this runs on Entry')

    }
    update() {
        console.log('Updating the Munching Up State')
    }
    exit() {
        console.log('Exiting the Munching Up State')
    }
}

// Possible States
// EatingDown -> MunchingDown
// EatingDown -> Under Attack
export class EatingDown extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.MUNCHING_DOWN) {
            return new MunchingDown(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        console.log('Entering Eating Down State this runs on Entry')

    }
    update() {
        console.log('Updating the Eathing Down State')
    }
    exit() {
        console.log('Exiting the Eating Down State')
    }
}

// Possible States
// MunchingDown -> Idle
// MunchingDown -> Under Attack
export class MunchingDown extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return null
        }
    }
    enter() {
        console.log('Entering Munching Down State this runs on Entry')

    }
    update() {
        console.log('Updating the Munching Down State')
    }
    exit() {
        console.log('Exiting the Munching Down State')
    }
}


// Possible States
// UnderAttack -> Walking Left
// UnderAttack -> Walking Right
// UnderAttack -> Walking Up
// UnderAttack -> Walking Down
// UnderAttack -> Expired
export class UnderAttack extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        if (input === INPUT_TYPES.WALK_LEFT) {
            return new WalkingLeft(this.scene, this.spine)
        }else if(input === INPUT_TYPES.WALK_RIGHT) {
            return new WalkingRight(this.scene, this.spine)
        }else if(input === INPUT_TYPES.WALK_UP) {
            return new WalkingUp(this.scene, this.spine)
        }else if(input === INPUT_TYPES.WALK_DOWN) {
            return new WalkingDown(this.scene, this.spine)
        }else if(input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return null
        }
    }
    enter() {
        this.sound = this.scene.sound.add('langers')
        if(canPlay){
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.UNDER_ATTACK, true)
    }
    update() {
        console.log('Updating the UnderAttack State')
    }
    exit() {
        console.log('Exiting the UnderAttack State')
    }
}

// Possible States
// Expired -> Idle
export class Expired extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        console.log('Process Input Expired State')
        if (input === INPUT_TYPES.REVIVE) {
            return new Revived(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        console.log('Entering the Expired State')
        this.sound = this.scene.sound.add('took_a_hopper')
        if(canPlay){
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.EXPIRED, true)

    }
    update() {
        console.log('Updating the Expired State')
    }
    exit() {
        console.log('Exiting the Expired State')
    }
}

// Possible States
// Revived -> Idle
export class Revived extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string) {
        console.log('Process Input Expired State')
        if (input === INPUT_TYPES.REVIVED) {
            return new Idle(this.scene, this.spine)
        } else {
            return null
        }

    }
    enter() {
        console.log('Entering the Expired State')
        this.sound = this.scene.sound.add('state_of_ya')
        if(canPlay){
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.EXPIRED, true)

    }
    update() {
        console.log('Updating the Expired State')
    }
    exit() {
        console.log('Exiting the Expired State')
    }
}
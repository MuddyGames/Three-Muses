import 'phaser'
import {
    Time
} from 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'
import {
    INPUT_TYPES
} from './inputs'
import Player from './Player'
import PlayerState from './PlayerState'

var canPlay!: boolean
export default abstract class PlayerStateMachine {
    protected spine!: SpineGameObject
    protected scene!: Phaser.Scene
    protected sound!: Phaser.Sound.BaseSound
    protected animationTime!: number
    protected animationElapsed!: number
    protected idiomTime!: number
    protected idiomElapsed!: number

    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        this.scene = scene
        this.spine = spine
    }

    abstract handleInput(input: string): PlayerStateMachine | undefined
    abstract enter(time: number, delta: number, player: Player): void
    abstract update(time: number, delta: number, player: Player): void
    abstract exit(time: number, delta: number, player: Player): void
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

    handleInput(input: string): PlayerStateMachine | undefined {

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
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 10)
        switch (selection) {
            case 1:
                this.sound = this.scene.sound.add('story')
                break
            case 2:
                this.sound = this.scene.sound.add('silent')
                break
            case 3:
                this.sound = this.scene.sound.add('sca')
                break
            case 4:
                this.sound = this.scene.sound.add('silent')
                break
            case 5:
                this.sound = this.scene.sound.add('nippy')
                break
            case 6:
                this.sound = this.scene.sound.add('silent')
                break
            case 7:
                this.sound = this.scene.sound.add('hun')
                break;
            case 8:
                this.sound = this.scene.sound.add('silent')
                break
            case 9:
                this.sound = this.scene.sound.add('a_boy_the_kid')
                break;
            case 10:
                this.sound = this.scene.sound.add('silent')
                break;
            default:
                console.log('silent')
                this.sound = this.scene.sound.add('silent')
        }
        this.spine.play(INPUT_TYPES.IDLE, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.sound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
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
    handleInput(input: string): PlayerStateMachine | undefined {
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
            return undefined
        }
    }
    enter(time: number, delta: number) {
        this.sound = this.scene.sound.add('unreal')
        if (canPlay) {
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.WALK_RIGHT, true)
    }
    update(time: number, delta: number) {
        //console.log('Updating the WalkingRight State')

    }
    exit(time: number, delta: number) {
        //console.log('Exiting the WalkingRight State')
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
    handleInput(input: string): PlayerStateMachine | undefined {
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
            return undefined
        }

    }
    enter(time: number, delta: number) {
        this.sound = this.scene.sound.add('gawke')
        if (canPlay) {
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.WALK_LEFT, true)

    }
    update(time: number, delta: number) {
        // Movement should be part of player
        //this.player.moveLeft()
    }
    exit(time: number, delta: number) {
        //console.log('Exiting the WalkingRight State')
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
    handleInput(input: string): PlayerStateMachine | undefined {
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
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        this.sound = this.scene.sound.add('yurt')
        if (canPlay) {
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.WALK_UP, true)

    }
    update(time: number, delta: number, player: Player) {
        //console.log('Updating the WalkingRight State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the WalkingRight State')
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
    handleInput(input: string): PlayerStateMachine | undefined {
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
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        this.sound = this.scene.sound.add('shades')
        if (canPlay) {
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.WALK_DOWN, true)

    }
    update(time: number, delta: number, player: Player) {
        //console.log('Updating the WalkingDowm State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the WalkingDown State')
    }
}

// Possible States
// EatingLeft -> Under Attack
export class EatingLeft extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        console.log('Constructed EatingLeft State')
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        this.sound = this.scene.sound.add('well_kid')
        this.spine.play(INPUT_TYPES.EATING_LEFT, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        console.log('this.animationElapsed : ' + this.animationElapsed + ' this.idiomElapsed ' + this.idiomElapsed)
        if (this.animationElapsed >= player.getEatingDelay()) {
            let temp = player.getState()
            let state = new MunchingLeft(this.scene, this.spine)
            player.getState().getState() ?.exit(time, delta, player)
            player.getState().setState(state)
            player.getState().getState() ?.enter(time, delta, player)
        }
        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.sound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        console.log('Exiting the EatingLeft State')
        player.setMove(true)
        this.idiomElapsed = 0
        this.idiomTime = 0
    }
}

// Possible States
// MunchingLeft -> Under Attack
export class MunchingLeft extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        console.log('Constructed MunchingLeft State')
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        this.sound = this.scene.sound.add('unreal')
        this.spine.play(INPUT_TYPES.MUNCHING_LEFT, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime
        if (this.animationElapsed > player.getMunchingDelay()) {
            let temp = player.getState()
            let state = new Idle(this.scene, this.spine)
            player.getState().getState() ?.exit(time, delta, player)
            player.getState().setState(state)
            player.getState().getState() ?.enter(time, delta, player)
        }
        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.sound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        console.log('Exiting the Munching Left State')
        player.setMove(true)
        this.idiomElapsed = 0
        this.idiomTime = 0
    }
}

// Possible States
// EatingRight -> Under Attack
export class EatingRight extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        //console.log('Entering Eating Right State this runs on Entry')

    }
    update(time: number, delta: number, player: Player) {
        //console.log('Updating the Eathing Right State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the Eating Right State')
    }
}

// Possible States
// MunchingRight -> Idle
// MunchingRight -> Under Attack
export class MunchingRight extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        //console.log('Entering Munching Right State this runs on Entry')

    }
    update(time: number, delta: number, player: Player) {
        //console.log('Updating the Munching Right State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the Munching Right State')
    }
}

// Possible States
// EatingUp -> MunchingLeft
// EatingUp -> Under Attack
export class EatingUp extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.MUNCHING_UP) {
            return new MunchingUp(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        //console.log('Entering Eating Up State this runs on Entry')

    }
    update(time: number, delta: number, player: Player) {
        //console.log('Updating the Eathing Up State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the Eating Up State')
    }
}

// Possible States
// MunchingUp -> Idle
// MunchingUp -> Under Attack
export class MunchingUp extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        //console.log('Entering Munching Up State this runs on Entry')

    }
    update(time: number, delta: number, player: Player) {
        //console.log('Updating the Munching Up State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the Munching Up State')
    }
}

// Possible States
// EatingDown -> MunchingDown
// EatingDown -> Under Attack
export class EatingDown extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.MUNCHING_DOWN) {
            return new MunchingDown(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        //console.log('Entering Eating Down State this runs on Entry')

    }
    update(time: number, delta: number, player: Player) {
        //console.log('Updating the Eathing Down State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the Eating Down State')
    }
}

// Possible States
// MunchingDown -> Idle
// MunchingDown -> Under Attack
export class MunchingDown extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.IDLE) {
            return new Idle(this.scene, this.spine)
        } else if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        //console.log('Entering Munching Down State this runs on Entry')

    }
    update(time: number, delta: number, player: Player) {
        //console.log('Updating the Munching Down State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the Munching Down State')
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
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.WALK_LEFT) {
            return new WalkingLeft(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_RIGHT) {
            return new WalkingRight(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_UP) {
            return new WalkingUp(this.scene, this.spine)
        } else if (input === INPUT_TYPES.WALK_DOWN) {
            return new WalkingDown(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        //this.sound = this.scene.sound.add('langers')
        if (canPlay) {
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.UNDER_ATTACK, true)
    }
    update(time: number, delta: number, player: Player) {
        //console.log('Updating the UnderAttack State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the UnderAttack State')
    }
}

// Possible States
// Expired -> Idle
export class Expired extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        console.log('Process Input Expired State')
        if (input === INPUT_TYPES.REVIVE) {
            return new Revived(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        console.log('Entering the Expired State')
        this.sound = this.scene.sound.add('took_a_hopper')
        if (canPlay) {
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.EXPIRED, true)

    }
    update(time: number, delta: number, player: Player) {
        //console.log('Updating the Expired State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the Expired State')
    }
}

// Possible States
// Revived -> Idle
export class Revived extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        console.log('Process Input Expired State')
        if (input === INPUT_TYPES.REVIVED) {
            return new Idle(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        console.log('Entering the Expired State')
        this.sound = this.scene.sound.add('state_of_ya')
        if (canPlay) {
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.EXPIRED, true)

    }
    update(time: number, delta: number, player: Player) {

        //console.log('Updating the Expired State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the Expired State')
    }
}

// Possible States
// Splash -> Idle
export class Splash extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        console.log('Process Input Splash State')
        if (input === INPUT_TYPES.REVIVED) {
            return new Idle(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        console.log('Entering the Splash State')
        this.sound = this.scene.sound.add('state_of_ya')
        if (canPlay) {
            this.sound.play()
            canPlay = false
        }
        this.spine.play(INPUT_TYPES.EXPIRED, true)

    }
    update(time: number, delta: number, player: Player) {

        //console.log('Updating the Splash State')
    }
    exit(time: number, delta: number, player: Player) {
        //console.log('Exiting the Splash State')
    }
}
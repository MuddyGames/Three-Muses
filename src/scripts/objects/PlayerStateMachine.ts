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

export default abstract class PlayerStateMachine {
    protected spine!: SpineGameObject
    protected scene!: Phaser.Scene
    protected idiomSound!: Phaser.Sound.BaseSound
    protected rewardSound!: Phaser.Sound.BaseSound
    protected punishmentSound!: Phaser.Sound.BaseSound
    protected revivedSound!: Phaser.Sound.BaseSound
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
// Idle -> Expired
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
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('story')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('sca')
                break
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 11:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 12:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 13:
                this.idiomSound = this.scene.sound.add('a_boy_the_kid')
                break;
            case 14:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 15:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 16:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 17:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 18:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 19:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 20:
                this.idiomSound = this.scene.sound.add('silent')
                break
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.spine.play(INPUT_TYPES.IDLE, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
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
// WalkingRight -> Expired
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
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('unreal')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.spine.play(INPUT_TYPES.WALK_RIGHT, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
    }
}

// Possible States
// WalkingLeft -> Idle
// WalkingLeft -> Walking Right
// WalkingLeft -> Walking Up
// WalkingLeft -> Walking Down
// WalkingLeft -> Eating Left
// WalkingLeft -> Under Attack
// WalkingLeft -> Expired
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
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('gawke')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('gawke')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.spine.play(INPUT_TYPES.WALK_LEFT, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
    }
}

// Possible States
// WalkingUp -> Idle
// WalkingUp -> Walking Left
// WalkingUp -> Walking Right
// WalkingUp -> Walking Down
// WalkingUp -> Eating Up
// WalkingUp -> Under Attack
// WalkingUp -> Expired
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
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }

    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('yurt')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('yurt')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('yurt')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.spine.play(INPUT_TYPES.WALK_UP, true)

    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
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
// WalkingDown -> Expired
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
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('yurt')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('yurt')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.spine.play(INPUT_TYPES.WALK_DOWN, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
    }
}

// Possible States
// EatingLeft -> Under Attack
// EatingLeft -> Expired
export class EatingLeft extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('well_kid')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('well_kid')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('well_kid')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('well_kid')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.spine.play(INPUT_TYPES.EATING_LEFT, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.animationElapsed >= player.getEatingDelay()) {
            let temp = player.getState()
            let state = new MunchingLeft(this.scene, this.spine)
            player.getState().getState() ?.exit(time, delta, player)
            player.getState().setState(state)
            player.getState().getState() ?.enter(time, delta, player)
        }
        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.idiomElapsed = 0
        this.idiomTime = 0
    }
}

// Possible States
// MunchingLeft -> Under Attack
// MunchingLeft -> Expired
export class MunchingLeft extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('unreal')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.rewardSound = this.scene.sound.add('reward',{volume:0.5})
        this.rewardSound.play()
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
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.idiomElapsed = 0
        this.idiomTime = 0
    }
}

// Possible States
// EatingRight -> Under Attack
// EatingRight -> Expired
export class EatingRight extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('come_here_i_want_ya')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('come_here_i_want_ya')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('come_here_i_want_ya')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.spine.play(INPUT_TYPES.EATING_RIGHT, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.animationElapsed >= player.getEatingDelay()) {
            let temp = player.getState()
            let state = new MunchingRight(this.scene, this.spine)
            player.getState().getState() ?.exit(time, delta, player)
            player.getState().setState(state)
            player.getState().getState() ?.enter(time, delta, player)
        }
        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.idiomElapsed = 0
        this.idiomTime = 0
    }
}

// Possible States
// MunchingRight -> Under Attack
// MunchingRight -> Expired
export class MunchingRight extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('unreal')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.rewardSound = this.scene.sound.add('reward',{volume:0.5})
        this.rewardSound.play()
        this.spine.play(INPUT_TYPES.MUNCHING_RIGHT, true)
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
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.idiomElapsed = 0
        this.idiomTime = 0
    }
}

// Possible States
// EatingUp -> Under Attack
// EatingUp -> Expired
export class EatingUp extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('come_here_i_want_ya')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('come_here_i_want_ya')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('come_here_i_want_ya')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.spine.play(INPUT_TYPES.EATING_UP, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.animationElapsed >= player.getEatingDelay()) {
            let temp = player.getState()
            let state = new MunchingUp(this.scene, this.spine)
            player.getState().getState() ?.exit(time, delta, player)
            player.getState().setState(state)
            player.getState().getState() ?.enter(time, delta, player)
        }
        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.idiomElapsed = 0
        this.idiomTime = 0
    }
}

// Possible States
// MunchingUp -> Under Attack
// MunchingUp -> Expired
export class MunchingUp extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('unreal')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.rewardSound = this.scene.sound.add('reward',{volume:0.5})
        this.rewardSound.play()
        this.spine.play(INPUT_TYPES.MUNCHING_UP, true)
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
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.idiomElapsed = 0
        this.idiomTime = 0
    }
}

// Possible States
// EatingDown -> Under Attack
// EatingDown -> Expired
export class EatingDown extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('come_here_i_want_ya')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('come_here_i_want_ya')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('come_here_i_want_ya')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.spine.play(INPUT_TYPES.EATING_DOWN, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.animationElapsed >= player.getEatingDelay()) {
            let temp = player.getState()
            let state = new MunchingDown(this.scene, this.spine)
            player.getState().getState() ?.exit(time, delta, player)
            player.getState().setState(state)
            player.getState().getState() ?.enter(time, delta, player)
        }
        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.idiomElapsed = 0
        this.idiomTime = 0
    }
}

// Possible States
// MunchingDown -> Under Attack
// MunchingDown -> Expired
export class MunchingDown extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        if (input === INPUT_TYPES.UNDER_ATTACK) {
            return new UnderAttack(this.scene, this.spine)
        } else if (input === INPUT_TYPES.EXPIRED) {
            return new Expired(this.scene, this.spine)
        } else {
            return undefined
        }
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        let selection = Phaser.Math.Between(0, 20)
        switch (selection) {
            case 1:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 2:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 3:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 4:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 5:
                this.idiomSound = this.scene.sound.add('unreal')
                break
            case 6:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 7:
                this.idiomSound = this.scene.sound.add('unreal')
                break;
            case 8:
                this.idiomSound = this.scene.sound.add('silent')
                break
            case 9:
                this.idiomSound = this.scene.sound.add('unreal')
                break;
            case 10:
                this.idiomSound = this.scene.sound.add('silent')
                break;
            default:
                this.idiomSound = this.scene.sound.add('silent')
                break
        }
        this.rewardSound = this.scene.sound.add('reward',{volume:0.5})
        this.rewardSound.play()
        this.spine.play(INPUT_TYPES.MUNCHING_DOWN, true)
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
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.idiomElapsed = 0
        this.idiomTime = 0
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
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        this.idiomSound = this.scene.sound.add('head_like_a_chewed_toffee')
        this.spine.play(INPUT_TYPES.UNDER_ATTACK, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
    }
}

// Possible States
export class Expired extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        return undefined
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        this.idiomSound = this.scene.sound.add('took_a_hopper')
        this.punishmentSound = this.scene.sound.add('punish_one',{volume:0.5})
        this.punishmentSound.play()
        this.spine.play(INPUT_TYPES.EXPIRED, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.animationElapsed >= player.getExpiredDelay()) {
            let temp = player.getState()
            let state = new Revive(this.scene, this.spine)
            player.getState().getState() ?.exit(time, delta, player)
            player.getState().setState(state)
            player.getState().getState() ?.enter(time, delta, player)
        }

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
    }
}

// Possible States
export class Revive extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        return undefined
    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        this.idiomSound = this.scene.sound.add('state_of_ya')
        this.spine.play(INPUT_TYPES.REVIVE, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        // Respawn Player Position
        console.log('respawn')
        player.respawn()

        if (this.animationElapsed >= player.getReviveDelay()) {
            let temp = player.getState()
            let state = new Revived(this.scene, this.spine)
            player.getState().getState() ?.exit(time, delta, player)
            player.getState().setState(state)
            player.getState().getState() ?.enter(time, delta, player)
        }

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
    }
}

// Possible States
export class Revived extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        return undefined

    }
    enter(time: number, delta: number, player: Player) {
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        this.idiomSound = this.scene.sound.add('well_boi_whats_the_craic')
        this.punishmentSound = this.scene.sound.add('revived',{volume:0.5})
        this.punishmentSound.play()
        this.spine.play(INPUT_TYPES.REVIVED, true)
    }
    update(time: number, delta: number, player: Player) {
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.animationElapsed >= player.getRevivedDelay()) {
            let temp = player.getState()
            let state = new Idle(this.scene, this.spine)
            player.getState().getState() ?.exit(time, delta, player)
            player.getState().setState(state)
            player.getState().getState() ?.enter(time, delta, player)
        }

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
    }
}

// Possible States
export class Splash extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        console.log('Process Input Splash State')
        return undefined
    }
    enter(time: number, delta: number, player: Player) {
        console.log('Entering the Splash State')
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        this.idiomSound = this.scene.sound.add('state_of_ya')
        this.punishmentSound = this.scene.sound.add('punish_two',{volume:0.5})
        this.punishmentSound.play()
        this.spine.play(INPUT_TYPES.SPLASH, true)
    }
    update(time: number, delta: number, player: Player) {
        console.log('Updating the Splash State')
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        console.log('Exiting the Splash State')
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
    }
}

// Possible States
export class ReachedGoal extends PlayerStateMachine {
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        super(scene, spine)
    }
    handleInput(input: string): PlayerStateMachine | undefined {
        console.log('Process Input ReachedGoal State')
        return undefined
    }
    enter(time: number, delta: number, player: Player) {
        console.log('Entering the ReachedGoal State')
        player.setMove(false)
        this.animationTime = time
        this.idiomTime = time
        this.idiomSound = this.scene.sound.add('well_sham_any_sca')
        this.punishmentSound = this.scene.sound.add('reached_goal',{volume:0.5})
        this.punishmentSound.play()
        this.spine.play(INPUT_TYPES.REACHED_GOAL, true)
    }
    update(time: number, delta: number, player: Player) {
        console.log('Updating the ReachedGoal State')
        this.animationElapsed = time - this.animationTime
        this.idiomElapsed = time - this.idiomTime

        if (this.idiomElapsed >= player.getIdiomDelay()) {
            this.idiomSound.play()
        }
    }
    exit(time: number, delta: number, player: Player) {
        console.log('Exiting the ReachedGoal State')
        player.setMove(true)
        this.animationTime = 0
        this.idiomTime = 0
    }
}
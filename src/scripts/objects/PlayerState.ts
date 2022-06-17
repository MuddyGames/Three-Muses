import 'phaser/plugins/spine/dist/SpinePlugin'
import Player from './Player'

import PlayerStateMachine, {
    Idle
} from './PlayerStateMachine'

export default class PlayerState {
    private state: PlayerStateMachine | undefined
    private scene!: Phaser.Scene
    private spine!: SpineGameObject

    constructor(scene: Phaser.Scene, spine: SpineGameObject, time: number, delta: number) {
        this.state = new Idle(scene, spine)
        this.state.enter(0, 0)
    }

    handleInput(input: string, time: number, delta: number, player: Player): PlayerStateMachine | undefined {
        let state = this.state?.handleInput(input) as PlayerStateMachine | undefined;
        //let state = this.state.handleInput(input)
        if (state !== undefined) {
            this.state?.exit(time, delta)
            this.state = state
            this.state?.enter(time, delta)
        }
        return state
    }
    update(time: number, delta: number, player: Player) {
        console.log('PlayerState UPDATE')
        this.state?.update(time, delta, player)
    }

    getState(): PlayerStateMachine | undefined {
        return this.state
    }

    setState(state: PlayerStateMachine) {
        this.state = state;
    }

}
import 'phaser/plugins/spine/dist/SpinePlugin'

import PlayerStateMachine, {
    Idle
} from './PlayerStateMachine'

export default class PlayerState {
    private state //!:PlayerStateMachine
    private scene!: Phaser.Scene
    private spine!: SpineGameObject

    constructor(scene: Phaser.Scene, spine: SpineGameObject, time: number, delta: number) {
        this.scene = scene
        this.spine = spine
    }

    init() {
        this.state = new Idle(this.scene, this.spine, this)
        this.state.enter(0, 0)
    }

    handleInput(input: string, time: number, delta: number) {
        const state = this.state.handleInput(input)
        if (state !== null) {
            this.state.exit(time, delta)
            this.state = state
            this.state.enter(time, delta)
        }
        return state
    }
    update(time: number, delta: number) {
        this.state.update(time, delta)
    }

    playSound(time: number, delta: number) {
        this.state.playSound(time, delta)
    }

    getState(): PlayerStateMachine {
        return this.state
    }

    setState(state: PlayerStateMachine) {
        this.state = state;
    }

}
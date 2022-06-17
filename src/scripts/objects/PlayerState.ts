import 'phaser/plugins/spine/dist/SpinePlugin'

import PlayerStateMachine, {
    Idle
} from './PlayerStateMachine'

export default class PlayerState {
    private state
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        this.state = new Idle(scene, spine, this)
        this.state.enter()
    }

    handleInput(input: string) {
        const state = this.state.handleInput(input)
        if (state !== null) {
            this.state.exit()
            this.state = state
            this.state.enter()
        }
        return state
    }
    update(time: number, delta: number) {
        this.state.update(time, delta)
    }

    playSound(time: number, delta: number) {
        this.state.playSound(time, delta)
    }

    getState() {
        this.state
    }

    setState(state: PlayerStateMachine) {
        this.state = state;
    }

}
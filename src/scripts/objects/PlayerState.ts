import 'phaser/plugins/spine/dist/SpinePlugin'

import PlayerStateMachine, {
    Idle
} from './PlayerStateMachine'

export default class PlayerState {
    private state
    private new_state!: PlayerStateMachine
    constructor(scene: Phaser.Scene, spine: SpineGameObject) {
        this.state = new Idle(scene, spine)
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
    update() {
        this.state.update()
    }

    playSound() {
        this.state.playSound()
    }

}
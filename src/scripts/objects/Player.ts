// Player State
import PlayerState from './PlayerState'
import {
    EatingLeft,
    Idle,
    MunchingDown,
    MunchingLeft
} from './PlayerStateMachine'

export default class Player {
    private move!: boolean
    private state!: PlayerState
    private reSpawnPosition!: Phaser.Math.Vector2
    private position!: Phaser.Math.Vector2
    private velocityX!: Phaser.Math.Vector2
    private velocityY!: Phaser.Math.Vector2
    private eatingDelay!: number
    private munchingDelay!: number
    private idiomDelay!: number

    constructor(position: Phaser.Math.Vector2) {
        this.move = true
        this.reSpawnPosition = position // Respawn Point
        this.position = position
        this.velocityX = new Phaser.Math.Vector2(0, 0)
        this.velocityY = new Phaser.Math.Vector2(0, 0)
        this.eatingDelay = 1000
        this.munchingDelay = 1000
        this.idiomDelay = 100
    }

    setMove(move:boolean): void{
        this.move = move
    }

    respawn(): void {
        this.position = this.reSpawnPosition
    }

    getEatingDelay(): number {
        return this.eatingDelay
    }

    getMunchingDelay(): number {
        return this.munchingDelay
    }

    getIdiomDelay(): number {
        return this.idiomDelay
    }

    getX(): number {
        return this.position.x
    }
    getY(): number {
        return this.position.y
    }

    setX(x: number) {
        this.position.x = x
    }

    setY(y: number) {
        this.position.y = y
    }

    setVelocityX(velocityX: Phaser.Math.Vector2): void {
        this.velocityX = velocityX
    }

    setVelocityY(velocityY: Phaser.Math.Vector2): void {
        this.velocityY = velocityY
    }

    getVelocityX(): Phaser.Math.Vector2 {
        return this.velocityX
    }

    getVelocityY(): Phaser.Math.Vector2 {
        return this.velocityY
    }


    getState(): PlayerState {
        return this.state
    }

    setState(state: PlayerState): void {
        this.state = state
    }

    moveLeft(): void {
        if (this.move) {
            this.position.subtract(this.velocityX)
        }
    }
    moveRight(): void {
        if (this.move) {
            this.position.add(this.velocityX)
        }
    }
    moveUp(): void {
        if (this.move) {
            this.position.subtract(this.velocityY)
        }
    }
    moveDown(): void {
        if (this.move) {
            this.position.add(this.velocityY)
        }
    }
}
// Player State
import { ARTIFACTS, LEVELS, TILE } from './gameENUMS'
import PlayerState from './PlayerState'

export default class Player {
    private move!: boolean
    private state!: PlayerState
    private reSpawnPosition!: Phaser.Math.Vector2
    private position!: Phaser.Math.Vector2
    private velocityX!: Phaser.Math.Vector2
    private velocityY!: Phaser.Math.Vector2
    private idleDelay!: number
    private eatingDelay!: number
    private munchingDelay!: number
    private underAttackDelay!: number
    private expiredDelay!: number
    private reviveDelay!: number
    private revivedDelay!: number
    private splashDelay!: number
    private idiomDelay!: number
    private goalDelay!: number
    //private current_level!: string
    //private next_level!: string
    //private current_artifact!: string
    //private next_artifact!: string
    private scale!: number
    private pushSpeed!: Phaser.Math.Vector2
    private pushXSpeed!: Phaser.Math.Vector2

    constructor(position: Phaser.Math.Vector2) {
        this.move = true
        this.reSpawnPosition = position // Respawn Point
        this.position = position
        this.velocityX = new Phaser.Math.Vector2(0, 0)
        this.velocityY = new Phaser.Math.Vector2(0, 0)
        this.idleDelay = 1000
        this.eatingDelay = 1000
        this.munchingDelay = 1000
        this.underAttackDelay = 1000
        this.expiredDelay = 1000
        this.reviveDelay = 1000
        this.revivedDelay = 1000
        this.goalDelay = 2000
        this.splashDelay = 2000
        this.idiomDelay = 200
        this.scale = 0.25
        this.pushSpeed = new Phaser.Math.Vector2(0, 0)
        this.pushXSpeed = new Phaser.Math.Vector2(-TILE.SIZE,0) //TODO : Make magic numbers enum
    }

    /* getCurrentLevel(): string{
        if(this.current_level === LEVELS.LEVEL_01){
            this.next_level = LEVELS.LEVEL_02
            this.current_artifact = ARTIFACTS.ArtiFactOneScene
            this.next_artifact = ARTIFACTS.ArtiFactTwoScene
        }else if(this.current_level === LEVELS.LEVEL_02){
            this.next_level = LEVELS.LEVEL_03
            this.current_artifact = ARTIFACTS.ArtiFactTwoScene
            this.next_artifact = ARTIFACTS.ArtiFactThreeScene
        }else if(this.current_level === LEVELS.LEVEL_03){
            this.next_level = LEVELS.LEVEL_04
            this.current_artifact = ARTIFACTS.ArtiFactThreeScene
            this.next_artifact = ARTIFACTS.ArtiFactFourScene
        }else if(this.current_level === LEVELS.LEVEL_04){
            this.next_level = LEVELS.CREDITS
            this.current_artifact = ARTIFACTS.ArtiFactOneScene
            this.next_artifact = ARTIFACTS.ArtiFactOneScene
        }else if(this.current_level === LEVELS.CREDITS){
            this.next_level = LEVELS.LEVEL_01
            this.current_artifact = ARTIFACTS.ArtiFactOneScene
            this.next_artifact = ARTIFACTS.ArtiFactOneScene
        }else{
            this.next_level = LEVELS.LEVEL_02
            this.current_artifact = ARTIFACTS.ArtiFactOneScene
            this.next_artifact = ARTIFACTS.ArtiFactTwoScene
        }
        return this.current_level
    } */

   /*  getNextLevel(): string{
        return this.next_level
    } */

    /* getCurrentArtifact(): string{
        return this.current_artifact
    } */

    /* getNextArtifact(): string{
        return this.next_artifact
    } */

    /* setCurrentLevel(level: string): string{
        this.current_level = level
        return this.current_level
    } */

    setMove(move: boolean): void {
        this.move = move
    }

    getMove(): boolean {
        return this.move
    }

    setPushSpeed(speed: number): void {
        this.pushSpeed.x = -speed
    }

    respawn(): void {
        this.position = this.reSpawnPosition
    }

    getIdleDelay() : number{
        return this.idleDelay
    }

    getEatingDelay(): number {
        return this.eatingDelay
    }

    getMunchingDelay(): number {
        return this.munchingDelay
    }

    getUnderAttackDelay(): number {
        return this.underAttackDelay
    }

    getExpiredDelay(): number {
        return this.expiredDelay
    }

    getReviveDelay(): number {
        return this.reviveDelay
    }

    getRevivedDelay(): number {
        return this.revivedDelay
    }

    getGoalDelay(): number {
        return this.goalDelay
    }

    getSplashDelay(): number {
        return this.splashDelay
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

    getScale(): number {
        return this.scale
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
    push(): void {
        this.position.add(this.pushSpeed)
    }

    pushX() : void{
        this.position.add(this.pushXSpeed)
    }
}
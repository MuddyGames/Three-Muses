// Heads up display text
import HudText from '../objects/hudText'

// Player State
import PlayerState from '../objects/PlayerState'

// Used for animations and game states
import {
	INPUT_TYPES
} from '../objects/inputs'

// Game State Management
import {
	FRUITS,
	GOAL,
	GSM,
	DIVER,
	LEVELS,
	LEVEL_DATA_KEY,
	DIVER_ANIM,
	BRIDGE,
	BRIDGE_ANIMS,
	RIVER,
	NEXT_LEVEL,
	ANIMATION_DELAY,
	POINTS
} from '../objects/gameENUMS'

// Player holds player data
import Player from '../objects/Player'
import { PairsFactory } from 'matter'

// TODO Move Magic Data to KEYs
const TRUFFLES_KEY = 'truffles'
const IDLE_KEY = 'idle'
const CANNONBALL_KEY = 'cannonball'
const WINDMILL_KEY = 'windmill'
const DPAD_KEY = 'dpad'
const KEYS = ['orange', 'lemon', 'grape']
const DIVER_KEY = 'diver'
const BRIDGE_KEY = 'bridge'
const SOUND_KEY = 'soundbtn'
const TIMER_KEY = 'hudtimer'

// NEED TO CREATE LEVEL_01 to LEVEL_04 for final build 
export default class LEVEL_03 extends Phaser.Scene {

	// Player Class
	private player!: Player

	// Game State Management
	private gameState!: GSM

	// Hud Text
	private collectablePoints!: number
	private levelScore!: number
	private bestRecordedTime!: number
	private newRecordTime!: number
	private currentScoreText!: HudText
	private elapsedTimeText!: HudText
	private recordTimeText!: HudText
	private screenX!: number
	private screenY!: number
	private elapsedLevelTime!: number
	private startTime!: number
	private hudtimer!: SpineGameObject

	// Level Music
	private backingMusic!: Phaser.Sound.BaseSound

	// Church Bells
	private churchBells!: Phaser.Sound.BaseSound

	// Level Objects
	private truffles!: SpineGameObject
	private divers: SpineGameObject[] = []
	private cannonball: SpineGameObject[] = []
	private windmill!: SpineGameObject
	private bridge!: SpineGameObject
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	private fruit: SpineGameObject[] = []
	private dpad!: SpineGameObject
	private soundbtn!: SpineGameObject

	private trufflesAnimationNames: string[] = []
	private trufflesAnimationIndex = 0 // TODO : Remove this magic num of 0

	private diverAnimationNames: string[] = []
	private diverAnimationIndex = 0 // TODO : Remove this magic num of 0
	private diverMove: number[] = []

	private bridgeOpen: boolean

	private fruitAnimationNames: string[] = []
	private fruitMarked: boolean[] = []
	private fruitRemaining: number
	private dpadAnimationIndex = 0
	private dpadAnimationNames = []

	private tileSize: number = 32

	// TODO : Rework so that is in screen space
	private cannonballAnimationNames: string[] = []
	private cannonballAnimationIndex = 0
	private cannonballPosX: number[] = [269, 525, 781]
	private cannonballPosY: number[] = [60, 60, 60]
	private cannonballSpeed = 2
	private cannonballMoving: boolean[] = [true, true, true]

	// TileMap Data
	private map!: Phaser.Tilemaps.Tilemap
	private tile!: Phaser.Tilemaps.Tile

	private tileset!: Phaser.Tilemaps.Tileset

	private waterLayer!: Phaser.Tilemaps.TilemapLayer
	private groundLayer!: Phaser.Tilemaps.TilemapLayer
	private ground2Layer!: Phaser.Tilemaps.TilemapLayer
	private house2Layer!: Phaser.Tilemaps.TilemapLayer
	private house1Layer!: Phaser.Tilemaps.TilemapLayer
	private wall1Layer!: Phaser.Tilemaps.TilemapLayer
	private wall2Layer!: Phaser.Tilemaps.TilemapLayer
	private churchLayer!: Phaser.Tilemaps.TilemapLayer
	private castleLayer!: Phaser.Tilemaps.TilemapLayer
	private miscLayer!: Phaser.Tilemaps.TilemapLayer
	private wallTop1Layer!: Phaser.Tilemaps.TilemapLayer
	private wallTop2Layer!: Phaser.Tilemaps.TilemapLayer
	private house2RoofLayer!: Phaser.Tilemaps.TilemapLayer
	private houseRoofLayer!: Phaser.Tilemaps.TilemapLayer
	private towerTop1Layer!: Phaser.Tilemaps.TilemapLayer
	private towerTop2Layer!: Phaser.Tilemaps.TilemapLayer
	private churchRoofLayer!: Phaser.Tilemaps.TilemapLayer
	private castleRoofLayer!: Phaser.Tilemaps.TilemapLayer
	private miscTop1Layer!: Phaser.Tilemaps.TilemapLayer
	private miscTop2Layer!: Phaser.Tilemaps.TilemapLayer
	private collisionLayer!: Phaser.Tilemaps.TilemapLayer
	private candyLayer!: Phaser.Tilemaps.TilemapLayer
	private goalLayer!: Phaser.Tilemaps.TilemapLayer
	private diverLayer!: Phaser.Tilemaps.TilemapLayer
	private bridgeLayer!: Phaser.Tilemaps.TilemapLayer

	// Game of Thrones Level
	private GoT!: boolean

	// Player Data
	private playerState!: PlayerState

	// WASD
	private key_w!: Phaser.Input.Keyboard.Key
	private key_a!: Phaser.Input.Keyboard.Key
	private key_s!: Phaser.Input.Keyboard.Key
	private key_d!: Phaser.Input.Keyboard.Key
	private key_g!: Phaser.Input.Keyboard.Key

	constructor() {
		super({
			key: 'LEVEL_03'
		})
		// Heads up Display Data
		this.collectablePoints = 0
		this.levelScore = 0
		this.newRecordTime = 0
		this.screenX = 0
		this.screenY = 0
		this.startTime = 0
		this.GoT = false
	}

	preload(time: number, delta: number): void {
		this.load.image('tileset', 'assets/level/truffles_level_1_tileset.png');
		this.load.tilemapTiledJSON('level', 'assets/level/truffles_level_1.json');

		this.load.setPath('assets/spine/')
		this.load.spine(TRUFFLES_KEY, 'truffles/truffles_all.json', 'truffles/truffles_all.atlas')
		this.load.spine(DIVER_KEY, 'diver/diver.json', 'diver/diver.atlas')
		this.load.spine(KEYS[0], 'fruits/orange/orange.json', 'fruits/orange/orange.atlas')
		this.load.spine(KEYS[1], 'fruits/grape/grape.json', 'fruits/grape/grape.atlas')
		this.load.spine(KEYS[2], 'fruits/lemon/lemon.json', 'fruits/lemon/lemon.atlas')
		this.load.spine(CANNONBALL_KEY, 'cannonball/cannonball.json', 'cannonball/cannonball.atlas')
		this.load.spine(WINDMILL_KEY, 'windmill/windmill.json', 'windmill/windmill.atlas')
		this.load.spine(DPAD_KEY, 'dpad/DPad_02.json', 'dpad/DPad_02.atlas')
		this.load.spine(SOUND_KEY, 'sound/sound.json', 'sound/sound.atlas')
		this.load.spine(TIMER_KEY, 'timer/timer.json', 'timer/timer.atlas')
		this.load.spine(BRIDGE_KEY, 'drawbridge/drawbridge.json', 'drawbridge/drawbridge.atlas')
	}

	create(time: number, delta: number): void {
		// Setup Screen Dimensions
		let {
			width,
			height
		} = this.sys.game.canvas;
		this.screenX = width
		this.screenY = height

		//Setup the Player
		// The X Y needs to come from tiles spawn points
		this.player = new Player(new Phaser.Math.Vector2(100, 360))
		this.player.setVelocityX(new Phaser.Math.Vector2(2, 0))
		this.player.setVelocityY(new Phaser.Math.Vector2(0, 2))

		//Setup Game State
		this.gameState = GSM.PLAY

		// Retrieve Recorded Score and Time from LocalStorage
		this.fetchRecordedScore()
		this.fetchRecordedTime()
		
		// Load Current Level
		this.loadCurrentLevel()

		// Setup HUD
		// Score
		this.currentScoreText = new HudText(this)
		this.currentScoreText.setShadow(3, 3)
		this.currentScoreText.setStroke('#fff', 16);
		this.currentScoreText.setShadow(2, 2, "#333333", 2, true, true);
		// Elapsed Time
		this.elapsedTimeText = new HudText(this)
		this.elapsedTimeText.setShadow(3, 3)
		this.elapsedTimeText.setStroke('#fff', 16);
		this.elapsedTimeText.setShadow(2, 2, "#333333", 2, true, true);
		// Record Time
		this.recordTimeText = new HudText(this)
		this.recordTimeText.setShadow(3, 3)
		this.recordTimeText.setStroke('#fff', 16);
		this.recordTimeText.setShadow(2, 2, "#333333", 2, true, true);

		// TODO : Remove magic numbers
		this.hudtimer = this.createSpineObject(IDLE_KEY, TIMER_KEY, this.screenX * 0.67, this.screenY * 0.001, 1, 1)
		.setDepth(5)
		.setScale( 0.75, 0.75 )
		let hudTimerAnimationStates = this.hudtimer.getAnimationList()
		this.hudtimer.play(hudTimerAnimationStates[1], true)

		// Update Score Frequency
		this.time.addEvent({
			delay: 500,
			loop: true,
			callback: this.fetchRecordedScore,
			callbackScope: this
		});

		//Setup Map Data
		this.setupMap()
		var tilesWide = this.map.width
		var tilesHigh = this.map.height

		// Background Music
		this.backingMusic = this.sound.add('level_backing_track', {
			loop: true
		})
		this.backingMusic.play()

		// Play Church Bells
		this.churchBells = this.sound.add('church_bells', {volume: 0.5})
		this.time.addEvent({
			delay: 6000,
			loop: true,
			callback: this.playChurchBells,
			callbackScope: this
		});

		// Setup Truffles
		this.truffles = this.createSpineObject(IDLE_KEY, TRUFFLES_KEY, 
			this.player.getX(), this.player.getY(), this.player.getScale(), this.player.getScale())
		this.truffles.setDepth(0)
		this.initializeAnimationsState(this.truffles, this.trufflesAnimationNames)

		// Setup Divers
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				var tile = this.diverLayer.getTileAt(j, i)
				if (tile != null) {
					if (tile.index === DIVER.START) {
						this.divers.push(this.createSpineObject(DIVER_ANIM.WALK_DOWN, DIVER_KEY, 
							j * this.tileSize, i * this.tileSize + (this.tileSize - 1), DIVER.SCALE, DIVER.SCALE))
						this.diverMove.push(DIVER.SPEED)
					}
				}
			}
		}
		// Init diver animations
		for (let i = 0; i < this.divers.length; i++) {
			this.initializeAnimationsState(this.divers[i], this.diverAnimationNames)
			this.divers[i].setDepth(-1)
		}

		// Cannon Ball Setup
		this.cannonball.push(this.createSpineObject(IDLE_KEY, CANNONBALL_KEY, this.cannonballPosX[0], this.cannonballPosY[0], 1.2, 1.2))
		this.cannonball.push(this.createSpineObject(IDLE_KEY, CANNONBALL_KEY, this.cannonballPosX[1], this.cannonballPosY[1], 1.2, 1.2))
		this.cannonball.push(this.createSpineObject(IDLE_KEY, CANNONBALL_KEY, this.cannonballPosX[2], this.cannonballPosY[2], 1.2, 1.2))

		// Setup Cannon ball animations
		for (let i = 0; i < this.cannonball.length; i++) {
			this.initializeAnimationsState(this.cannonball[i], this.cannonballAnimationNames)
			this.cannonball[i].setDepth(-1)
		}

		// setup drawbridge
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				var tile = this.bridgeLayer.getTileAt(j, i)
				if (tile != null) {
					if(tile.index == BRIDGE.PLACE) {
						this.bridge = this.createSpineObject(IDLE_KEY, BRIDGE_KEY, j * this.tileSize + BRIDGE.OFFSETX, 
							i * this.tileSize + BRIDGE.OFFSETY, BRIDGE.scaleX, BRIDGE.scaleY )
					}
				}
			}
		}
		this.bridge.setDepth(-1)
		this.bridgeOpen = false

		// Add Windmill
		// TODO: This needs to be from tiled
		this.windmill = this.createSpineObject(IDLE_KEY, WINDMILL_KEY, 50, 0, 1, 1)
		this.windmill.setDepth(-1)

		// Keyboard Setup
		this.cursors = this.input.keyboard.createCursorKeys()
		// Add WASD
		this.key_w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.key_a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.key_s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.key_d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.key_g = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)

		//Multitouch: the below sets the amount of concurrent touches can happen
		this.input.addPointer(2);

		// Add dpad
		this.dpad = this.createSpineObject(IDLE_KEY, DPAD_KEY, 1180, 630, 1, 1)
		.setScale(0.9)
		.setDepth(5)
		let dpad_bones = this.dpad.getBoneList()
		let dpadAnimationNames = this.dpad.getAnimationList()
		for (var i = 0; i < dpad_bones.length; i++){
			let bone = this.dpad.findBone(dpad_bones[i])
			// The line below creates touch-zones over the top of the dpad buttons. These are the touch-reactive elements.
			// To make them visible, remove the last parameter of the function which sets the alpha to 0 - transparency full.
			// When testing, it might be needed to make these touch-zones bigger or smaller, the third argument sets the size of the circle. 
			let controls = this.add.circle(bone.worldX, 720 - (bone.worldY), 15, 0x00000000, 0)
			controls['bone'] = bone.data.name
			controls.setDepth(5)
			controls.setInteractive()
			controls.on('pointerdown', function dpadInput(this, dpad){
				let dinput = this['bone']
				switch (dinput){
					case "Up":
						this.dpadAnimationIndex = dpadAnimationNames.indexOf(dinput)
						console.log("dpad up")
						//this.player.moveUp()
						break
					case "Down":
						this.dpadAnimationIndex = dpadAnimationNames.indexOf(dinput)
						console.log("dpad down")
						//this.player.moveDown()
						break
					case "Left":
						this.dpadAnimationIndex = dpadAnimationNames.indexOf(dinput)
						console.log("dpad left")
						//this.player.moveLeft()
						break
					case "Right":
						this.dpadAnimationIndex = dpadAnimationNames.indexOf(dinput)
						console.log("dpad right")
						//this.player.moveRight()
						break
					case "LeftDown":
						this.dpadAnimationIndex = dpadAnimationNames.indexOf(dinput)
						console.log("dpad Left Down")
						//this.player.moveRight()
						break
					case "LeftUp":
						this.dpadAnimationIndex = dpadAnimationNames.indexOf(dinput)
						console.log("dpad Left Up")
						//this.player.moveRight()
						break
					case "RightDown":
						this.dpadAnimationIndex = dpadAnimationNames.indexOf(dinput)
						console.log("dpad Right Down")
						//this.player.moveRight()
						break
					case "RightUp":
						this.dpadAnimationIndex = dpadAnimationNames.indexOf(dinput)
						console.log("dpad Right Up")
						//this.player.moveRight()
						break
					case "Static":
						this.dpadAnimationIndex = dpadAnimationNames.indexOf(dinput)
						break
					default:
						this.dpadAnimationIndex = dpadAnimationNames.indexOf("Static")
						break
				}
			})
			controls.on('pointerup', function(this){
				this.dpadAnimationIndex = dpadAnimationNames.indexOf("Static")
			})
		}
		

		// Setup Fruits
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				var tile = this.candyLayer.getTileAt(j, i)
				if (tile != null) {
					if (tile.index === FRUITS.ORANGE_TILE) {
						this.fruit.push(this.createSpineObject(IDLE_KEY, KEYS[0], j * this.tileSize, i * this.tileSize, 0.7, 0.7))
						this.fruitMarked.push(false)
					} else if (tile.index === FRUITS.LEMON_TILE) {
						this.fruit.push(this.createSpineObject(IDLE_KEY, KEYS[1], j * this.tileSize, i * this.tileSize, 0.7, 0.7))
						this.fruitMarked.push(false)
					} else if (tile.index === FRUITS.GRAPE_TILE) {
						this.fruit.push(this.createSpineObject(IDLE_KEY, KEYS[2], j * this.tileSize, i * this.tileSize, 0.7, 0.7))
						this.fruitMarked.push(false)
					}
				}
			}
		}
		this.fruitRemaining = this.fruit.length

		// Init fruit animations
		for (let o = 0; o < this.fruit.length; o++) {
			this.initializeAnimationsState(this.fruit[o], this.fruitAnimationNames)
		}
		
		// Mute button
		this.soundbtn = this.createSpineObject(IDLE_KEY, SOUND_KEY, this.screenX * 0.001, this.screenY * 0.001, 1, 1)
		.setScale(0.8, 0.8)
		.setDepth(5)
		.setInteractive()
		let soundStates = this.soundbtn.getAnimationList()
		let savedSoundState = window.localStorage.getItem('soundState')
		let soundState = true
		if (window.localStorage.getItem('soundState') === "false"){
			this.game.sound.mute = true
			this.soundbtn.play(soundStates[1], true)
		}
		this.soundbtn.on('pointerdown', () => {
			if (soundState == true){
				soundState = false
				this.soundbtn.play(soundStates[1], true)
				window.localStorage.setItem('soundState', soundState.toString())
				this.game.sound.mute = true
				return
			} if (soundState == false){
				soundState = true
				this.game.sound.mute = false
				this.soundbtn.play(soundStates[0], true)
				window.localStorage.setItem('soundState', soundState.toString())
				return
			}
		})

		// Initialise Player State
		this.playerState = new PlayerState(this, this.truffles, 0, 0)
		this.playerState.getState()?.enter(0, 0, this.player) // Activate Idle
		this.player.setState(this.playerState)
	}

	// Game Update Method

	update(time: number, delta: number): void {

		// Start time
		if(this.startTime === 0){
			this.startTime = time
		}

		// TODO: BETTER Game State Management
		this.setCurrentLevel()
		
		if (this.gameState === GSM.PLAY) {
			this.elapsedLevelTime = time - this.startTime

		} else if (this.gameState === GSM.LEVEL_COMPLETE) {

			//Store Record Time
			if (Math.round((this.elapsedLevelTime * 0.001)) <= this.bestRecordedTime) {
				this.setRecord(Math.round((this.elapsedLevelTime * 0.001)))
				this.fetchRecordedTime()

			} else {
				this.newRecordTime = this.bestRecordedTime
			}

			this.time.addEvent({
				delay: NEXT_LEVEL.DELAY,
				loop: true,
				callback: this.levelComplete,
				callbackScope: this
			});
		}

		// Cannon Ball Movement
		this.cannonballMove()

		const size = this.trufflesAnimationNames.length

		// Handles input
		if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {
			this.player.getState().handleInput(INPUT_TYPES.WALK_RIGHT, time, delta, this.player) 
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {
			this.player.getState().handleInput(INPUT_TYPES.WALK_LEFT, time, delta, this.player)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.up!)) {
			this.player.getState().handleInput(INPUT_TYPES.WALK_UP, time, delta, this.player)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.down!)) {
			this.player.getState().handleInput(INPUT_TYPES.WALK_DOWN, time, delta, this.player)
		} 
		
		// Todo multiple hits on Key
		if (this.key_d.isDown) {
			console.log('D')
			this.player.getState().handleInput(INPUT_TYPES.WALK_RIGHT, time, delta, this.player)
		} else if (this.key_a.isDown) {
			console.log('A')
			this.player.getState().handleInput(INPUT_TYPES.WALK_LEFT, time, delta, this.player)
		} else if (this.key_w.isDown) {
			console.log('W')
			this.player.getState().handleInput(INPUT_TYPES.WALK_UP, time, delta, this.player)
		} else if (this.key_s.isDown) {
			console.log('S')
			this.player.getState().handleInput(INPUT_TYPES.WALK_DOWN, time, delta, this.player)
		} else if (this.key_g.isDown) {
			console.log('G')
			if(this.GoT){
				this.GoT = true
				this.groundLayer.setVisible(false)
			}else{
				this.GoT = false
				this.groundLayer.setVisible(true)
			}
		}

		// DOES NOT WORK, can't feed new player input into the PlayerStateMachine.
		// if (this.dpadAnimationIndex === this.dpadAnimationNames.indexOf('Up')){
		//if (this.dpadAnimationIndex === 0){
		//	console.log('INDEX 0')
		 	//this.player.getState().handleInput(INPUT_TYPES.WALK_UP, time, delta, this.player)
		//} else if (this.dpadAnimationIndex === this.dpadAnimationNames.indexOf('Down')){
		//} else if (this.dpadAnimationIndex === 1){
		//	console.log('INDEX 1')
		// 	//this.player.getState().handleInput(INPUT_TYPES.WALK_DOWN, time, delta, this.player)
		//}

		// Can player move
		if (this.player.getMove()) {
			if (this.cursors.right.isDown) {
				let x = this.map.worldToTileX(this.player.getX() - this.tileSize / 2)
				let y = this.map.worldToTileY(this.player.getY())

				this.tile = this.collisionLayer.getTileAt(x + 1, y)

				if (this.tile == null) {
					this.player.moveRight()
					this.truffles.setPosition(this.player.getX(), this.player.getY())
				}
				
				// Check is Goal Reached
				x = this.map.worldToTileX(this.player.getX())
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.goalLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === GOAL.TILE){
						// Reached Goal
						this.player.getState().handleInput(INPUT_TYPES.REACHED_GOAL, time, delta, this.player)
						this.gsmUpdate(time, delta)
					}
				}

				// Check if River Splash
				x = this.map.worldToTileX(this.player.getX())
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.waterLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === RIVER.TILE){
						// Reached River
						this.player.getState().handleInput(INPUT_TYPES.SPLASH, time, delta, this.player)
					}
				}

			}

			if (this.cursors.left.isDown) {
				let x = this.map.worldToTileX(this.player.getX() + this.tileSize / 2)
				let y = this.map.worldToTileY(this.player.getY())

				this.tile = this.collisionLayer.getTileAt(x - 1, y)

				if (this.tile == null) {
					this.player.moveLeft()
					this.truffles.setPosition(this.player.getX(), this.player.getY())
				}

				// Check is Goal Reached
				x = this.map.worldToTileX(this.player.getX())
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.goalLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === GOAL.TILE){
						// Reached Goal
						this.player.getState().handleInput(INPUT_TYPES.REACHED_GOAL, time, delta, this.player)
						this.gsmUpdate(time, delta)
					}
				}

				// Check if River Splash
				x = this.map.worldToTileX(this.player.getX())
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.waterLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === RIVER.TILE){
						// Reached River
						this.player.getState().handleInput(INPUT_TYPES.SPLASH, time, delta, this.player)
					}
				}
			}

			if (this.cursors.up.isDown) {
				let x = this.map.worldToTileX(this.player.getX())
				let y = this.map.worldToTileY(this.player.getY() + this.tileSize / 4)

				this.tile = this.collisionLayer.getTileAt(x, y - 1)

				if (this.tile == null) {
					this.player.moveUp()
					this.truffles.setPosition(this.player.getX(), this.player.getY())
				}

				// Check is Goal Reached
				x = this.map.worldToTileX(this.player.getX())
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.goalLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === GOAL.TILE){
						// Reached Goal
						this.player.getState().handleInput(INPUT_TYPES.REACHED_GOAL, time, delta, this.player)
						this.gsmUpdate(time, delta)
					}
				}

				// Check if River Splash
				x = this.map.worldToTileX(this.player.getX())
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.waterLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === RIVER.TILE){
						// Reached River
						this.player.getState().handleInput(INPUT_TYPES.SPLASH, time, delta, this.player)
					}
				}
			}

			if (this.cursors.down.isDown) {

				let x = this.map.worldToTileX(this.player.getX())
				let y = this.map.worldToTileY(this.player.getY() + this.player.getVelocityY().y)

				this.tile = this.collisionLayer.getTileAt(x, y)

				if (this.tile == null) {
					this.player.moveDown()
					this.truffles.setPosition(this.player.getX(), this.player.getY())
				}

				// Check is Goal Reached
				x = this.map.worldToTileX(this.player.getX())
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.goalLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === GOAL.TILE){
						// Reached Goal
						this.player.getState().handleInput(INPUT_TYPES.REACHED_GOAL, time, delta, this.player)
						this.gsmUpdate(time, delta)
					}
				}

				// Check if River Splash
				x = this.map.worldToTileX(this.player.getX())
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.waterLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === RIVER.TILE){
						// Reached River
						this.player.getState().handleInput(INPUT_TYPES.SPLASH, time, delta, this.player)
					}
				}
			}

			if (!this.cursors.down.isDown && !this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
				this.player.getState().handleInput(INPUT_TYPES.IDLE, time, delta, this.player)
			} else {
				for (let i = 0; i < this.fruit.length; i++) {

					if (!this.fruitMarked[i] && this.trufflesAABB(this.fruit[i])) {
						this.changeAnimation(this.fruit[i], this.fruitAnimationNames, 1)
						this.time.addEvent({
							delay: ANIMATION_DELAY.FRUIT,
							callback: this.fruitAnimate,
							callbackScope: this,
							args: [i, time, delta]
						})
						this.fruitMarked[i] = true
						if(i === 0){
							this.addPoints(POINTS.FRUIT_0)
						}else if(i == 1){
							this.addPoints(POINTS.FRUIT_1)
						} else if(i === 2){
							this.addPoints(POINTS.FRUIT_2)
						}
						this.player.getState().handleInput(INPUT_TYPES.EATING, time, delta, this.player)
					}
				}
			}
		}
		//check fruit
		if(this.fruitRemaining <= 0 && !this.bridgeOpen) {
			this.bridge.play(BRIDGE_ANIMS.TRANSITIONING, false)
			this.bridgeOpen = true
			for (let i = 0; i < this.map.height; i++) {
				for (let j = 0; j < this.map.width; j++) {
					var tile = this.bridgeLayer.getTileAt(j, i)
					if (tile != null) {
						this.collisionLayer.removeTileAt(j, i)
					}
				}
			}
		}
		
		// Diver Move
		for (let i = 0; i < this.divers.length; i++) {
			this.divers[i].y += this.diverMove[i]
			const x = this.map.worldToTileX(this.divers[i].x)
			const y = this.map.worldToTileY(this.divers[i].y)

			this.tile = this.diverLayer.getTileAt(x, y)

			if (this.tile.index == DIVER.START) {
				this.diverMove[i] = DIVER.SPEED
				this.divers[i].play(DIVER_ANIM.WALK_DOWN, true)
			}
			else if(this.tile.index == DIVER.END) {
				this.diverMove[i] = -DIVER.SPEED
				this.divers[i].play(DIVER_ANIM.WALK_UP, true)
			}
		}

		// Diver Collision
		for(let i = 0; i < this.divers.length; i++) {
			if (this.trufflesEnemyCollision(this.divers[i], i)){
				this.player.getState().handleInput(INPUT_TYPES.EXPIRED, time, delta, this.player)
				this.addPoints(POINTS.DIVER_COLLISION)
			}
		}
		// handle push
		let x = this.map.worldToTileX(this.player.getX())
		let y = this.map.worldToTileY(this.player.getY() - this.player.getVelocityY().y)

		this.tile = this.collisionLayer.getTileAt(x, y)
		if(this.tile == null) {
			this.player.push()
			this.truffles.setPosition(this.player.getX(), this.player.getY())
		}

		// cannonball collisions
		for (let i = 0; i < this.cannonball.length; i++) {
			if (this.trufflesAABB(this.cannonball[i])) {
				this.player.getState().handleInput(INPUT_TYPES.EXPIRED, time, delta, this.player)
				this.addPoints(POINTS.CANNON_BALL_COLLISION)
			}
		}

		// Updates the Player State See PlayerStateMachine*/
		this.player.getState().getState()?.update(time, delta, this.player)

		// Display Updated HUD
		this.currentScoreText.setPosition(this.screenX * 0.90, this.screenY * 0.04)
		this.currentScoreText.update()
		this.currentScoreText.setText(' ' + this.levelScore + ' ')
		this.currentScoreText.setDepth(10)

		this.elapsedTimeText.setPosition(this.screenX * 0.75, this.screenY * 0.04)
		this.elapsedTimeText.update()
		this.elapsedTimeText.setText(' ' + Math.round((this.elapsedLevelTime * 0.001)) + ' ')
		this.elapsedTimeText.setDepth(10)

		this.recordTimeText.setPosition(this.screenX * 0.55, this.screenY * 0.04)
		this.recordTimeText.update()
		this.recordTimeText.setText(' ' + this.bestRecordedTime + ' ')
		this.recordTimeText.setDepth(10)
	}

	//Setup Map Data
	private setupMap() {
		this.map = this.make.tilemap({
			key: 'level',
			tileWidth: this.tileSize,
			tileHeight: this.tileSize
		});
		this.tileset = this.map.addTilesetImage("truffles_level_1_tileset", 'tileset');

		this.waterLayer = this.map.createLayer('map/water/water_depth_00', this.tileset, 0, 0);
		this.waterLayer.setDepth(-10); //SET DEPTH 00 TO -10

		this.groundLayer = this.map.createLayer('map/ground/ground_depth_00', this.tileset, 0, 0);
		this.groundLayer.setDepth(-10); //SET DEPTH 00 TO -10
		//this.groundLayer.setVisible(false) // TODO  Special Game of Thrones Level

		this.ground2Layer = this.map.createLayer('map/shadow/shadow_depth_01', this.tileset, 0, 0);
		this.ground2Layer.setDepth(-9); //SET DEPTH 1 TO -9
		//this.groundLayer.setVisible(false) // TODO  Special Game of Thrones Level

		this.house2Layer = this.map.createLayer('map/buildings/foreground/house_depth_01/house_layer_2', this.tileset, 0, 0);
		this.house2Layer.setDepth(-9); //SET DEPTH 1 TO -9

		this.house1Layer = this.map.createLayer('map/buildings/foreground/house_depth_01/house_layer_1', this.tileset, 0, 0);
		this.house1Layer.setDepth(-9); //SET DEPTH 1 TO -9

		this.wall1Layer = this.map.createLayer('map/castle/walls/walls_depth_01', this.tileset, 0, 0);
		this.wall1Layer.setDepth(-9); //SET DEPTH 1 TO -9

		this.wall2Layer = this.map.createLayer('map/castle/walls/walls_depth_03', this.tileset, 0, 0);
		this.wall2Layer.setDepth(3);

		this.churchLayer = this.map.createLayer('map/buildings/foreground/church_depth_01/church_01', this.tileset, 0, 0);
		this.churchLayer.setDepth(-9); //SET DEPTH 1 TO -9

		this.castleLayer = this.map.createLayer('map/castle/castle/castle_depth_01', this.tileset, 0, 0);
		this.castleLayer.setDepth(-9); //SET DEPTH 1 TO -9

		this.miscLayer = this.map.createLayer('map/environment_objects/miscellaneous_depth_01', this.tileset, 0, 0);
		this.miscLayer.setDepth(-9); //SET DEPTH 1 TO -9

		this.wallTop1Layer = this.map.createLayer('map/castle/walls/wall_top_depth_01', this.tileset, 0, 0);
		this.wallTop1Layer.setDepth(-9); //SET DEPTH 1 TO -9

		this.wallTop2Layer = this.map.createLayer('map/castle/walls/wall_top_depth_04', this.tileset, 0, 0);
		this.wallTop2Layer.setDepth(4);

		this.house2RoofLayer = this.map.createLayer('map/buildings/background/house_roof_depth_03/house_roof_layer_2', this.tileset, 0, 0);
		this.house2RoofLayer.setDepth(3);

		this.houseRoofLayer = this.map.createLayer('map/buildings/background/house_roof_depth_03/house_roof_layer_1', this.tileset, 0, 0);
		this.houseRoofLayer.setDepth(3);

		this.towerTop1Layer = this.map.createLayer('map/castle/tower/tower_top_depth_01', this.tileset, 0, 0);
		this.towerTop1Layer.setDepth(-9); //SET DEPTH 1 TO -9

		this.towerTop2Layer = this.map.createLayer('map/castle/tower/tower_top_depth_04', this.tileset, 0, 0);
		this.towerTop2Layer.setDepth(4);

		this.churchRoofLayer = this.map.createLayer('map/buildings/background/church_depth_03/church_roof_03', this.tileset, 0, 0);
		this.churchRoofLayer.setDepth(-9); //SET DEPTH 1 TO -9

		this.castleRoofLayer = this.map.createLayer('map/castle/castle/castle_roof_depth_02', this.tileset, 0, 0);
		this.castleRoofLayer.setDepth(2);

		this.miscTop1Layer = this.map.createLayer('map/environment_objects/tree_01', this.tileset, 0, 0);
		this.miscTop1Layer.setDepth(-9); //SET DEPTH 1 TO -9

		this.miscTop2Layer = this.map.createLayer('map/environment_objects/tree_top_04', this.tileset, 0, 0);
		this.miscTop2Layer.setDepth(4);

		this.collisionLayer = this.map.createLayer('map/environment_collision/collide_depth_02', this.tileset, 0, 0);
		this.collisionLayer.setDepth(2)
		this.collisionLayer.setVisible(false)

		// Check the levels to load
		let temp = window.localStorage.getItem(LEVEL_DATA_KEY.CURRENT)
		let current_level: string
			if (temp !== null) {
				current_level = temp
			} else {
			current_level = LEVELS.LEVEL_01
		}

		if(current_level === LEVELS.LEVEL_01){
			this.candyLayer = this.map.createLayer('map/collectables/candies_level1_depth_02', this.tileset, 0, 0);
			this.diverLayer = this.map.createLayer('map/patrol/level1', this.tileset, 0, 0);

		} else if(current_level === LEVELS.LEVEL_02){
			this.candyLayer = this.map.createLayer('map/collectables/candies_level2_depth_02', this.tileset, 0, 0);
			this.diverLayer = this.map.createLayer('map/patrol/level2', this.tileset, 0, 0);
		} else if(current_level === LEVELS.LEVEL_03){
			this.candyLayer = this.map.createLayer('map/collectables/candies_level3_depth_02', this.tileset, 0, 0);
			this.diverLayer = this.map.createLayer('map/patrol/level3', this.tileset, 0, 0);
		} else if(current_level === LEVELS.LEVEL_04){
			this.candyLayer = this.map.createLayer('map/collectables/candies_level4_depth_02', this.tileset, 0, 0);
			this.diverLayer = this.map.createLayer('map/patrol/level4', this.tileset, 0, 0);
		}  else{
			this.candyLayer = this.map.createLayer('map/collectables/candies_level1_depth_02', this.tileset, 0, 0);
			this.diverLayer = this.map.createLayer('map/patrol/level1', this.tileset, 0, 0);
		}

		this.candyLayer.setDepth(2); 
		this.candyLayer.setVisible(false)

		this.diverLayer.setDepth(2)
		this.diverLayer.setVisible(false)

		this.goalLayer = this.map.createLayer('map/goal/goal_depth_02', this.tileset, 0, 0);
		this.goalLayer.setDepth(2)
		this.goalLayer.setVisible(true)

		this.bridgeLayer = this.map.createLayer('map/environment_objects/animated/drawbridge_01', this.tileset, 0, 0);
		this.bridgeLayer.setVisible(false)
	}


	private createSpineObject(startAnim: string, key: string, x: number, y: number, scaleX: number, scaleY: number) {
		let object = this.add.spine(x, y, key, startAnim, true)
		object.scaleX = scaleX
		object.scaleY = scaleY
		return object
	}

	private initializeAnimationsState(spine: SpineGameObject, animationNames: string[]) {
		const startAnim = spine.getCurrentAnimation().name

		spine.getAnimationList().forEach((name, idx) => {
			animationNames.push(name)
			if (name === startAnim) {
				this.trufflesAnimationIndex = idx
			}
		})
	}

	private changeAnimation(spine: SpineGameObject, animationNames: string[], index: number) {
		const animation = animationNames[index]
		spine.play(animation, true)
	}

	//Truffles to Object Collision
	private trufflesAABB(collidable: SpineGameObject) {

		var collision = false;

		if (this.player.getX() - this.tileSize / 2 < collidable.x + collidable.scaleX * collidable.width &&
			this.player.getX() + this.tileSize / 2 > collidable.x &&
			this.player.getY() - this.tileSize < collidable.y + collidable.scaleY * collidable.height &&
			this.player.getY() > collidable.y) {
			collision = true;
		}
		if(collidable.y > this.player.getY()){
			collidable.setDepth(1)
		}
		else {
			collidable.setDepth(-1)
		}

		return collision
	}
	private trufflesEnemyCollision(enemy: SpineGameObject, index: number) {

		var collision = false;

		if((this.map.worldToTileX(this.player.getX()) == this.map.worldToTileX(enemy.x) ||
			this.map.worldToTileX(this.player.getX()) == this.map.worldToTileX(enemy.x)-1) &&
			this.map.worldToTileY(this.player.getY()) == this.map.worldToTileY(enemy.y)) {
				collision = true;
				enemy.play(DIVER_ANIM.PUSH, false)
				this.player.setPushSpeed(DIVER.PUSH_SPEED)
				this.time.addEvent({
					delay: 800,
					callback: this.resetDiverAnim,
					callbackScope: this,
					args: [index]
				})
			}
		if(enemy.y > this.player.getY()){
			enemy.setDepth(1)
		}
		else {
			enemy.setDepth(-1)
		}

		return collision
	}
	private resetDiverAnim(index: number) {
		if(this.diverMove[index] > 0) {
			this.divers[index].play(DIVER_ANIM.WALK_DOWN, true)
		}
		else {
			this.divers[index].play(DIVER_ANIM.WALK_UP, true)
		}
		this.player.setPushSpeed(0)
	}

	// Play Church Bells
	private playChurchBells(index: number, time: number, delta: number) {
		let chance = Phaser.Math.Between(0, 24)
		if(chance === 12 || chance === 6){
			this.churchBells.play()
		}
	}

	// Fruit Animations
	private fruitAnimate(index: number, time: number, delta: number) {
		this.changeAnimation(this.fruit[index], this.fruitAnimationNames, 2)
		this.time.addEvent({
			delay: 1000,
			callback: this.fruitDelete,
			callbackScope: this,
			args: [index, time, delta]
		})
	}

	// Delete fruits
	private fruitDelete(index: number, time: number, delta: number) {
		const x = this.map.worldToTileX(this.fruit[index].x)
		const y = this.map.worldToTileY(this.fruit[index].y)

		this.tile = this.candyLayer.getTileAt(x, y)
		this.map.removeTile(this.tile)
		this.fruit[index].removeFromDisplayList()
		this.fruitRemaining--
	}

	// Reset Cannon Balls
	private cannonballReset(index: number) {
		this.cannonball[index].setPosition(this.cannonballPosX[index], this.cannonballPosY[index] = 40)
		this.changeAnimation(this.cannonball[index], this.cannonballAnimationNames, 1)
		this.cannonballMoving[index] = true

	}

	// Move Cannon Balls
	private cannonballMove() {

		for (let i = 0; i < this.cannonball.length; i++) {
			if (this.cannonballMoving[i]) {
				this.cannonballPosY[i] += this.cannonballSpeed;
				this.cannonball[i].setPosition(this.cannonballPosX[i], this.cannonballPosY[i])
			}
			if (this.cannonballPosY[i] >= 655) {
				this.time.addEvent({
					delay: 600,
					callback: this.cannonballReset,
					callbackScope: this,
					args: [i]
				})
				if (this.cannonballMoving[i]) {
					this.changeAnimation(this.cannonball[i], this.cannonballAnimationNames, 2)
				}
				this.cannonballMoving[i] = false
			}
		}
	}

	// Set Record Time
	private setRecord(time: number) {
		this.newRecordTime = time
	}

	// Add Points
	private addPoints(points: number) {
		if (points > 0) {
			this.collectablePoints += points
		}
	}

	// Fetch Recorded Time
	private fetchRecordedTime() {
		let temp = window.localStorage.getItem('time_' + this.loadCurrentLevel())
		if (temp !== null) {
			this.bestRecordedTime = parseInt(temp) || 0
			if (this.bestRecordedTime === 0) {
				this.bestRecordedTime = 1000
			}
		} else {
			this.bestRecordedTime = 0
		}

		window.localStorage.setItem('time_' + this.loadCurrentLevel(), this.newRecordTime.toString())
	}

	// Fetch Recorded Score
	private fetchRecordedScore() {
		let temp = window.localStorage.getItem('score_' + this.loadCurrentLevel())
		if (temp !== null) {
			this.levelScore = parseInt(temp) || 0
		} else {
			this.levelScore = 0
		}
		this.levelScore += this.collectablePoints
		this.collectablePoints = 0 // Reset Points
		window.localStorage.setItem('score_' + this.loadCurrentLevel(), this.levelScore.toString())
	}

	// Fetch Current Level
	private loadCurrentLevel() : string {
		let temp = window.localStorage.getItem(LEVEL_DATA_KEY.CURRENT)
		if (temp !== null) {
			this.player.setCurrentLevel(temp)
		} else {
			this.player.setCurrentLevel(LEVELS.LEVEL_01)
		}
		window.localStorage.setItem(LEVEL_DATA_KEY.CURRENT, this.player.getCurrentLevel())
		window.localStorage.setItem(LEVEL_DATA_KEY.NEXT, this.player.getNextLevel())
		window.localStorage.setItem(LEVEL_DATA_KEY.CURRENT_ARTIFACT, this.player.getCurrentArtifact())
		window.localStorage.setItem(LEVEL_DATA_KEY.NEXT_ARTIFACT, this.player.getNextArtifact())

		return this.player.getCurrentLevel()
	}

	// Set Current Level to a New Level
	private setCurrentLevel() : string {
		let temp = window.localStorage.getItem(LEVEL_DATA_KEY.CURRENT)
		let current_level: string
		if (temp !== null) {
			current_level = temp
		} else {
			current_level = LEVELS.LEVEL_01
		}
		// Check if there the same and if not set the new level
		if(this.player.getCurrentLevel() !== current_level){
			window.localStorage.setItem(LEVEL_DATA_KEY.CURRENT, this.player.getCurrentLevel())
			window.localStorage.setItem(LEVEL_DATA_KEY.NEXT, this.player.getNextLevel())
			window.localStorage.setItem(LEVEL_DATA_KEY.CURRENT_ARTIFACT, this.player.getCurrentArtifact())
			window.localStorage.setItem(LEVEL_DATA_KEY.NEXT_ARTIFACT, this.player.getNextArtifact())
		}
		return this.player.getCurrentLevel()
	}

	private gsmUpdate(time: number, delta: number): void {
		this.gameState = GSM.LEVEL_COMPLETE
	}

	private levelComplete(){
		// Change Levels
		// NOTE IMPORTANT
		// LEVEL NEXTS TO BE SET TO NEXT LEVEL AND SCENE TO NEXT ARTIFACT
		window.localStorage.setItem(LEVEL_DATA_KEY.CURRENT, LEVELS.LEVEL_03)
		this.backingMusic.stop()
		this.scene.start('ArtiFactThreeScene')
		// ENDS: Change Levels

	}
}
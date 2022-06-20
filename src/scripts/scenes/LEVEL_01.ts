// Heads up display text
import HudText from '../objects/hudText'

// Player State
import PlayerState from '../objects/PlayerState'

// Player state machine
import {
	UnderAttack
} from '../objects/PlayerStateMachine'

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
	DIVER_ANIM
} from '../objects/gameENUMS'
import Player from '../objects/Player'


const TRUFFLES_KEY = 'truffles'
const IDLE_KEY = 'idle'
const CANNONBALL_KEY = 'cannonball'
const WINDMILL_KEY = 'windmill'
const DPAD_KEY = 'dpad'
const KEYS = ['orange', 'lemon', 'grape']
const DIVER_KEY = 'diver'
const SOUND_KEY = 'soundbtn'
const TIMER_KEY = 'hudtimer'

export default class LEVEL_01 extends Phaser.Scene {

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
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private orange!: SpineGameObject
	private lemon!: SpineGameObject
	private grape!: SpineGameObject
	private fruit: SpineGameObject[] = []
	private dpad!: SpineGameObject
	private soundbtn!: SpineGameObject

	private trufflesAnimationNames: string[] = []
	private trufflesAnimationIndex = 0

	private diverAnimationNames: string[] = []
	private diverAnimationIndex = 0
	private diverMove: number[] = []

	private fruitAnimationNames: string[] = []
	private fruitMarked: boolean[] = []
	private orangeAnimationIndex = 0
	private grapeAnimationIndex = 0
	private lemonAnimationIndex = 0

	private tileSize: number = 32

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
	private collisionLayer!: Phaser.Tilemaps.TilemapLayer
	private candyLayer!: Phaser.Tilemaps.TilemapLayer
	private goalLayer!: Phaser.Tilemaps.TilemapLayer
	private diverLayer!: Phaser.Tilemaps.TilemapLayer

	// Player Data
	private playerState!: PlayerState

	// WASD
	private keys

	constructor() {
		super({
			key: 'LEVEL_01'
		})
		// Heads up Display Data
		this.collectablePoints = 0
		this.levelScore = 0
		this.newRecordTime = 0
		this.screenX = 0
		this.screenY = 0
	}

	preload(time: number, delta: number): void {
		this.load.image('tileset', 'assets/level/truffles_level_1_tileset.png');
		this.load.image('hud', 'assets/level/hud.png');
		this.load.tilemapTiledJSON('level', 'assets/level/truffles_level_1.json');

		this.load.setPath('assets/spine/')
		this.load.spine(TRUFFLES_KEY, 'truffles/truffles_all.json', 'truffles/truffles_all.atlas')
		this.load.spine(DIVER_KEY, 'diver/diver.json', 'diver/diver.atlas')
		this.load.spine(KEYS[0], 'fruits/orange/orange.json', 'fruits/orange/orange.atlas')
		this.load.spine(KEYS[1], 'fruits/grape/grape.json', 'fruits/grape/grape.atlas')
		this.load.spine(KEYS[2], 'fruits/lemon/lemon.json', 'fruits/lemon/lemon.atlas')
		this.load.spine(CANNONBALL_KEY, 'cannonball/cannonball.json', 'cannonball/cannonball.atlas')
		this.load.spine(WINDMILL_KEY, 'windmill/windmill.json', 'windmill/windmill.atlas')
		this.load.spine(DPAD_KEY, 'dpad/DPad.json', 'dpad/DPad.atlas')
		this.load.spine(SOUND_KEY, 'sound/sound.json', 'sound/sound.atlas')
		this.load.spine(TIMER_KEY, 'timer/timer.json', 'timer/timer.atlas')
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
		this.hudtimer = this.createSpineObject(IDLE_KEY, TIMER_KEY, this.screenX * 0.67, this.screenY * 0.001, 1, 1)
		.setDepth(5)
		.setScale(0.75, 0.75 	)
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
		this.truffles.setDepth(2)
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
			this.divers[i].setDepth(2)
		}

		// Cannon Ball Setup
		this.cannonball.push(this.createSpineObject(IDLE_KEY, CANNONBALL_KEY, this.cannonballPosX[0], this.cannonballPosY[0], 1.2, 1.2))
		this.cannonball.push(this.createSpineObject(IDLE_KEY, CANNONBALL_KEY, this.cannonballPosX[1], this.cannonballPosY[1], 1.2, 1.2))
		this.cannonball.push(this.createSpineObject(IDLE_KEY, CANNONBALL_KEY, this.cannonballPosX[2], this.cannonballPosY[2], 1.2, 1.2))

		// Setup Cannon ball animations
		for (let i = 0; i < this.cannonball.length; i++) {
			this.cannonball[i].setDepth(2)
			this.initializeAnimationsState(this.cannonball[i], this.cannonballAnimationNames)
			this.cannonball[i].setDepth(0)
		}

		// Add Windmill
		// TODO: This needs to be from tiled
		this.windmill = this.createSpineObject(IDLE_KEY, WINDMILL_KEY, 50, 0, 1, 1)
		this.windmill.setDepth(1)

		// Keyboard Setup
		this.cursors = this.input.keyboard.createCursorKeys()
		// Add WASD
		this.keys = this.input.keyboard.addKeys('W,A,S,D')

		//Multitouch
		this.input.addPointer(2);


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

		// TODO: BETTER Game State Management
		this.setCurrentLevel()
		
		if (this.gameState === GSM.PLAY) {
			this.elapsedLevelTime = time;

		} else if (this.gameState === GSM.LEVEL_COMPLETE) {

			//Store Record Time
			if (Math.round((this.elapsedLevelTime * 0.001)) <= this.bestRecordedTime) {
				this.setRecord(Math.round((this.elapsedLevelTime * 0.001)))
				this.fetchRecordedTime()

			} else {
				this.newRecordTime = this.bestRecordedTime
			}

			this.time.addEvent({
				delay: 6000,
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
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.D)) {
			console.log('D')
			this.player.getState().handleInput(INPUT_TYPES.WALK_RIGHT, time, delta, this.player)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.A)) {
			console.log('A')
			this.player.getState().handleInput(INPUT_TYPES.WALK_LEFT, time, delta, this.player)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.W)) {
			console.log('W')
			this.player.getState().handleInput(INPUT_TYPES.WALK_UP, time, delta, this.player)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.S)) {
			console.log('S')
			this.player.getState().handleInput(INPUT_TYPES.WALK_DOWN, time, delta, this.player)
		}

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
				x = this.map.worldToTileX(this.player.getX() - this.tileSize / 2)
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.goalLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === GOAL.TILE){
						// Reached Goal
						this.player.getState().handleInput(INPUT_TYPES.REACHED_GOAL, time, delta, this.player)
						this.gsmUpdate(time, delta)
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
				x = this.map.worldToTileX(this.player.getX() - this.tileSize / 2)
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.goalLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === GOAL.TILE){
						// Reached Goal
						this.player.getState().handleInput(INPUT_TYPES.REACHED_GOAL, time, delta, this.player)
						this.gsmUpdate(time, delta)
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
				x = this.map.worldToTileX(this.player.getX() - this.tileSize / 2)
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.goalLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === GOAL.TILE){
						// Reached Goal
						this.player.getState().handleInput(INPUT_TYPES.REACHED_GOAL, time, delta, this.player)
						this.gsmUpdate(time, delta)
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
				x = this.map.worldToTileX(this.player.getX() - this.tileSize / 2)
				y = this.map.worldToTileY(this.player.getY())

				this.tile = this.goalLayer.getTileAt(x, y)

				if(this.tile !== null){
					if(this.tile.index === GOAL.TILE){
						// Reached Goal
						this.player.getState().handleInput(INPUT_TYPES.REACHED_GOAL, time, delta, this.player)
						this.gsmUpdate(time, delta)
					}
				}
			}

			if (!this.cursors.down.isDown && !this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
				this.player.getState().handleInput(INPUT_TYPES.IDLE, time, delta, this.player)
			} else {
				for (let i = 0; i < this.fruit.length; i++) {

					if (!this.fruitMarked[i] && this.trufflesAABB(this.truffles, this.fruit[i])) {
						console.log('Fruit Collision ' + i)
						this.changeAnimation(this.fruit[i], this.fruitAnimationNames, 1)
						this.time.addEvent({
							delay: 480,
							callback: this.fruitAnimate,
							callbackScope: this,
							args: [i, time, delta]
						})
						this.fruitMarked[i] = true
						this.addPoints(250)
						this.player.getState().handleInput(INPUT_TYPES.EATING, time, delta, this.player)
					}
				}
			}
		}

		// Diver Collision
		for(let i = 0; i < this.divers.length; i++) {
			if (this.trufflesAABB(this.truffles, this.divers[i])){
				this.player.getState().handleInput(INPUT_TYPES.EXPIRED, time, delta, this.player)
				this.addPoints(-150)
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

		// cannonball collisions
		for (let i = 0; i < this.cannonball.length; i++) {
			if (this.trufflesAABB(this.truffles, this.cannonball[i])) {
				this.player.getState().handleInput(INPUT_TYPES.EXPIRED, time, delta, this.player)
				this.addPoints(-150)
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
		this.waterLayer.setDepth(0);

		this.groundLayer = this.map.createLayer('map/ground/ground_depth_00', this.tileset, 0, 0);
		this.groundLayer.setDepth(0);

		this.ground2Layer = this.map.createLayer('map/shadow/shadow_depth_01', this.tileset, 0, 0);
		this.ground2Layer.setDepth(1);

		this.house2Layer = this.map.createLayer('map/buildings/foreground/house_depth_01/house_layer_2', this.tileset, 0, 0);
		this.house2Layer.setDepth(1);

		this.house1Layer = this.map.createLayer('map/buildings/foreground/house_depth_01/house_layer_1', this.tileset, 0, 0);
		this.house1Layer.setDepth(1);

		this.wall1Layer = this.map.createLayer('map/castle/walls/walls_depth_01', this.tileset, 0, 0);
		this.wall1Layer.setDepth(1);

		this.wall2Layer = this.map.createLayer('map/castle/walls/walls_depth_03', this.tileset, 0, 0);
		this.wall2Layer.setDepth(3);

		this.churchLayer = this.map.createLayer('map/buildings/foreground/church_depth_01/church_01', this.tileset, 0, 0);
		this.churchLayer.setDepth(1);

		this.castleLayer = this.map.createLayer('map/castle/castle/castle_depth_01', this.tileset, 0, 0);
		this.castleLayer.setDepth(1);

		this.miscLayer = this.map.createLayer('map/environment_objects/miscellaneous_depth_01', this.tileset, 0, 0);
		this.miscLayer.setDepth(1);

		this.wallTop1Layer = this.map.createLayer('map/castle/walls/wall_top_depth_01', this.tileset, 0, 0);
		this.wallTop1Layer.setDepth(1);

		this.wallTop2Layer = this.map.createLayer('map/castle/walls/wall_top_depth_04', this.tileset, 0, 0);
		this.wallTop2Layer.setDepth(4);

		this.house2RoofLayer = this.map.createLayer('map/buildings/background/house_roof_depth_03/house_roof_layer_2', this.tileset, 0, 0);
		this.house2RoofLayer.setDepth(3);

		this.houseRoofLayer = this.map.createLayer('map/buildings/background/house_roof_depth_03/house_roof_layer_1', this.tileset, 0, 0);
		this.houseRoofLayer.setDepth(3);

		this.towerTop1Layer = this.map.createLayer('map/castle/tower/tower_top_depth_01', this.tileset, 0, 0);
		this.towerTop1Layer.setDepth(1);

		this.towerTop2Layer = this.map.createLayer('map/castle/tower/tower_top_depth_04', this.tileset, 0, 0);
		this.towerTop2Layer.setDepth(4);

		this.churchRoofLayer = this.map.createLayer('map/buildings/background/church_depth_03/church_roof_03', this.tileset, 0, 0);
		this.churchRoofLayer.setDepth(1);

		this.castleRoofLayer = this.map.createLayer('map/castle/castle/castle_roof_depth_02', this.tileset, 0, 0);
		this.castleRoofLayer.setDepth(2);

		this.miscTop1Layer = this.map.createLayer('map/environment_objects/tree_01', this.tileset, 0, 0);
		this.miscTop1Layer.setDepth(1);

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
		this.diverLayer.setVisible(true)

		this.goalLayer = this.map.createLayer('map/goal/goal_depth_02', this.tileset, 0, 0);
		this.goalLayer.setDepth(2)
		this.goalLayer.setVisible(true)
	}

	private handleDpad(dir){
		console.log(dir)
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
	private trufflesAABB(truffles: SpineGameObject, collidable: SpineGameObject) {

		var collision = false;

		if (this.player.getX() - this.tileSize / 2 < collidable.x + collidable.scaleX * collidable.width &&
			this.player.getX() + this.tileSize / 2 > collidable.x &&
			this.player.getY() - this.tileSize < collidable.y + collidable.scaleY * collidable.height &&
			this.player.getY() > collidable.y) {
			collision = true;
		}

		return collision
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
		window.localStorage.setItem(LEVEL_DATA_KEY.CURRENT, LEVELS.LEVEL_02)
		this.backingMusic.stop()
		this.scene.start('ArtiFactOneScene')
		// ENDS: Change Levels

	}
}
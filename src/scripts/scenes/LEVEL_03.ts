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
	DIVER_ANIM,
	BRIDGE,
	BRIDGE_ANIMS,
	RIVER,
	NEXT_LEVEL,
	ANIMATION_DELAY,
	POINTS,
	TILE,
	ARTIFACTS,
	HUD_ANIMATIONS_TIME,
	DPAD,
	DPAD_ANIMS,
	TREE,
	APPLE_TREE,
	EXIT_DOOR
} from '../objects/gameENUMS'

// Player holds player data
import Player from '../objects/Player'
import {
	PairsFactory
} from 'matter'

// TODO Move Magic Data to KEYs
const TRUFFLES_KEY = 'truffles'
const IDLE_KEY = INPUT_TYPES.IDLE_NEUTRAL
const CANNONBALL_KEY = 'cannonball'
const WINDMILL_KEY = 'windmill'
const DPAD_KEY = 'dpad'
const KEYS = ['orange', 'lemon', 'grape']
const DIVER_KEY = 'diver'
const BRIDGE_KEY = 'bridge'
const SOUND_KEY = 'soundbtn'
const TIMER_KEY = 'hudtimer'
const RECORD_KEY = 'hudrecord'
const ARTIFACTS_KEY = ['pig', 'vase', 'pot', 'alter']
const KEYS_KEY = ['red', 'yellow', 'green', 'pink']
const TREE_KEY = 'tree'
const APPLE_KEY = 'apple'
const FISH_KEY = 'fish'
const FLOWERS_KEY = 'flowers'
const FLAGS_KEY = 'flag'



// NEED TO CREATE LEVEL_01 to LEVEL_04 for final build 
export default class LEVEL_03 extends Phaser.Scene {

	// Player Class
	private player!: Player

	// Game State Management
	private gameState!: GSM

	// Screen vinnette
	private vinnette!: Phaser.GameObjects.Image

	// HUD Background
	private hud_background!: Phaser.GameObjects.Image

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
	private frameTime!: number
	private newTick!: boolean
	private delay!: number
	private fps!: number

	// Hud Animations
	private soundMuteUnmuteButton!: SpineGameObject

	private hudTimer!: SpineGameObject
	private hudTimerAnimationNames: string[] = []

	private hudRecord!: SpineGameObject
	private hudRecordAnimationNames: string[] = []

	// Level Music
	private backingMusic!: Phaser.Sound.BaseSound

	// Church Bells
	private churchBells!: Phaser.Sound.BaseSound

	// Bridge Opening
	private bridgeOpening!: Phaser.Sound.BaseSound

	// Level Objects
	// Truffles
	private truffles!: SpineGameObject
	private trufflesAnimationNames: string[] = []

	// Cannon Balls
	private cannonball: SpineGameObject[] = []
	private cannonballAnimationNames: string[] = []
	private cannonballPosX: number[] = [269, 525, 781]
	private cannonballPosY: number[] = [60, 60, 60]
	private cannonballSpeed = 2
	private cannonballMoving: boolean[] = [true, true, true]

	// Fruit
	private fruitAnimationNames: string[] = []
	private fruitMarked: boolean[] = []
	private fruitRemaining: number

	// Artifacts
	private artifact: SpineGameObject[] = []

	// Windmill
	private windmill!: SpineGameObject

	// Keys
	private key: SpineGameObject[] = []

	// Tree
	private tree: SpineGameObject[] = []

	// Appple Tree
	private apple: SpineGameObject[] = []

	// Fish
	private fish: SpineGameObject[] = []

	// Flowers 
	private flowers: SpineGameObject[] = []

	// FLAGS
	private flags: SpineGameObject[] = []

	// Input Cursors
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	// Input D-Pad
	private dpad!: SpineGameObject
	private dpad_up: boolean = false
	private dpad_down: boolean = false
	private dpad_left: boolean = false
	private dpad_right: boolean = false

	// Input WASD
	private key_w!: Phaser.Input.Keyboard.Key
	private key_a!: Phaser.Input.Keyboard.Key
	private key_s!: Phaser.Input.Keyboard.Key
	private key_d!: Phaser.Input.Keyboard.Key

	private fruit: SpineGameObject[] = []

	// Diver
	private divers: SpineGameObject[] = []
	private diverAnimationNames: string[] = []
	private diverMove: number[] = []

	// Bridge
	private bridgeOpen!: boolean
	private bridge!: SpineGameObject

	// Tile Size
	private tileSize: number = TILE.SIZE

	// TileMap Data
	private map!: Phaser.Tilemaps.Tilemap
	private tile!: Phaser.Tilemaps.Tile

	private tileset!: Phaser.Tilemaps.Tileset

	private waterLayer!: Phaser.Tilemaps.TilemapLayer
	private groundLayer!: Phaser.Tilemaps.TilemapLayer
	private ground2Layer!: Phaser.Tilemaps.TilemapLayer
	private house2Layer!: Phaser.Tilemaps.TilemapLayer
	private house1Layer!: Phaser.Tilemaps.TilemapLayer
	private castleWallTopOfMap!: Phaser.Tilemaps.TilemapLayer
	private castleWallBottomOfMap!: Phaser.Tilemaps.TilemapLayer
	private churchLayer!: Phaser.Tilemaps.TilemapLayer
	private castleLayer!: Phaser.Tilemaps.TilemapLayer
	private miscLayer!: Phaser.Tilemaps.TilemapLayer
	private wallTop1Layer!: Phaser.Tilemaps.TilemapLayer
	private wallTop2Layer!: Phaser.Tilemaps.TilemapLayer
	private doorExitCannonBallLayer!: Phaser.Tilemaps.TilemapLayer
	private house2RoofLayer!: Phaser.Tilemaps.TilemapLayer
	private houseRoofLayer!: Phaser.Tilemaps.TilemapLayer
	private towerTop1Layer!: Phaser.Tilemaps.TilemapLayer
	private towerTop2Layer!: Phaser.Tilemaps.TilemapLayer
	private churchRoofLayer!: Phaser.Tilemaps.TilemapLayer
	private castleRoofLayer!: Phaser.Tilemaps.TilemapLayer
	private animatedTrees!: Phaser.Tilemaps.TilemapLayer
	private miscTop2Layer!: Phaser.Tilemaps.TilemapLayer
	private collisionLayer!: Phaser.Tilemaps.TilemapLayer
	private candyLayer!: Phaser.Tilemaps.TilemapLayer
	private goalLayer!: Phaser.Tilemaps.TilemapLayer
	private diverLayer!: Phaser.Tilemaps.TilemapLayer
	private bridgeLayer!: Phaser.Tilemaps.TilemapLayer
	private riverLayer!: Phaser.Tilemaps.TilemapLayer
	private keyLayer!: Phaser.Tilemaps.TilemapLayer
	private fishLayer!: Phaser.Tilemaps.TilemapLayer
	private flowersLayer!: Phaser.Tilemaps.TilemapLayer
	private flagTopLayer!: Phaser.Tilemaps.TilemapLayer
	private flagLowLayer!: Phaser.Tilemaps.TilemapLayer
	private animatedAppleTrees!: Phaser.Tilemaps.TilemapLayer

	// Player Data
	private playerState!: PlayerState

	// Scene Constuctor
	constructor() {
		super({
			key: LEVELS.LEVEL_03
		})
		// Heads up Display Data
		this.collectablePoints = 0
		this.levelScore = 0
		this.newRecordTime = 0
		this.screenX = 0
		this.screenY = 0
		this.startTime = 0
		this.frameTime = 0
		this.newTick = false
		this.fps = 60
		this.delay = 1000 / this.fps
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
		this.load.spine(DPAD_KEY, 'dpad/DPad_Final_merge.json', 'dpad/DPad_Final_merge.atlas')
		this.load.spine(SOUND_KEY, 'sound/sound.json', 'sound/sound.atlas')
		this.load.spine(TIMER_KEY, 'timer/timer.json', 'timer/timer.atlas')
		this.load.spine(BRIDGE_KEY, 'drawbridge/drawbridge.json', 'drawbridge/drawbridge.atlas')
		this.load.spine(RECORD_KEY, 'record/record.json', 'record/record.atlas')
		this.load.spine(ARTIFACTS_KEY[0], 'collectibles_ui/pig/pig.json', 'collectibles_ui/pig/pig.atlas')
		this.load.spine(ARTIFACTS_KEY[1], 'collectibles_ui/vase/vase.json', 'collectibles_ui/vase/vase.atlas')
		this.load.spine(ARTIFACTS_KEY[2], 'collectibles_ui/pot/pot.json', 'collectibles_ui/pot/pot.atlas')
		this.load.spine(ARTIFACTS_KEY[3], 'collectibles_ui/alter/alter.json', 'collectibles_ui/alter/alter.atlas')
		this.load.spine(KEYS_KEY[0], 'keys/red/red_key.json', 'keys/red/red_key.atlas')
		this.load.spine(KEYS_KEY[1], 'keys/yellow/yellow_key.json', 'keys/yellow/yellow_key.atlas')
		this.load.spine(KEYS_KEY[2], 'keys/green/green_key.json', 'keys/green/green_key.atlas')
		this.load.spine(KEYS_KEY[3], 'keys/pink/pink_key.json', 'keys/pink/pink_key.atlas')
		this.load.spine(TREE_KEY, 'tree/tree.json', 'tree/tree.atlas')
		this.load.spine(DPAD_KEY, 'dpad/DPad_Final_merge.json', 'dpad/DPad_Final_merge.atlas')
		this.load.spine(APPLE_KEY, 'appletree/tree2.json', 'appletree/tree2.atlas')
		this.load.spine(FISH_KEY, 'fish/fish.json', 'fish/fish.atlas')
		this.load.spine(FLOWERS_KEY, 'flowers/flowers.json', 'flowers/flowers.atlas')
		this.load.spine(FLAGS_KEY, 'flag/flag.json', 'flag/flag.atlas')
	}

	create(time: number, delta: number): void {
		// Setup Screen Dimensions
		let {
			width,
			height
		} = this.sys.game.canvas;
		this.screenX = width
		this.screenY = height

		// Screen Vinnette
		this.vinnette = this.add.image(width / 2, height / 2, 'vinnette')
		this.vinnette.setDisplaySize(width, height);
		this.vinnette.setOrigin(0.5, 0.5)
		this.vinnette.setDepth(20)

		// Hud Background
		this.hud_background = this.add.image(width / 2, height * 0.04, 'hud_background')
		this.hud_background.setOrigin(0.5, 0.5)
		this.hud_background.setDepth(19)

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

		// Setup HUD
		// Score
		this.currentScoreText = new HudText(this)
		this.currentScoreText.setShadow(3, 3)
		this.currentScoreText.setStroke('#fff', 12);
		this.currentScoreText.setShadow(2, 2, "#333333", 2, true, true);
		this.currentScoreText.setDepth(21)
		// Elapsed Time
		this.elapsedTimeText = new HudText(this)
		this.elapsedTimeText.setShadow(3, 3)
		this.elapsedTimeText.setStroke('#fff', 12);
		this.elapsedTimeText.setShadow(2, 2, "#333333", 2, true, true);
		this.elapsedTimeText.setDepth(21)
		// Record Time
		this.recordTimeText = new HudText(this)
		this.recordTimeText.setShadow(3, 3)
		this.recordTimeText.setStroke('#fff', 12);
		this.recordTimeText.setShadow(2, 2, "#333333", 2, true, true);
		this.recordTimeText.setDepth(21)

		// Hud Timer
		this.hudTimer = this.createSpineObject(IDLE_KEY, TIMER_KEY, this.screenX * 0.67, this.screenY * 0.001, 1, 1)
		this.hudTimer.setDepth(21)
		this.hudTimer.setScale(0.75, 0.75)
		this.hudTimerAnimationNames = this.hudTimer.getAnimationList()
		this.hudTimer.play(this.hudTimerAnimationNames[1], true) // Run Timer

		// Hud Record
		this.hudRecord = this.createSpineObject(IDLE_KEY, RECORD_KEY, this.screenX * 0.46, this.screenY * 0.001, 1, 1)
		this.hudRecord.setDepth(21)
		this.hudRecord.setScale(0.75, 0.74)
		this.hudRecordAnimationNames = this.hudRecord.getAnimationList()

		// Update Score Frequency
		this.time.addEvent({
			delay: 500,
			loop: true,
			callback: this.fetchRecordedScore,
			callbackScope: this
		});

		//Setup Map Data
		this.setupMap()
		let tilesWide = this.map.width
		let tilesHigh = this.map.height

		// Background Music
		this.backingMusic = this.sound.add('level_backing_track', {
			loop: true
		})
		this.backingMusic.play()

		// Play Church Bells
		this.churchBells = this.sound.add('church_bells', {
			volume: 0.5
		})

		this.time.addEvent({
			delay: 6000,
			loop: true,
			callback: this.playChurchBells,
			callbackScope: this
		});

		// Bridge Opening Sound
		this.bridgeOpening = this.sound.add('bridge_open')

		// Setup Truffles
		this.truffles = this.createSpineObject(IDLE_KEY, TRUFFLES_KEY,
			this.player.getX(), this.player.getY(), this.player.getScale(), this.player.getScale())
		this.truffles.setDepth(0)
		this.initializeAnimationsState(this.truffles, this.trufflesAnimationNames)

		// Setup Divers
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				let tile = this.diverLayer.getTileAt(j, i)
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
			this.cannonball[i].setDepth(-21)
		}

		// setup drawbridge
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				let tile = this.bridgeLayer.getTileAt(j, i)
				if (tile != null) {
					if (tile.index == BRIDGE.PLACE) {
						this.bridge = this.createSpineObject(IDLE_KEY, BRIDGE_KEY, j * this.tileSize + BRIDGE.OFFSETX,
							i * this.tileSize + BRIDGE.OFFSETY, BRIDGE.scaleX, BRIDGE.scaleY)
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

		//Multitouch: the below sets the amount of concurrent touches can happen
		if (this.game.device.input.touch) {
			this.input.addPointer(2);
			this.dpad = this.createSpineObject(IDLE_KEY, DPAD_KEY, this.tileSize * DPAD.X_TILES,
				this.tileSize * DPAD.Y_TILES, DPAD.SCALE, DPAD.SCALE)
			this.dpad.setDepth(21)
		}

		// Setup Fruits
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				let tile = this.candyLayer.getTileAt(j, i)
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

		// Begin Artifact Animations
		this.artifact[0] = this.createSpineObject(IDLE_KEY, ARTIFACTS_KEY[0], this.screenX * 0.114, this.screenY * 0.045, 0.6, 0.6)
		this.artifact[1] = this.createSpineObject(IDLE_KEY, ARTIFACTS_KEY[1], this.screenX * 0.185, this.screenY * 0.03, 0.6, 0.6)
		this.artifact[2] = this.createSpineObject(IDLE_KEY, ARTIFACTS_KEY[2], this.screenX * 0.24, this.screenY * 0.04, 0.6, 0.6)
		this.artifact[3] = this.createSpineObject(IDLE_KEY, ARTIFACTS_KEY[3], this.screenX * 0.295, this.screenY * 0.05, 0.6, 0.6)

		this.artifact[0].setDepth(21)
		this.artifact[1].setDepth(21)
		this.artifact[2].setDepth(21)
		this.artifact[3].setDepth(21)

		// Init fruit animations
		for (let o = 0; o < this.fruit.length; o++) {
			this.initializeAnimationsState(this.fruit[o], this.fruitAnimationNames)
		}

		// Play Artifact Animations
		let level = this.sys.settings.key // Gets the name of the current scene

		// Key Animations Init
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				let tile = this.keyLayer.getTileAt(j, i)
				if (tile != null) {
					if (tile.index === 395) {
						if (level === LEVELS.LEVEL_01) {
							this.key[0] = this.createSpineObject(IDLE_KEY, KEYS_KEY[0], j * this.tileSize - 80, i * this.tileSize - 60, 0.8, 0.8)
							this.key[0].setDepth(10)
						} else if (level === LEVELS.LEVEL_02) {
							this.key[1] = this.createSpineObject(IDLE_KEY, KEYS_KEY[1], j * this.tileSize - 80, i * this.tileSize - 60, 0.8, 0.8)
							this.key[1].setDepth(10)
						} else if (level === LEVELS.LEVEL_03) {
							this.key[2] = this.createSpineObject(IDLE_KEY, KEYS_KEY[2], j * this.tileSize - 80, i * this.tileSize - 60, 0.8, 0.8)
							this.key[2].setDepth(10)
						} else if (level === LEVELS.LEVEL_04) {
							this.key[3] = this.createSpineObject(IDLE_KEY, KEYS_KEY[3], j * this.tileSize - 80, i * this.tileSize - 60, 0.8, 0.8)
							this.key[3].setDepth(10)
						} else if (level === LEVELS.CREDITS) {
							// No Artifact Animations
						}
					}
				}
			}
		}

		// Setup Trees
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				let tile = this.animatedTrees.getTileAt(j, i)
				if (tile != null) {
					if (tile.index === TREE.TILE) {
						this.tree.push(this.createSpineObject(IDLE_KEY, TREE_KEY, j * this.tileSize - 33, i * this.tileSize - 84, 0.5, 0.5))
					}
				}
			}
		}
		// Setup Tree's Depth
		for (let i = 0; i < this.tree.length; i++) {
			this.tree[i].setDepth(-1)
			this.tree[i].play('idle', true)
		}

		// Setup Apple Trees
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				let tile = this.animatedAppleTrees.getTileAt(j, i)
				if (tile != null) {
					if (tile.index === APPLE_TREE.TILE) {
						this.apple.push(this.createSpineObject(IDLE_KEY, APPLE_KEY, j * this.tileSize - 61, i * this.tileSize - 84, 0.5, 0.5))
					}
				}
			}
		}
		// Setup Apple Tree's Depth
		for (let i = 0; i < this.apple.length; i++) {
			this.apple[i].setDepth(-18)
			this.apple[i].play('idle', true)
		}

		// Animate Trees
		this.time.addEvent({
			delay: 6000,
			loop: true,
			callback: this.treeAnimations,
			callbackScope: this
		});

		// Setup Fish
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				let tile = this.fishLayer.getTileAt(j, i)
				if (tile != null) {
					if (tile.index === 657) {
						this.fish.push(this.createSpineObject(IDLE_KEY, FISH_KEY, j * this.tileSize, i * this.tileSize - 40, 1, 1))
					}
				}
			}
		}
		// Setup Fish's Depth
		for (let i = 0; i < this.fish.length; i++) {
			this.fish[i].setDepth(19)
		}

		// Setup Flowers
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				let tile = this.flowersLayer.getTileAt(j, i)
				if (tile != null) {
					if (tile.index === 604) {
						this.flowers.push(this.createSpineObject(IDLE_KEY, FLOWERS_KEY, j * this.tileSize - 10, i * this.tileSize - 15, 1, 1))
					}
				}
			}
		}

		// Setup Flowers Depth
		for (let i = 0; i < this.flowers.length; i++) {
			this.flowers[i].setDepth(-1)
		}

		// Setup Flag TOP
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				let tile = this.flagTopLayer.getTileAt(j, i)
				if (tile != null) {
					if (tile.index === 447) {
						this.flags.push(this.createSpineObject(IDLE_KEY, FLAGS_KEY, j * this.tileSize + 4, i * this.tileSize + 2, 1, 1))

					}
				}
			}
		}
		// Setup Flag LOW
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				let tile = this.flagLowLayer.getTileAt(j, i)
				if (tile != null) {
					if (tile.index === 447) {
						this.flags.push(this.createSpineObject(IDLE_KEY, FLAGS_KEY, j * this.tileSize, i * this.tileSize, 1, 1))

					}
				}
			}
		}
		//Setup Flags Depth
		for (let i = 0; i < this.flags.length; i++) {
			this.flags[i].setDepth(-9)
		}

		// Mute button
		this.soundMuteUnmuteButton = this.createSpineObject(IDLE_KEY, SOUND_KEY, this.screenX * 0.022, this.screenY * 0.014, 1, 1)
		this.soundMuteUnmuteButton.setScale(0.8, 0.8)
		this.soundMuteUnmuteButton.setDepth(21)
		this.soundMuteUnmuteButton.setInteractive()

		let soundStates = this.soundMuteUnmuteButton.getAnimationList()
		let soundState = true

		if (window.localStorage.getItem('soundState') === "false") {
			this.game.sound.mute = true
			this.soundMuteUnmuteButton.play(soundStates[1], true)
		}

		this.soundMuteUnmuteButton.on('pointerdown', () => {
			if (soundState == true) {
				soundState = false
				this.soundMuteUnmuteButton.play(soundStates[1], true)
				window.localStorage.setItem('soundState', soundState.toString())
				this.game.sound.mute = true
				return
			}
			if (soundState == false) {
				soundState = true
				this.game.sound.mute = false
				this.soundMuteUnmuteButton.play(soundStates[0], true)
				window.localStorage.setItem('soundState', soundState.toString())
				return
			}
		})

		// Initialise Player State
		this.playerState = new PlayerState(this, this.truffles, 0, 0)
		this.playerState.getState()?.enter(0, 0, this.player) // Activate Idle
		this.player.setState(this.playerState)

		if (level === LEVELS.LEVEL_01) {
			//Play no Collectables
		} else if (level === LEVELS.LEVEL_02) {
			//Play the one already collected animations
			this.artifact[0].play('pig_filled', false)
		} else if (level === LEVELS.LEVEL_03) {
			//Play the two already collected animations
			this.artifact[0].play('pig_filled', false)
			this.artifact[1].play('vase_filled', false)
		} else if (level === LEVELS.LEVEL_04) {
			//Play the three already collected animations
			this.artifact[0].play('pig_filled', true)
			this.artifact[1].play('vase_filled', true)
			this.artifact[2].play('pot_filled', false)
		} else if (level === LEVELS.CREDITS) {
			// No Artifact Animations
		}
	}

	// Game Update Method
	update(time: number, delta: number): void {

		// Start time
		if (this.startTime === 0) {
			this.startTime = time
		}

		this.frameTime += delta

		if (this.frameTime > this.delay) {
			this.frameTime = 0
			this.newTick = true
		}

		// TODO: BETTER Game State Management

		if (this.gameState === GSM.PLAY) {
			this.elapsedLevelTime = time - this.startTime
		} else if (this.gameState === GSM.LEVEL_COMPLETE) {

			this.hudTimer.play(this.hudTimerAnimationNames[1], true) // Stop the stopwatch

			//Store Record Time
			if (Math.round((this.elapsedLevelTime * 0.001)) <= this.bestRecordedTime) {
				this.setRecord(Math.round((this.elapsedLevelTime * 0.001)))
				this.hudRecord.play(this.hudRecordAnimationNames[2], true) // No Record Set
			} else {
				this.newRecordTime = this.bestRecordedTime
				this.hudRecord.play(this.hudRecordAnimationNames[1], true) // No Record Set
			}

			this.time.addEvent({
				delay: NEXT_LEVEL.DELAY,
				loop: true,
				callback: this.levelComplete,
				callbackScope: this
			});
		}

		if (this.game.device.input.touch) {
			this.handleDPad(time, delta)
		}

		// Handles input
		if (Phaser.Input.Keyboard.JustDown(this.cursors.right!) || Phaser.Input.Keyboard.JustDown(this.key_d!)) {
			this.player.getState().handleInput(INPUT_TYPES.WALK_RIGHT, time, delta, this.player)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.left!) || Phaser.Input.Keyboard.JustDown(this.key_a!)) {
			this.player.getState().handleInput(INPUT_TYPES.WALK_LEFT, time, delta, this.player)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.up!) || Phaser.Input.Keyboard.JustDown(this.key_w!)) {
			this.player.getState().handleInput(INPUT_TYPES.WALK_UP, time, delta, this.player)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.down!) || Phaser.Input.Keyboard.JustDown(this.key_s!)) {
			this.player.getState().handleInput(INPUT_TYPES.WALK_DOWN, time, delta, this.player)
		}

		// Can player move
		if (this.player.getMove()) {
			if (this.cursors.right.isDown || this.key_d.isDown || this.dpad_right) {
				let x = this.map.worldToTileX(this.player.getX() - this.tileSize / 2)
				let y = this.map.worldToTileY(this.player.getY())

				this.tile = this.collisionLayer.getTileAt(x + 1, y)

				if (this.tile == null) {
					this.player.moveRight()
					this.truffles.setPosition(this.player.getX(), this.player.getY())
				}
			}

			if (this.cursors.left.isDown || this.key_a.isDown || this.dpad_left) {
				let x = this.map.worldToTileX(this.player.getX() + this.tileSize / 2)
				let y = this.map.worldToTileY(this.player.getY())

				this.tile = this.collisionLayer.getTileAt(x - 1, y)

				if (this.tile == null) {
					this.player.moveLeft()
					this.truffles.setPosition(this.player.getX(), this.player.getY())
				}
			}

			if (this.cursors.up.isDown || this.key_w.isDown || this.dpad_up) {
				let x = this.map.worldToTileX(this.player.getX())
				let y = this.map.worldToTileY(this.player.getY() + this.tileSize / 4)

				this.tile = this.collisionLayer.getTileAt(x, y - 1)

				if (this.tile == null) {
					this.player.moveUp()
					this.truffles.setPosition(this.player.getX(), this.player.getY())
				}
			}

			if (this.cursors.down.isDown || this.key_s.isDown || this.dpad_down) {

				let x = this.map.worldToTileX(this.player.getX())
				let y = this.map.worldToTileY(this.player.getY() + this.player.getVelocityY().y)

				this.tile = this.collisionLayer.getTileAt(x, y)

				if (this.tile == null) {
					this.player.moveDown()
					this.truffles.setPosition(this.player.getX(), this.player.getY())
				}
			}

			// Check players position
			let x = this.map.worldToTileX(this.player.getX())
			let y = this.map.worldToTileY(this.player.getY())

			// Check is Goal Reached
			this.tile = this.goalLayer.getTileAt(x, y)

			if (this.tile !== null) {
				if (this.tile.index === GOAL.TILE) {
					// Reached Goal
					this.player.getState().handleInput(INPUT_TYPES.REACHED_GOAL, time, delta, this.player)
					this.addPoints(POINTS.REACHED_GOAL)
					this.gsmUpdate(time, delta)
				}
			}

			// Check if River Splash
			this.tile = this.riverLayer.getTileAt(x, y)

			if (this.tile !== null) {
				if (this.tile.index === RIVER.TILE) {
					// Reached River
					this.player.getState().handleInput(INPUT_TYPES.SPLASH, time, delta, this.player)
				}
			}

			if (!this.cursors.down.isDown && !this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown &&
				!this.key_w.isDown && !this.key_a.isDown && !this.key_s.isDown && !this.key_d.isDown &&
				!this.dpad_up && !this.dpad_down && !this.dpad_left && !this.dpad_right) {
				this.player.getState().handleInput(INPUT_TYPES.IDLE_NEUTRAL, time, delta, this.player)
			} else if (this.newTick) {
				for (let i = 0; i < this.fruit.length; i++) {

					if (!this.fruitMarked[i] && this.trufflesAABB(this.fruit[i])) {
						this.changeAnimation(this.fruit[i], this.fruitAnimationNames, 1)
						this.time.addEvent({
							delay: ANIMATION_DELAY.FRUIT,
							callback: this.fruitAnimations,
							callbackScope: this,
							args: [i, time, delta]
						})
						this.fruitMarked[i] = true
						if (i === 0) {
							this.addPoints(POINTS.FRUIT_0)
						} else if (i == 1) {
							this.addPoints(POINTS.FRUIT_1)
						} else if (i === 2) {
							this.addPoints(POINTS.FRUIT_2)
						}
						this.player.getState().handleInput(INPUT_TYPES.EATING, time, delta, this.player)
					}
				}
			}
		}

		// Check Bridge
		if (this.fruitRemaining <= 0 && !this.bridgeOpen) {
			this.bridge.play(BRIDGE_ANIMS.TRANSITIONING, false)
			this.bridgeOpen = true
			this.bridgeOpening.play()
			for (let i = 0; i < this.map.height; i++) {
				for (let j = 0; j < this.map.width; j++) {
					let tile = this.bridgeLayer.getTileAt(j, i)
					if (tile != null) {
						this.riverLayer.removeTileAt(j, i)
					}
				}
			}
		}

		if (this.newTick) {

			// Cannonball collisions
			for (let i = 0; i < this.cannonball.length; i++) {
				if (this.trufflesAABB(this.cannonball[i])) {
					this.player.getState().handleInput(INPUT_TYPES.EXPIRED, time, delta, this.player)
					this.addPoints(POINTS.CANNON_BALL_COLLISION)
				}
			}

			for (let i = 0; i < this.divers.length; i++) {
				this.divers[i].y += this.diverMove[i]
				let x = this.map.worldToTileX(this.divers[i].x)
				let y = this.map.worldToTileY(this.divers[i].y)

				this.tile = this.diverLayer.getTileAt(x, y)

				if (this.tile.index == DIVER.START) {
					this.diverMove[i] = DIVER.SPEED
					this.divers[i].play(DIVER_ANIM.WALK_DOWN, true)
				} else if (this.tile.index == DIVER.END) {
					this.diverMove[i] = -DIVER.SPEED
					this.divers[i].play(DIVER_ANIM.WALK_UP, true)
				}

				// Diver Collision
				if (this.trufflesDiverCollision(this.divers[i], i)) {
					this.player.getState().handleInput(INPUT_TYPES.EXPIRED, time, delta, this.player)
					this.addPoints(POINTS.DIVER_COLLISION)
				}
				for (let j = 0; j < this.fruit.length; j++) {
					this.sortLayers(this.divers[i], this.fruit[j])
					for (let k = 0; k < this.cannonball.length; k++) {
						this.sortLayers(this.cannonball[k], this.fruit[j])
					}
				}
				for (let j = 0; j < this.cannonball.length; j++) {
					this.sortLayers(this.divers[i], this.cannonball[j])
				}

				// Cannon Ball Movement
				this.cannonballMove()
			}

			// Handle Push
			let x = this.map.worldToTileX(this.player.getX())
			let y = this.map.worldToTileY(this.player.getY() - this.player.getVelocityY().y)

			this.tile = this.collisionLayer.getTileAt(x, y)
			if (this.tile == null) {
				this.player.push()
				this.truffles.setPosition(this.player.getX(), this.player.getY())
			}
		}

		// Updates the Player State See PlayerStateMachine
		this.player.getState().getState()?.update(time, delta, this.player)

		// Display Updated HUD
		this.currentScoreText.setPosition(this.screenX * 0.90, this.screenY * 0.048)
		this.currentScoreText.update()
		this.currentScoreText.setText(' ' + this.levelScore + ' ')
		this.currentScoreText.setDepth(21)
		this.currentScoreText.setFontSize(40)

		this.elapsedTimeText.setPosition(this.screenX * 0.76, this.screenY * 0.048)
		this.elapsedTimeText.update()
		this.elapsedTimeText.setText(' ' + Math.round((this.elapsedLevelTime * 0.001)) + ' ')
		this.elapsedTimeText.setDepth(21)
		this.elapsedTimeText.setFontSize(40)

		this.recordTimeText.setPosition(this.screenX * 0.55, this.screenY * 0.048)
		this.recordTimeText.update()
		if (this.bestRecordedTime < HUD_ANIMATIONS_TIME.TIME) {
			this.recordTimeText.setText(' ' + this.bestRecordedTime + ' ')
		} else {
			this.recordTimeText.setText(' ' + '--:--' + ' ')
		}
		this.recordTimeText.setDepth(21)
		this.recordTimeText.setFontSize(40)

		this.newTick = false
	}

	//Setup Map Data
	private setupMap(): void {

		this.map = this.make.tilemap({
			key: 'level',
			tileWidth: this.tileSize,
			tileHeight: this.tileSize
		});
		this.tileset = this.map.addTilesetImage("truffles_level_1_tileset", 'tileset');

		this.waterLayer = this.map.createLayer('map/water/water_depth_00', this.tileset, 0, 0);
		this.waterLayer.setDepth(-21); //SET DEPTH 00 TO -10

		this.groundLayer = this.map.createLayer('map/ground/ground_depth_00', this.tileset, 0, 0);
		this.groundLayer.setDepth(-20); //SET DEPTH 00 TO -10
		//this.groundLayer.setVisible(false) // TODO  Special Game of Thrones Level

		this.ground2Layer = this.map.createLayer('map/shadow/shadow_depth_01', this.tileset, 0, 0);
		this.ground2Layer.setDepth(-19); //SET DEPTH 1 TO -9
		//this.groundLayer.setVisible(false) // TODO  Special Game of Thrones Level

		this.house2Layer = this.map.createLayer('map/buildings/foreground/house_depth_01/house_layer_2', this.tileset, 0, 0);
		this.house2Layer.setDepth(-19); //SET DEPTH 1 TO -9

		this.house1Layer = this.map.createLayer('map/buildings/foreground/house_depth_01/house_layer_1', this.tileset, 0, 0);
		this.house1Layer.setDepth(-19); //SET DEPTH 1 TO -9

		this.castleWallTopOfMap = this.map.createLayer('map/castle/walls/walls_depth_01', this.tileset, 0, 0);
		this.castleWallTopOfMap.setDepth(-19); //SET DEPTH 1 TO -9
		this.castleWallTopOfMap.setVisible(true)

		this.castleWallBottomOfMap = this.map.createLayer('map/castle/walls/walls_depth_03', this.tileset, 0, 0);
		this.castleWallBottomOfMap.setDepth(8);
		this.castleWallBottomOfMap.setVisible(true)

		this.churchLayer = this.map.createLayer('map/buildings/foreground/church_depth_01/church_01', this.tileset, 0, 0);
		this.churchLayer.setDepth(-9); //SET DEPTH 1 TO -9

		this.castleLayer = this.map.createLayer('map/castle/castle/castle_depth_01', this.tileset, 0, 0);
		this.castleLayer.setDepth(-9); //SET DEPTH 1 TO -9
		this.castleLayer.setVisible(true)

		this.miscLayer = this.map.createLayer('map/environment_objects/miscellaneous_depth_01', this.tileset, 0, 0);
		this.miscLayer.setDepth(-9); //SET DEPTH 1 TO -9

		this.wallTop1Layer = this.map.createLayer('map/castle/walls/wall_top_depth_01', this.tileset, 0, 0);
		this.wallTop1Layer.setDepth(-9); //SET DEPTH 1 TO -9

		this.wallTop2Layer = this.map.createLayer('map/castle/walls/wall_top_depth_04', this.tileset, 0, 0);
		this.wallTop2Layer.setDepth(9);

		this.house2RoofLayer = this.map.createLayer('map/buildings/background/house_roof_depth_03/house_roof_layer_2', this.tileset, 0, 0);
		this.house2RoofLayer.setDepth(8);

		this.houseRoofLayer = this.map.createLayer('map/buildings/background/house_roof_depth_03/house_roof_layer_1', this.tileset, 0, 0);
		this.houseRoofLayer.setDepth(8);

		this.towerTop1Layer = this.map.createLayer('map/castle/tower/tower_top_depth_01', this.tileset, 0, 0);
		this.towerTop1Layer.setDepth(-9); //SET DEPTH 1 TO -9

		this.towerTop2Layer = this.map.createLayer('map/castle/tower/tower_top_depth_04', this.tileset, 0, 0);
		this.towerTop2Layer.setDepth(9);

		this.churchRoofLayer = this.map.createLayer('map/buildings/background/church_depth_03/church_roof_03', this.tileset, 0, 0);
		this.churchRoofLayer.setDepth(-9); //SET DEPTH 1 TO -9

		this.castleRoofLayer = this.map.createLayer('map/castle/castle/castle_roof_depth_02', this.tileset, 0, 0);
		this.castleRoofLayer.setDepth(7);
		this.castleRoofLayer.setVisible(false)

		this.animatedTrees = this.map.createLayer('map/environment_objects/animated/tree_01', this.tileset, 0, 0);
		this.animatedTrees.setDepth(-9); //SET DEPTH 1 TO -9
		this.animatedTrees.setVisible(false)

		this.miscTop2Layer = this.map.createLayer('map/environment_objects/tree_top_04', this.tileset, 0, 0);
		this.miscTop2Layer.setDepth(9);
		this.miscTop2Layer.setVisible(false)

		this.collisionLayer = this.map.createLayer('map/environment_collision/collide_depth_02', this.tileset, 0, 0);
		this.collisionLayer.setDepth(7)
		this.collisionLayer.setVisible(false)

		this.keyLayer = this.map.createLayer('map/environment_objects/animated/key', this.tileset, 0, 0);
		this.keyLayer.setDepth(9)
		this.keyLayer.setVisible(false)

		this.fishLayer = this.map.createLayer('map/environment_objects/animated/fish_01', this.tileset, 0, 0);
		this.fishLayer.setVisible(false)

		this.flowersLayer = this.map.createLayer('map/environment_objects/animated/flower_01', this.tileset, 0, 0);
		this.flowersLayer.setDepth(-9)
		this.flowersLayer.setVisible(false)

		this.flagTopLayer = this.map.createLayer('map/environment_objects/animated/flag_top_01', this.tileset, 0, 0);
		this.flagTopLayer.setVisible(false)

		this.flagLowLayer = this.map.createLayer('map/environment_objects/animated/flag_low_03', this.tileset, 0, 0);
		this.flagLowLayer.setVisible(false)

		this.animatedAppleTrees = this.map.createLayer('map/environment_objects/animated/tree_apple_01', this.tileset, 0, 0);
		this.animatedAppleTrees.setVisible(false)

		this.bridgeLayer = this.map.createLayer('map/environment_objects/animated/drawbridge_01', this.tileset, 0, 0);
		this.bridgeLayer.setVisible(false)

		this.riverLayer = this.map.createLayer('map/water/river_00', this.tileset, 0, 0);
		this.riverLayer.setVisible(false)

		this.doorExitCannonBallLayer = this.map.createLayer('map/castle/walls/walls_doors_depth_03', this.tileset, 0, 0);
		this.doorExitCannonBallLayer.setVisible(false)

		// Check the levels to load
		let current_level = this.sys.settings.key

		if (current_level === LEVELS.LEVEL_01) {
			this.candyLayer = this.map.createLayer('map/collectables/candies_level1_depth_02', this.tileset, 0, 0);
			this.diverLayer = this.map.createLayer('map/patrol/level1', this.tileset, 0, 0);

		} else if (current_level === LEVELS.LEVEL_02) {
			this.candyLayer = this.map.createLayer('map/collectables/candies_level2_depth_02', this.tileset, 0, 0);
			this.diverLayer = this.map.createLayer('map/patrol/level2', this.tileset, 0, 0);
		} else if (current_level === LEVELS.LEVEL_03) {
			this.candyLayer = this.map.createLayer('map/collectables/candies_level3_depth_02', this.tileset, 0, 0);
			this.diverLayer = this.map.createLayer('map/patrol/level3', this.tileset, 0, 0);
		} else if (current_level === LEVELS.LEVEL_04) {
			this.candyLayer = this.map.createLayer('map/collectables/candies_level4_depth_02', this.tileset, 0, 0);
			this.diverLayer = this.map.createLayer('map/patrol/level4', this.tileset, 0, 0);
		} else {
			this.candyLayer = this.map.createLayer('map/collectables/candies_level1_depth_02', this.tileset, 0, 0);
			this.diverLayer = this.map.createLayer('map/patrol/level1', this.tileset, 0, 0);
		}

		this.candyLayer.setDepth(7);
		this.candyLayer.setVisible(false)

		this.diverLayer.setDepth(7)
		this.diverLayer.setVisible(false)

		this.goalLayer = this.map.createLayer('map/goal/goal_depth_02', this.tileset, 0, 0);
		this.goalLayer.setDepth(7)
		this.goalLayer.setVisible(true)
	}

	// Create Spine Objects
	private createSpineObject(startAnim: string, key: string, x: number, y: number, scaleX: number, scaleY: number): SpineGameObject {
		let object = this.add.spine(x, y, key, startAnim, true)
		object.scaleX = scaleX
		object.scaleY = scaleY
		return object
	}

	// Init Animations
	private initializeAnimationsState(spine: SpineGameObject, animationNames: string[]): void {
		let animations = spine.getAnimationList()
		for (let i = 0; i < animations.length; i++) {
			animationNames.push(animations[i])
		}
	}

	// Change Animations
	private changeAnimation(spine: SpineGameObject, animationNames: string[], index: number): void {
		let animation = animationNames[index]
		spine.play(animation, true)
	}

	//Truffles to Object Collision
	private trufflesAABB(collidable: SpineGameObject): boolean {

		let collision = false;

		if (this.player.getX() - this.tileSize / 2 < collidable.x + collidable.scaleX * collidable.width &&
			this.player.getX() + this.tileSize / 2 > collidable.x &&
			this.player.getY() - this.tileSize < collidable.y + collidable.scaleY * collidable.height &&
			this.player.getY() > collidable.y) {
			collision = true;
		}
		if (collidable.y > this.player.getY()) {
			collidable.setDepth(1)
		} else {
			collidable.setDepth(-1)
		}

		return collision
	}

	private sortLayers(object1: SpineGameObject, object2: SpineGameObject): void {
		if (Math.abs(object1.x - object2.x) < object1.scaleX * object1.width &&
			Math.abs(object1.y - object2.y) < object1.scaleY * object1.height) {
			if (object1.y < object2.y + object2.height * object2.scaleY) {
				object2.setDepth(object1.depth + 1)
			} else {
				object2.setDepth(object1.depth - 1)
			}
		}
	}

	// Truffles Enemy Collisions
	private trufflesDiverCollision(diver: SpineGameObject, index: number): boolean {

		let collision = false;

		if ((this.map.worldToTileX(this.player.getX()) == this.map.worldToTileX(diver.x) ||
				this.map.worldToTileX(this.player.getX()) == this.map.worldToTileX(diver.x) - 1) &&
			this.map.worldToTileY(this.player.getY()) == this.map.worldToTileY(diver.y)) {
			collision = true;
			diver.play(DIVER_ANIM.PUSH, false)
			this.player.setPushSpeed(DIVER.PUSH_SPEED)
			this.time.addEvent({
				delay: 800,
				callback: this.resetDiverAnimations,
				callbackScope: this,
				args: [index]
			})
		}
		if (diver.y > this.player.getY()) {
			diver.setDepth(2)
		} else {
			diver.setDepth(-2)
		}

		return collision
	}

	// Reset Diver
	private resetDiverAnimations(index: number): void {
		if (this.diverMove[index] > 0) {
			this.divers[index].play(DIVER_ANIM.WALK_DOWN, true)
		} else {
			this.divers[index].play(DIVER_ANIM.WALK_UP, true)
		}
		this.player.setPushSpeed(0)
	}

	// Play Church Bells
	private playChurchBells(index: number, time: number, delta: number): void {
		let chance = Phaser.Math.Between(0, 24)
		if (chance === 12 || chance === 6) {
			this.churchBells.play()
		}
	}

	// Fruit Animations
	private fruitAnimations(index: number, time: number, delta: number): void {
		this.changeAnimation(this.fruit[index], this.fruitAnimationNames, 2)
		this.time.addEvent({
			delay: 1000,
			callback: this.fruitDelete,
			callbackScope: this,
			args: [index, time, delta]
		})
	}

	// Tree Animations
	private treeAnimations(index: number, time: number, delta: number): void {
		let chance = Phaser.Math.Between(0, 24)
		for (let i = 0; i < this.tree.length; i++) {
			if (chance === 18 || chance === 15 || chance === 12 || chance === 9 || chance === 6 || chance === 3) {
				if (this.tree[i].getCurrentAnimation().name !== 'leaf') {
					this.tree[i].play('leaf', true)
				}
			} else {
				if (this.tree[i].getCurrentAnimation().name !== 'idle') {
					this.tree[i].play('idle', true)
				}
			}
		}

		for (let i = 0; i < this.apple.length; i++) {
			if (chance === 22 || chance === 20 || chance === 16 || chance === 8 || chance === 4 || chance === 2) {
				if (this.apple[i].getCurrentAnimation().name !== 'leaf') {
					this.apple[i].play('leaf', true)
				}
			} else {
				if (this.apple[i].getCurrentAnimation().name !== 'idle') {
					this.apple[i].play('idle', true)
				}
			}
		}
	}

	// Delete fruits
	private fruitDelete(index: number, time: number, delta: number): void {
		let x = this.map.worldToTileX(this.fruit[index].x)
		let y = this.map.worldToTileY(this.fruit[index].y)

		this.tile = this.candyLayer.getTileAt(x, y)
		this.map.removeTile(this.tile)
		this.fruit[index].removeFromDisplayList()
		this.fruitRemaining--
	}

	// Reset Cannon Balls
	private cannonballReset(index: number): void {
		this.cannonball[index].setPosition(this.cannonballPosX[index], this.cannonballPosY[index] = 40)
		this.changeAnimation(this.cannonball[index], this.cannonballAnimationNames, 1)
		this.cannonballMoving[index] = true
		this.cannonball[index].setVisible(true)
		this.cannonball[index].setDepth(-21)
	}

	// Move Cannon Balls
	private cannonballMove(): void {

		for (let i = 0; i < this.cannonball.length; i++) {
			if (this.cannonballMoving[i]) {
				this.cannonballPosY[i] += this.cannonballSpeed;
				this.cannonball[i].setPosition(this.cannonballPosX[i], this.cannonballPosY[i])

				// Check players position
				let x = this.map.worldToTileX(this.cannonball[i].x)
				let y = this.map.worldToTileY(this.cannonball[i].y + (TILE.SIZE / 2))

				// Check is Exit Door Reached
				let tile = this.doorExitCannonBallLayer.getTileAt(x, y)

				if (tile !== null) {
					if (tile.index === EXIT_DOOR.TILE) {
						// Reached Door
						this.cannonball[i].setDepth(21)
					}else{
						this.cannonball[i].setDepth(-21)
					}
				}
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
	private setRecord(time: number): void {
		this.newRecordTime = time
		this.fetchRecordedTime()
	}

	// Add Points
	private addPoints(points: number): void {
		if (points > 0) {
			this.collectablePoints += points
		}
	}

	// Fetch Recorded Time
	private fetchRecordedTime(): void {
		let temp = window.localStorage.getItem('time_' + this.sys.settings.key)
		if (temp !== null) {
			this.bestRecordedTime = parseInt(temp) || 0
			if (this.bestRecordedTime === 0) {
				this.bestRecordedTime = HUD_ANIMATIONS_TIME.TIME
			}
		} else {
			this.bestRecordedTime = HUD_ANIMATIONS_TIME.TIME
		}

		if (this.newRecordTime < HUD_ANIMATIONS_TIME.TIME) {
			window.localStorage.setItem('time_' + this.sys.settings.key, this.newRecordTime.toString())
		} else {
			window.localStorage.setItem('time_' + this.sys.settings.key, HUD_ANIMATIONS_TIME.TIME.toString())
		}
	}

	// Fetch Recorded Score
	private fetchRecordedScore(): void {
		let temp = window.localStorage.getItem('score_' + this.sys.settings.key)
		if (temp !== null) {
			this.levelScore = parseInt(temp) || 0
		} else {
			this.levelScore = 0
		}
		this.levelScore += this.collectablePoints
		this.collectablePoints = 0 // Reset Points
		window.localStorage.setItem('score_' + this.sys.settings.key, this.levelScore.toString())
	}

	// Game State Management
	private gsmUpdate(time: number, delta: number): void {
		this.gameState = GSM.LEVEL_COMPLETE

		// Play Artifact Animations
		let level = this.sys.settings.key // Gets the name of the current scene

		if (level === LEVELS.LEVEL_01) {
			//Play Pig is Collected
			this.artifact[0].play('pig_fill', false)
			this.key[0].play("collected", true)
		} else if (level === LEVELS.LEVEL_02) {
			//Play Vase is Collected
			this.artifact[1].play('vase_fill', false)
			this.key[1].play("collected", true)
		} else if (level === LEVELS.LEVEL_03) {
			//Play Pot is Collected
			this.artifact[2].play('pot_fill', false)
			this.key[2].play("collected", true)
		} else if (level === LEVELS.LEVEL_04) {
			//Play Alter is Collected
			this.artifact[3].play('alter_fill', false)
			this.key[3].play("collected", true)
		} else if (level === LEVELS.CREDITS) {
			// No Artifact Animations
		}
	}

	// Complete Level
	private levelComplete(): void {
		// Change Levels
		this.backingMusic.stop()

		let level = this.sys.settings.key // Gets the name of the current scene

		if (level === LEVELS.LEVEL_01) {
			this.scene.start(ARTIFACTS.ArtiFactOneScene)
		} else if (level === LEVELS.LEVEL_02) {
			this.scene.start(ARTIFACTS.ArtiFactTwoScene)
		} else if (level === LEVELS.LEVEL_03) {
			this.scene.start(ARTIFACTS.ArtiFactThreeScene)
		} else if (level === LEVELS.LEVEL_04) {
			this.scene.start(ARTIFACTS.ArtiFactFourScene)
		} else if (level === LEVELS.CREDITS) {
			this.scene.start(ARTIFACTS.CREDITS)
		}
		// ENDS: Change Levels

	}

	// Process D-Pad input
	private handleDPad(time: number, delta: number): void {
		let pointer = this.input.activePointer;
		if (pointer.isDown) {

			let touchX = pointer.x;
			let touchY = pointer.y;
			let dpadX = this.dpad.x
			let dpadWidth = this.dpad.width
			let dpadY = this.dpad.y
			let dpadHeight = this.dpad.height

			this.dpad_down = false
			this.dpad_up = false
			this.dpad_left = false
			this.dpad_right = false

			if (touchX < dpadX - dpadWidth / 6 && touchX > dpadX - DPAD.SCALE * dpadWidth / 2) {
				this.dpad_left = true
			}
			if (touchX > dpadX + dpadWidth / 6 && touchX < dpadX + DPAD.SCALE * dpadWidth / 2) {
				this.dpad_right = true
			}
			if (touchY < dpadY - dpadHeight / 6 && touchY > dpadY - DPAD.SCALE * dpadHeight / 2) {
				this.dpad_up = true
			}
			if (touchY > dpadY + dpadHeight / 6 && touchY < dpadY + DPAD.SCALE * dpadHeight / 2) {
				this.dpad_down = true
			}
			if (this.dpad_down) {
				if (this.dpad_left) {
					this.player.getState().handleInput(INPUT_TYPES.WALK_LEFT, time, delta, this.player)
					this.dpad.play(DPAD_ANIMS.DOWN_LEFT, true)
				} else if (this.dpad_right) {
					this.player.getState().handleInput(INPUT_TYPES.WALK_RIGHT, time, delta, this.player)
					this.dpad.play(DPAD_ANIMS.DOWN_RIGHT, true)
				} else {
					this.player.getState().handleInput(INPUT_TYPES.WALK_DOWN, time, delta, this.player)
					this.dpad.play(DPAD_ANIMS.DOWN, true)
				}
			} else if (this.dpad_up) {
				if (this.dpad_left) {
					this.player.getState().handleInput(INPUT_TYPES.WALK_LEFT, time, delta, this.player)
					this.dpad.play(DPAD_ANIMS.UP_LEFT, true)
				} else if (this.dpad_right) {
					this.player.getState().handleInput(INPUT_TYPES.WALK_RIGHT, time, delta, this.player)
					this.dpad.play(DPAD_ANIMS.UP_RIGHT, true)
				} else {
					this.player.getState().handleInput(INPUT_TYPES.WALK_UP, time, delta, this.player)
					this.dpad.play(DPAD_ANIMS.UP, true)
				}
			} else if (this.dpad_left) {
				this.player.getState().handleInput(INPUT_TYPES.WALK_LEFT, time, delta, this.player)
				this.dpad.play(DPAD_ANIMS.LEFT, true)
			} else if (this.dpad_right) {
				this.player.getState().handleInput(INPUT_TYPES.WALK_RIGHT, time, delta, this.player)
				this.dpad.play(DPAD_ANIMS.RIGHT, true)
			}
		} else {
			this.dpad_down = false
			this.dpad_up = false
			this.dpad_left = false
			this.dpad_right = false
			this.dpad.play(DPAD_ANIMS.IDLE, true)
		};
	}
}
//import FpsText from '../objects/fpsText'
import ScoreText from '../objects/scoreText'
import CannonBall from '../objects/cannonBall'
import PlayerState from '../objects/PlayerState'

import {
	INPUT_TYPES
} from '../objects/inputs'
import {
	UnderAttack
} from '../objects/PlayerStateMachine'


const TRUFFLES_KEY = 'truffles'
const KEYS = ['orange', 'lemon', 'grape']
const IDLE_KEY = 'idle'
const CANNONBALL_KEY = 'cannonball'
const WINDMILL_KEY = 'windmill'

export default class GameScene extends Phaser.Scene {

	backingMusic
	idiomCue

	ball

	score!: ScoreText

	private truffles!: SpineGameObject
	private cannonball!: SpineGameObject
	private windmill!: SpineGameObject
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private keys
	private orange!: SpineGameObject
	private lemon!: SpineGameObject
	private grape!: SpineGameObject
	private fruit: SpineGameObject[] = []

	private trufflesAnimationNames: string[] = []
	private trufflesAnimationIndex = 0

	private fruitAnimationNames: string[] = []
	private orangeAnimationIndex = 0
	private grapeAnimationIndex = 0
	private lemonAnimationIndex = 0

	private trufflesPosX = 100
	private trufflesPosY = 360
	private trufflesSpeed = 2
	private tileSize = 32

	private soundDelay = 500

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

	private playerState!: PlayerState

	constructor() {
		super({
			key: 'GameScene'
		})
	}

	preload() {
		this.load.image('tileset', 'assets/level/truffles_level_1_tileset.png');
		this.load.image('hud', 'assets/level/hud.png');
		this.load.tilemapTiledJSON('level', 'assets/level/truffles_level_1.json');

		this.load.setPath('assets/spine/')
		this.load.spine(TRUFFLES_KEY, 'truffles/truffles_all.json', 'truffles/truffles_all.atlas')
		this.load.spine(KEYS[0], 'fruits/orange/orange.json', 'fruits/orange/orange.atlas')
		this.load.spine(KEYS[1], 'fruits/grape/grape.json', 'fruits/grape/grape.atlas')
		this.load.spine(KEYS[2], 'fruits/lemon/lemon.json', 'fruits/lemon/lemon.atlas')
		this.load.spine(CANNONBALL_KEY,'cannonball/cannonball.json','cannonball/cannonball.atlas')
		this.load.spine(WINDMILL_KEY,'windmill/windmill.json','windmill/windmill.atlas')
	}

	create() {

		this.score = new ScoreText(this)
		this.score.setDepth(4)

		this.setupMap()

		this.ball = new CannonBall(this, 288, 48, )
		this.ball.setDepth(2)

		this.backingMusic = this.sound.add('level_backing_track', {
			loop: true
		})
		this.backingMusic.play()


		this.truffles = this.createSpineObject(IDLE_KEY, TRUFFLES_KEY, 100, 360, 0.25, 0.25)
		this.truffles.setDepth(2)

		this.cursors = this.input.keyboard.createCursorKeys()
		this.keys = this.input.keyboard.addKeys("I,E,Q,W,A,S,D,R,T");

		this.initializeAnimationsState(this.truffles, this.trufflesAnimationNames)

		var tilesWide = 40
		var tilesHigh = 23
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				var tile = this.candyLayer.getTileAt(j, i)
				if (tile != null) {
					if (tile.index === 4295) {
						this.fruit.push(this.createSpineObject(IDLE_KEY, KEYS[0], j * this.tileSize, i * this.tileSize, 0.7, 0.7))
					} else if (tile.index === 4191) {
						this.fruit.push(this.createSpineObject(IDLE_KEY, KEYS[1], j * this.tileSize, i * this.tileSize, 0.7, 0.7))
					} else if (tile.index === 4243) {
						this.fruit.push(this.createSpineObject(IDLE_KEY, KEYS[2], j * this.tileSize, i * this.tileSize, 0.7, 0.7))
					}
				}
			}
		}

		for (let o = 0; o < this.fruit.length; o++) {
			this.initializeAnimationsState(this.fruit[o], this.fruitAnimationNames)
		}

		this.playerState = new PlayerState(this, this.truffles);

		this.time.addEvent({ delay: this.soundDelay, callback: this.resetSounds, callbackScope: this})
	}

	update() {

		this.ball.update()

		this.score.update()

		const size = this.trufflesAnimationNames.length

		if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {

			/*this.playerState.handleInput(INPUT_TYPES.WALK_RIGHT)*/

			this.changeAnimation(this.truffles, this.trufflesAnimationNames,4)

		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {
			this.playerState.handleInput(INPUT_TYPES.WALK_LEFT)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.up!)) {
			this.playerState.handleInput(INPUT_TYPES.WALK_UP)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.down!)) {
			this.playerState.handleInput(INPUT_TYPES.WALK_DOWN)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.Q)) {
			console.log('UNDER ATTACK')
			this.playerState.handleInput(INPUT_TYPES.UNDER_ATTACK)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.W)) {
			console.log('w EATING UP')
			this.playerState.handleInput(INPUT_TYPES.EATING_UP)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.A)) {
			console.log('EATING LEFT')
			this.playerState.handleInput(INPUT_TYPES.EATING_LEFT)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.S)) {
			console.log('EATING DOWN')
			this.playerState.handleInput(INPUT_TYPES.EATING_DOWN)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.D)) {
			console.log('EATING RIGHT')
			this.playerState.handleInput(INPUT_TYPES.EATING_RIGHT)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.E)) {
			console.log('EXPIRED')
			this.playerState.handleInput(INPUT_TYPES.EXPIRED)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.R)) {
			console.log('REVIVE')
			this.playerState.handleInput(INPUT_TYPES.REVIVE)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.T)) {
			console.log('REVIVED')
			this.playerState.handleInput(INPUT_TYPES.REVIVED)
		} else if (Phaser.Input.Keyboard.JustDown(this.keys.I)) {
			console.log('IDLING')
			this.playerState.handleInput(INPUT_TYPES.IDLE)
		}

		if (this.cursors.right.isDown){ 
			const x = this.map.worldToTileX(this.trufflesPosX - this.tileSize / 2)
			const y = this.map.worldToTileY(this.trufflesPosY)

			this.tile = this.collisionLayer.getTileAt(x + 1, y)
			

			if (this.tile == null) {
				this.trufflesPosX += this.trufflesSpeed
				this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
				}
	    }

		if (this.cursors.left.isDown) {
			const x = this.map.worldToTileX(this.trufflesPosX + this.tileSize / 2)
			const y = this.map.worldToTileY(this.trufflesPosY)

			this.tile = this.collisionLayer.getTileAt(x - 1, y)

			if (this.tile == null) {
				this.trufflesPosX -= this.trufflesSpeed
				this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
			}
		}

		if (this.cursors.up.isDown) {
			const x = this.map.worldToTileX(this.trufflesPosX)
			const y = this.map.worldToTileY(this.trufflesPosY + this.tileSize / 4)

			this.tile = this.collisionLayer.getTileAt(x, y - 1)

			if (this.tile == null) {
				this.trufflesPosY -= this.trufflesSpeed
				this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
			}
		}

		if (this.cursors.down.isDown) {

			const x = this.map.worldToTileX(this.trufflesPosX)
			const y = this.map.worldToTileY(this.trufflesPosY + this.trufflesSpeed)

			this.tile = this.collisionLayer.getTileAt(x, y)

			if (this.tile == null) {
				this.trufflesPosY += this.trufflesSpeed
				this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
			}
		}

		if (!this.cursors.down.isDown && !this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
			this.playerState.handleInput(INPUT_TYPES.IDLE)
		}
		else {
			for (let i = 0; i < this.fruit.length; i++){
					
					if(this.trufflesAABB(this.truffles, this.fruit[i])){
						this.changeAnimation(this.fruit[i],this.fruitAnimationNames,1)
					}
				}
			}

		this.playerState.update() // Updates the Player State See PlayerStateMachine*/
	}

	private setupMap() {
		this.map = this.make.tilemap({
			key: 'level',
			tileWidth: 32,
			tileHeight: 32
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

		this.wallTop2Layer = this.map.createLayer('map/castle/walls/wall_top_depth_03', this.tileset, 0, 0);
		this.wallTop2Layer.setDepth(3);

		this.house2RoofLayer = this.map.createLayer('map/buildings/background/house_roof_depth_03/house_roof_layer_2', this.tileset, 0, 0);
		this.house2RoofLayer.setDepth(3);

		this.houseRoofLayer = this.map.createLayer('map/buildings/background/house_roof_depth_03/house_roof_layer_1', this.tileset, 0, 0);
		this.houseRoofLayer.setDepth(3);

		this.towerTop1Layer = this.map.createLayer('map/castle/tower/tower_top_depth_01', this.tileset, 0, 0);
		this.towerTop1Layer.setDepth(1);

		this.towerTop2Layer = this.map.createLayer('map/castle/tower/tower_top_depth_03', this.tileset, 0, 0);
		this.towerTop2Layer.setDepth(3);

		this.churchRoofLayer = this.map.createLayer('map/buildings/background/church_depth_03/church_roof_03', this.tileset, 0, 0);
		this.churchRoofLayer.setDepth(1);

		this.castleRoofLayer = this.map.createLayer('map/castle/castle/castle_roof_depth_03', this.tileset, 0, 0);
		this.castleRoofLayer.setDepth(3);

		this.miscTop1Layer = this.map.createLayer('map/environment_objects/miscellaneous_top_depth_01', this.tileset, 0, 0);
		this.miscTop1Layer.setDepth(1);

		//this.hudLayer = this.map.createLayer('map/hud/hud_depth_05', this.hudTileset, 0, 0);
		//this.hudLayer.setDepth(5);

		this.collisionLayer = this.map.createLayer('map/environment_collision/collide_depth_02', this.tileset, 0, 0);
		this.collisionLayer.setDepth(2)
		this.collisionLayer.setVisible(false)

		this.candyLayer = this.map.createLayer('map/collectables/candies_depth_02', this.tileset, 0, 0);
		this.candyLayer.setDepth(2);
		this.candyLayer.setVisible(true)
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

	private resetSounds() {
		this.playerState.playSound()
		this.time.addEvent({ delay: this.soundDelay, callback: this.resetSounds, callbackScope: this})
	}

	private trufflesAABB (truffles: SpineGameObject, collidable:SpineGameObject){
    
		var collision = false;

		if (this.trufflesPosX - this.tileSize/2 < collidable.x + collidable.scaleX * collidable.width && 
			this.trufflesPosX + this.tileSize/2 > collidable.x && 
			this.trufflesPosY - this.tileSize < collidable.y + collidable.scaleY * collidable.height && 
			this.trufflesPosY > collidable.y){
			collision = true;
		}
         
		return collision
	}
}
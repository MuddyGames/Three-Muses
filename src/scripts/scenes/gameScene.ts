//import FpsText from '../objects/fpsText'
import FrameText from '../objects/frameText'
import CannonBall from '../objects/cannonBall'


const TRUFFLES_KEY = 'truffles'
const KEYS = ['orange', 'lemon', 'grape']
const IDLE_KEY = 'idle'

export default class GameScene extends Phaser.Scene {

	// fpsText
	frameText
	backingMusic
	idiomCue

	ball

	private truffles!: SpineGameObject
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
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
	private trufflesScale = 0.25
	private tileSize = 32

	// TileMap Data
	private map!: Phaser.Tilemaps.Tilemap
	private tile!: Phaser.Tilemaps.Tile
	private waterLayer!: Phaser.Tilemaps.TilemapLayer
	private groundLayer!: Phaser.Tilemaps.TilemapLayer
	private ground2Layer!: Phaser.Tilemaps.TilemapLayer
	private collisionLayer!: Phaser.Tilemaps.TilemapLayer

	private candyLayer!: Phaser.Tilemaps.TilemapLayer

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
		this.load.spine(TRUFFLES_KEY, 'truffles_all.json', 'truffles_all.atlas')
		this.load.spine(KEYS[0], 'orange.json', 'orange.atlas')
		this.load.spine(KEYS[1], 'grape.json', 'grape.atlas')
		this.load.spine(KEYS[2], 'lemon.json', 'lemon.atlas')
	}

	create() {
		this.map = this.make.tilemap({
			key: 'level',
			tileWidth: 32,
			tileHeight: 32
		});
		const tileset = this.map.addTilesetImage("truffles_level_1_tileset", 'tileset');
		const hudTileset = this.map.addTilesetImage("hud", 'hud');

		this.waterLayer = this.map.createLayer('map/ground/water_depth_00', tileset, 0, 0);
		this.waterLayer.setDepth(0);

		this.groundLayer = this.map.createLayer('map/ground/ground_depth_00', tileset, 0, 0);
		this.groundLayer.setDepth(0);

		this.ground2Layer = this.map.createLayer('map/shadow_depth_01', tileset, 0, 0);
		this.ground2Layer.setDepth(1);

		const house2Layer = this.map.createLayer('map/buildings/house_depth_01/house_layer_2', tileset, 0, 0);
		house2Layer.setDepth(1);

		const house1Layer = this.map.createLayer('map/buildings/house_depth_01/house_layer_1', tileset, 0, 0);
		house1Layer.setDepth(1);

		const wall1Layer = this.map.createLayer('map/buildings/walls_depth_01', tileset, 0, 0);
		wall1Layer.setDepth(1);

		const wall2Layer = this.map.createLayer('map/buildings/walls_depth_03', tileset, 0, 0);
		wall2Layer.setDepth(3);

		const churchLayer = this.map.createLayer('map/buildings/church_depth_01', tileset, 0, 0);
		churchLayer.setDepth(1);

		const castleLayer = this.map.createLayer('map/buildings/castle_depth_01', tileset, 0, 0);
		castleLayer.setDepth(1);

		const miscLayer = this.map.createLayer('map/buildings/miscellaneous_depth_01', tileset, 0, 0);
		miscLayer.setDepth(1);

		const wallTop1Layer = this.map.createLayer('map/move_behind /wall_top_depth_01', tileset, 0, 0);
		wallTop1Layer.setDepth(1);

		const wallTop2Layer = this.map.createLayer('map/move_behind /wall_top_depth_03', tileset, 0, 0);
		wallTop2Layer.setDepth(3);

		const house2RoofLayer = this.map.createLayer('map/move_behind /house_roof_depth_03/house_roof_layer_2', tileset, 0, 0);
		house2RoofLayer.setDepth(3);

		const houseRoofLayer = this.map.createLayer('map/move_behind /house_roof_depth_03/house_roof_layer_1', tileset, 0, 0);
		houseRoofLayer.setDepth(3);

		const towerTop1Layer = this.map.createLayer('map/move_behind /tower_top_depth_01', tileset, 0, 0);
		towerTop1Layer.setDepth(1);

		const towerTop2Layer = this.map.createLayer('map/move_behind /tower_top_depth_03', tileset, 0, 0);
		towerTop2Layer.setDepth(3);

		const churchRoofLayer = this.map.createLayer('map/move_behind /church_roof_depth_03', tileset, 0, 0);
		churchRoofLayer.setDepth(1);

		const castleRoofLayer = this.map.createLayer('map/move_behind /castle_roof_depth_03', tileset, 0, 0);
		castleRoofLayer.setDepth(3);

		const miscTop1Layer = this.map.createLayer('map/move_behind /miscellaneous_top_depth_01', tileset, 0, 0);
		miscTop1Layer.setDepth(1);

		const hudLayer = this.map.createLayer('hud_depth_05', hudTileset, 0, 0);
		hudLayer.setDepth(5);

		this.collisionLayer = this.map.createLayer('collide_depth_02', tileset, 0, 0);
		this.collisionLayer.setDepth(2)
		//this.collisionLayer.setVisible(false)

		this.candyLayer = this.map.createLayer('collectables_depth_02', tileset, 0, 0);
		this.candyLayer.setDepth(2);
		this.candyLayer.setVisible(false)

		//this.fpsText = new FpsText(this)
		this.frameText = new FrameText(this)
		this.frameText.setDepth(5)

		this.ball = new CannonBall(this, 288, 48, )
		this.ball.setDepth(2)

		this.backingMusic = this.sound.add('level_backing_track', {
			loop: true
		})
		this.backingMusic.play()

		// display the Phaser.VERSION
		//this.add
		//	.text(this.cameras.main.width - 15, 15, `Game Scene Phaser v${Phaser.VERSION}`, {
		//		color: '#000000',
		//		fontSize: '24px'
		//	})
		//	.setOrigin(1, 0)


		this.truffles = this.createSpineObject(IDLE_KEY, TRUFFLES_KEY, 100, 360, 0.25, 0.25)
		this.truffles.setDepth(2)

		this.frameText.setText(IDLE_KEY)
		this.frameText.setText(IDLE_KEY + "[ " + this.trufflesAnimationIndex + " ]")

		this.cursors = this.input.keyboard.createCursorKeys()

		this.initializeAnimationsState(this.truffles, this.trufflesAnimationNames)

		var tilesWide = 40
		var tilesHigh = 23
		for (let i = 0; i < tilesHigh; i++) {
			for (let j = 0; j < tilesWide; j++) {
				var tile = this.candyLayer.getTileAt(j, i)
				if (tile != null) {
					console.log(tile.getTileData())
					if (tile.index === 550) {
						this.fruit.push(this.createSpineObject(IDLE_KEY, KEYS[0], j * this.tileSize, i * this.tileSize, 0.7, 0.7))
					} else if (tile.index === 653) {
						this.fruit.push(this.createSpineObject(IDLE_KEY, KEYS[1], j * this.tileSize, i * this.tileSize, 0.7, 0.7))
					} else if (tile.index === 757) {
						this.fruit.push(this.createSpineObject(IDLE_KEY, KEYS[2], j * this.tileSize, i * this.tileSize, 0.7, 0.7))
					}
				}
			}
		}

		for(let o = 0; o < this.fruit.length; o++){
			this.initializeAnimationsState(this.fruit[o], this.fruitAnimationNames)
		}
	}

	update() {
		//this.fpsText.update()
		this.frameText.update()
		this.ball.update()

		const size = this.trufflesAnimationNames.length

		if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {

			this.idiomCue = this.sound.add('a_boy_the_kid')
			this.idiomCue.play()

			this.changeAnimation(this.truffles, this.trufflesAnimationNames, 4)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {

			this.idiomCue = this.sound.add('head_like_a_chewed_toffee')
			this.idiomCue.play()

			this.changeAnimation(this.truffles, this.trufflesAnimationNames, 3)
		}
		if (Phaser.Input.Keyboard.JustDown(this.cursors.up!)) {

			this.idiomCue = this.sound.add('a_boy_the_kid')
			this.idiomCue.play()

			this.changeAnimation(this.truffles, this.trufflesAnimationNames, 5)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.down!)) {

			this.idiomCue = this.sound.add('head_like_a_chewed_toffee')
			this.idiomCue.play()

			this.changeAnimation(this.truffles, this.trufflesAnimationNames, 2)
		}

		if (this.cursors.right.isDown) {
			
			const x = this.map.worldToTileX(this.trufflesPosX - this.tileSize/2)
			const y = this.map.worldToTileY(this.trufflesPosY)

			this.tile = this.collisionLayer.getTileAt(x + 1, y)

			if (this.tile == null) {
				this.trufflesPosX += this.trufflesSpeed
				this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
			}
		}

		if (this.cursors.left.isDown) {
			const x = this.map.worldToTileX(this.trufflesPosX + this.tileSize/2)
			const y = this.map.worldToTileY(this.trufflesPosY)

			this.tile = this.collisionLayer.getTileAt(x - 1, y)

			if (this.tile == null) {
				this.trufflesPosX -= this.trufflesSpeed
				this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
			}

		}

		if (this.cursors.up.isDown) {
			const x = this.map.worldToTileX(this.trufflesPosX)
			const y = this.map.worldToTileY(this.trufflesPosY)

			this.tile = this.collisionLayer.getTileAt(x, y - 1)

			if (this.tile == null) {
				this.trufflesPosY -= this.trufflesSpeed
				this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
			}

		}

		if (this.cursors.down.isDown) {

			const x = this.map.worldToTileX(this.trufflesPosX)
			const y = this.map.worldToTileY(this.trufflesPosY + this.trufflesSpeed)

			this.tile = this.collisionLayer.getTileAt(x, y + 1)

			if (this.tile == null) {
				this.trufflesPosY += this.trufflesSpeed
				this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
			}
		}

		if (!this.cursors.down.isDown && !this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
			this.changeAnimation(this.truffles, this.trufflesAnimationNames, 1)
		}
	}

	private createSpineObject(startAnim: string, key: string, x, y, scaleX, scaleY) {
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
		this.frameText.setText(animation + "[ " + index + " ]")
	}
}
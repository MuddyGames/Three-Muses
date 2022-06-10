//import FpsText from '../objects/fpsText'
import FrameText from '../objects/frameText'
import CannonBall from '../objects/cannonBall'


const TRUFFLES_KEY = 'truffles'
const ORANGE_KEY = 'orange'
const LEMON_KEY = 'lemon'
const GRAPE_KEY = 'grape'

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

	private animationNames: string[] = []
	private animationIndex = 0

	private trufflesPosX = 100
	private trufflesPosY = 360
	private trufflesSpeed = 2

	constructor() {
		super({
			key: 'GameScene'
		})
	}

	preload() {
		this.load.image('tileset', 'assets/level/tileset_1.png');
		this.load.image('hud', 'assets/level/hud.png');
		this.load.tilemapTiledJSON('level', 'assets/level/truffles_level_1.json');

		this.load.setPath('assets/spine/')
		this.load.spine(TRUFFLES_KEY, 'truffles_all.json', 'truffles_all.atlas')
		this.load.spine(ORANGE_KEY, 'orange.json', 'orange.atlas')
		this.load.spine(GRAPE_KEY, 'grape.json', 'grape.atlas')
		this.load.spine(LEMON_KEY, 'lemon.json', 'lemon.atlas')
	}

	create() {
		const map = this.make.tilemap({
			key: 'level',
			tileWidth: 32,
			tileHeight: 32
		});
		const tileset = map.addTilesetImage("truffles_level_1_tileset", 'tileset');
		const hudTileset = map.addTilesetImage("key_hud", 'hud');

		const waterLayer = map.createLayer('map/ground/water_depth_00', tileset, 0, 0);
		waterLayer.setDepth(0);

		const groundLayer = map.createLayer('map/ground/ground_depth_00', tileset, 0, 0);
		groundLayer.setDepth(0);

		const ground2Layer = map.createLayer('map/shadow_depth_01', tileset, 0, 0);
		ground2Layer.setDepth(1);

		const house1Layer = map.createLayer('map/buildings/house_depth_01/house_layer_1', tileset, 0, 0);
		house1Layer.setDepth(1);

		const house2Layer = map.createLayer('map/buildings/house_depth_01/house_layer_2', tileset, 0, 0);
		house2Layer.setDepth(1);

		const wall1Layer = map.createLayer('map/buildings/walls_depth_01', tileset, 0, 0);
		wall1Layer.setDepth(1);

		const wall2Layer = map.createLayer('map/buildings/walls_depth_03', tileset, 0, 0);
		wall2Layer.setDepth(3);
/*
				const churchLayer = map.createLayer('map/buildings/church_depth_01', tileset, 0, 0);
				churchLayer.setDepth(1);

				const castleLayer = map.createLayer('map/buildings/castle_depth_01', tileset, 0, 0);
				castleLayer.setDepth(1);

				const miscLayer = map.createLayer('map/buildings/miscellaneous_depth_01', tileset, 0, 0);
				miscLayer.setDepth(1);

				const wallTop1Layer = map.createLayer('map/move behind /wall_top_depth_01', tileset, 0, 0);
				wallTop1Layer.setDepth(1);

				const wallTop2Layer = map.createLayer('map/move behind /wall_top_depth_03', tileset, 0, 0);
				wallTop2Layer.setDepth(3);

				const house2RoofLayer = map.createLayer('map/move behind /house_roof_depth_03/house_roof_layer_2', tileset, 0, 0);
				house2RoofLayer.setDepth(3);

				const houseRoofLayer = map.createLayer('map/move behind /house_roof_depth_03/house_roof_layer_1', tileset, 0, 0);
				houseRoofLayer.setDepth(3);

				const towerTop1Layer = map.createLayer('map/move behind /tower_top_depth_01', tileset, 0, 0);
				towerTop1Layer.setDepth(1);

				const towerTop2Layer = map.createLayer('map/move behind /tower_top_depth_03', tileset, 0, 0);
				towerTop2Layer.setDepth(3);

				const churchRoofLayer = map.createLayer('map/move behind /church_roof_depth_03', tileset, 0, 0);
				churchRoofLayer.setDepth(1);

				const castleRoofLayer = map.createLayer('map/move behind /castle_roof_depth_03', tileset, 0, 0);
				castleRoofLayer.setDepth(3);

				const miscTop1Layer = map.createLayer('map/move behind /miscellaneous_top_depth_01', tileset, 0, 0);
				miscTop1Layer.setDepth(1);

				const miscTop2Layer = map.createLayer('map/move behind /miscellaneous_top_depth_03', tileset, 0, 0);
				miscTop2Layer.setDepth(3);

				const hudLayer = map.createLayer('hud_depth_05', hudTileset, 0, 0);
				hudLayer.setDepth(5);
		*/
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

		const animation = 'idle'

		this.truffles = this.createTruffles(animation)
		this.truffles.setDepth(2)

		this.orange = this.createOrange(animation)
		this.lemon = this.createLemon(animation)
		this.grape = this.createGrape(animation)
		this.frameText.setText(animation)
		this.frameText.setText(animation + "[ " + this.animationIndex + " ]")

		this.cursors = this.input.keyboard.createCursorKeys()

		this.initializeAnimationsState(this.truffles)
		this.initializeAnimationsState(this.orange)
	}

	update() {
		//this.fpsText.update()
		this.frameText.update()
		this.ball.update()

		const size = this.animationNames.length

		if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {

			this.idiomCue = this.sound.add('a_boy_the_kid')
			this.idiomCue.play()

			this.changeAnimation(3)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {

			this.idiomCue = this.sound.add('head_like_a_chewed_toffee')
			this.idiomCue.play()
			this.changeAnimation(2)
		}
		if (Phaser.Input.Keyboard.JustDown(this.cursors.up!)) {

			this.idiomCue = this.sound.add('a_boy_the_kid')
			this.idiomCue.play()

			this.changeAnimation(4)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.down!)) {

			this.idiomCue = this.sound.add('head_like_a_chewed_toffee')
			this.idiomCue.play()
			this.changeAnimation(1)
		}

		if (this.cursors.right.isDown) {
			this.trufflesPosX += this.trufflesSpeed
			this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
		}

		if (this.cursors.left.isDown) {
			this.trufflesPosX -= this.trufflesSpeed
			this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)

		}

		if (this.cursors.up.isDown) {
			this.trufflesPosY -= this.trufflesSpeed
			this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
		}

		if (this.cursors.down.isDown) {
			this.trufflesPosY += this.trufflesSpeed
			this.truffles.setPosition(this.trufflesPosX, this.trufflesPosY)
		}

		if (!this.cursors.down.isDown && !this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
			this.changeAnimation(0)
		}
	}

	private createTruffles(startAnim = 'idle') {
		const truffles = this.add.spine(100, 360, TRUFFLES_KEY, startAnim, true)

		truffles.scaleX = 0.25
		truffles.scaleY = 0.25

		return truffles
	}
	private createOrange(startAnim = 'idle') {
		const orange = this.add.spine(120, 360, ORANGE_KEY, startAnim, true)

		orange.scaleX = 0.7
		orange.scaleY = 0.7

		return orange
	}
	private createGrape(startAnim = 'idle') {
		const grape = this.add.spine(80, 360, GRAPE_KEY, startAnim, true)

		grape.scaleX = 0.7
		grape.scaleY = 0.7

		return grape
	}
	private createLemon(startAnim = 'idle') {
		const lemon = this.add.spine(150, 360, LEMON_KEY, startAnim, true)

		lemon.scaleX = 0.7
		lemon.scaleY = 0.7


		return lemon
	}
	private initializeAnimationsState(spineGO: SpineGameObject) {
		const startAnim = spineGO.getCurrentAnimation().name

		spineGO.getAnimationList().forEach((name, idx) => {
			this.animationNames.push(name)
			if (name === startAnim) {
				this.animationIndex = idx
			}
		})
	}

	private changeAnimation(index: number) {
		const animation = this.animationNames[index]
		this.truffles.play(animation, true)
		this.frameText.setText(animation + "[ " + this.animationIndex + " ]")
	}
}
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
		this.load.image('tiles', 'assets/img/map_1.png');
		this.load.image('hudTiles', 'assets/img/hud.png');
		this.load.tilemapTiledJSON('level', 'assets/img/map_1.json');

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
		const tileset = map.addTilesetImage("map_1", 'tiles');
		const hudTileset = map.addTilesetImage("hud", 'hudTiles');

		const waterLayer = map.createLayer('map/ground/water', tileset, 0, 0);
		waterLayer.setDepth(0);

		const groundLayer = map.createLayer('map/ground/ground', tileset, 0, 0);
		groundLayer.setDepth(0);

		const ground2Layer = map.createLayer('map/shadow 1', tileset, 0, 0);
		ground2Layer.setDepth(1);

		const house2Layer = map.createLayer('map/buildings/houses/house 2', tileset, 0, 0);
		house2Layer.setDepth(1);

		const houseLayer = map.createLayer('map/buildings/houses/house 1', tileset, 0, 0);
		houseLayer.setDepth(1);

		const wallLayer = map.createLayer('map/buildings/walls', tileset, 0, 0);
		wallLayer.setDepth(3);

		const churchLayer = map.createLayer('map/buildings/church', tileset, 0, 0);
		churchLayer.setDepth(1);

		const castleLayer = map.createLayer('map/buildings/castle', tileset, 0, 0);
		castleLayer.setDepth(3);

		const miscLayer = map.createLayer('map/buildings/miselanious', tileset, 0, 0);
		miscLayer.setDepth(2);

		const wallTopLayer = map.createLayer('map/move behind /wall top', tileset, 0, 0);
		wallTopLayer.setDepth(2);

		const shad2Layer = map.createLayer('map/move behind /Shadow 2', tileset, 0, 0);
		shad2Layer.setDepth(2);

		const house2RoofLayer = map.createLayer('map/move behind /house roof/house roof 2', tileset, 0, 0);
		house2RoofLayer.setDepth(2);

		const houseRoofLayer = map.createLayer('map/move behind /house roof/house roof 1', tileset, 0, 0);
		houseRoofLayer.setDepth(2);

		const towerTopLayer = map.createLayer('map/move behind /tower top', tileset, 0, 0);
		towerTopLayer.setDepth(2);

		const churchRoofLayer = map.createLayer('map/move behind /church roof', tileset, 0, 0);
		churchRoofLayer.setDepth(2);

		const castleRoofLayer = map.createLayer('map/move behind /castle roof', tileset, 0, 0);
		castleRoofLayer.setDepth(2);

		const miscTopLayer = map.createLayer('map/move behind /miselanious top', tileset, 0, 0);
		miscTopLayer.setDepth(2);

		const hudLayer = map.createLayer('hud', hudTileset, 0, 0);
		hudLayer.setDepth(2);

		//this.fpsText = new FpsText(this)
		this.frameText = new FrameText(this)
		this.frameText.setDepth(5)

		this.ball = new CannonBall(this, 288, 48, )
		this.ball.setDepth(5)

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
		this.truffles.setDepth(1)

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
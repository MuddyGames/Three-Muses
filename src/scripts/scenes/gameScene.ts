import FpsText from '../objects/fpsText'
import FrameText from '../objects/frameText'
import CannonBall from '../objects/cannonBall'


const TRUFFLES_KEY = 'truffles'

export default class GameScene extends Phaser.Scene {

	fpsText
	frameText
	backingMusic
	idiomCue

	private truffles!: SpineGameObject
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	private animationNames: string[] = []
	private animationIndex = 0

	private trufflesPosX = 100
	private trufflesPosY = 360
	private trufflesSpeed = 5



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
	}

	create() {
		const map = this.make.tilemap({ key: 'level', tileWidth: 32, tileHeight: 32});
		const tileset = map.addTilesetImage("map_1", 'tiles');
		const hudTileset = map.addTilesetImage("hud", 'hudTiles');
		const waterLayer = map.createLayer('map/ground/water', tileset, 0, 0);
		const groundLayer = map.createLayer('map/ground/ground', tileset, 0, 0);
		const ground2Layer = map.createLayer('map/shadow 1', tileset, 0, 0);
		
		const house2Layer = map.createLayer('map/buildings/houses/house 2', tileset, 0, 0);
		const houseLayer = map.createLayer('map/buildings/houses/house 1', tileset, 0, 0);
		const wallLayer = map.createLayer('map/buildings/walls', tileset, 0, 0);
		const churchLayer = map.createLayer('map/buildings/church', tileset, 0, 0);
		const castleLayer = map.createLayer('map/buildings/castle', tileset, 0, 0);
		const miscLayer = map.createLayer('map/buildings/miselanious', tileset, 0, 0);
		
		const wallTopLayer = map.createLayer('map/move behind /wall top', tileset, 0, 0);
		const shad2Layer = map.createLayer('map/move behind /Shadow 2', tileset, 0, 0);
		const house2RoofLayer = map.createLayer('map/move behind /house roof/house roof 2', tileset, 0, 0);
		const houseRoofLayer = map.createLayer('map/move behind /house roof/house roof 1', tileset, 0, 0);
		const towerTopLayer = map.createLayer('map/move behind /tower top', tileset, 0, 0);
		const churchRoofLayer = map.createLayer('map/move behind /church roof', tileset, 0, 0);
		const castleRoofLayer = map.createLayer('map/move behind /castle roof', tileset, 0, 0);
		const miscTopLayer = map.createLayer('map/move behind /miselanious top', tileset, 0, 0);
		
		const hudLayer = map.createLayer('hud', hudTileset, 0, 0);

		this.fpsText = new FpsText(this)
		this.frameText = new FrameText(this)

		new CannonBall(this, this.cameras.main.width / 2, 0, )

		this.backingMusic = this.sound.add('level_backing-track',{ loop: true })
		this.backingMusic.play()

		// display the Phaser.VERSION
		this.add
			.text(this.cameras.main.width - 15, 15, `Game Scene Phaser v${Phaser.VERSION}`, {
				color: '#000000',
				fontSize: '24px'
			})
			.setOrigin(1, 0)

		const animation = 'idle'

		this.truffles = this.createTruffles(animation)
		this.frameText.setText(animation)
		this.frameText.setText(animation + "[ " + this.animationIndex + " ]")

		this.cursors = this.input.keyboard.createCursorKeys()

		this.initializeAnimationsState(this.truffles)
	}

	update() {
		this.fpsText.update()
		this.frameText.update()

		const size = this.animationNames.length
		if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {

			this.idiomCue = this.sound.add('a_boy_the_kid')
			this.idiomCue.play()
			
			if (this.animationIndex >= size - 1) {
				this.animationIndex = 0
			} else {
				++this.animationIndex
			}

			this.changeAnimation(this.animationIndex)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {
			
			this.idiomCue = this.sound.add('head_like_a_chewed_toffee')
			this.idiomCue.play()

			if (this.animationIndex <= 0) {
				this.animationIndex = size - 1
			} else {
				--this.animationIndex
			}

			this.changeAnimation(this.animationIndex)
		}

		if (this.cursors.right.isDown){
             this.trufflesPosX += this.trufflesSpeed
			 this.truffles.setPosition(this.trufflesPosX,this.trufflesPosY)
		}
		if (this.cursors.left.isDown){
			this.trufflesPosX -= this.trufflesSpeed
			this.truffles.setPosition(this.trufflesPosX,this.trufflesPosY)
	   }
	   if (this.cursors.up.isDown){
		this.trufflesPosY -= this.trufflesSpeed
		this.truffles.setPosition(this.trufflesPosX,this.trufflesPosY)
       }
	   if (this.cursors.down.isDown){
		this.trufflesPosY+= this.trufflesSpeed
		this.truffles.setPosition(this.trufflesPosX,this.trufflesPosY)
   }
   
   
	   
	}

	private createTruffles(startAnim = 'idle') {
		const truffles = this.add.spine(100, 360, TRUFFLES_KEY, startAnim, true)

		truffles.scaleX = 0.2
		truffles.scaleY = 0.2

		return truffles
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
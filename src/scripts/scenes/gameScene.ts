import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import FrameText from '../objects/frameText'


const SPINEBOY_KEY = 'spineboy'

export default class GameScene extends Phaser.Scene {

	fpsText
	frameText

	private spineBoy!: SpineGameObject
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	private animationNames: string[] = []
	private animationIndex = 0

	constructor() {
		super({
			key: 'GameScene'
		})
	}

	preload() {
		this.load.setPath('assets/spine/')
		this.load.spine(SPINEBOY_KEY, 'spineboy-pro.json', 'spineboy-pro.atlas')
		//this.load.spine(SPINEBOY_KEY, 'goblins.json', 'goblins.atlas')
		//this.load.spine(SPINEBOY_KEY, 'truffles_front.json', 'truffles_front.atlas')
	}

	create() {
		new PhaserLogo(this, this.cameras.main.width / 2, 0)
		this.fpsText = new FpsText(this)
		this.frameText = new FrameText(this)

		// display the Phaser.VERSION
		this.add
			.text(this.cameras.main.width - 15, 15, `Game Scene Phaser v${Phaser.VERSION}`, {
				color: '#000000',
				fontSize: '24px'
			})
			.setOrigin(1, 0)

		const animation = 'idle'

		this.spineBoy = this.createSpineBoy(animation)
		this.frameText.setText(animation)
		this.frameText.setText(animation + "[ " + this.animationIndex + " ]")

		this.cursors = this.input.keyboard.createCursorKeys()

		this.initializeAnimationsState(this.spineBoy)
	}

	update() {
		this.fpsText.update()
		this.frameText.update()

		const size = this.animationNames.length
		if (Phaser.Input.Keyboard.JustDown(this.cursors.right!)) {
			if (this.animationIndex >= size - 1) {
				this.animationIndex = 0
			} else {
				++this.animationIndex
			}

			this.changeAnimation(this.animationIndex)
		} else if (Phaser.Input.Keyboard.JustDown(this.cursors.left!)) {
			if (this.animationIndex <= 0) {
				this.animationIndex = size - 1
			} else {
				--this.animationIndex
			}

			this.changeAnimation(this.animationIndex)
		}
	}

	private createSpineBoy(startAnim = 'idle') {
		const spineBoy = this.add.spine(400, 600, SPINEBOY_KEY, startAnim, true)

		spineBoy.scaleX = 0.5
		spineBoy.scaleY = 0.5

		return spineBoy
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
		this.spineBoy.play(animation, true)
		this.frameText.setText(animation + "[ " + this.animationIndex + " ]")
	}
}
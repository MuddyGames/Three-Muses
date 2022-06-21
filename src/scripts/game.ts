import 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'

import SplashScene from './scenes/splashScene'
import PreloadScene from './scenes/preloadScene'
import ArtiFactOneScene from './scenes/artifactOneScene'
import ArtiFactTwoScene from './scenes/artifactTwoScene'
import ArtiFactThreeScene from './scenes/artifactThreeScene'
import ArtiFactFourScene from './scenes/artifactFourScene'
import Credits from './scenes/creditsScene'
import LEVEL_01 from './scenes/LEVEL_01'
import LEVEL_02 from './scenes/LEVEL_02'
import LEVEL_03 from './scenes/LEVEL_03'
import LEVEL_04 from './scenes/LEVEL_04'


const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config = {
  type: Phaser.WEBGL,
  dom: {
    createContainer: true
  },
  backgroundColor: '#FFFFFF',
  scale: {
    parent: 'three_muses_game',
    dom: {
      createContainer: true
    },
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, LEVEL_01, LEVEL_02, LEVEL_03, LEVEL_04, SplashScene, ArtiFactOneScene, ArtiFactTwoScene, ArtiFactThreeScene,ArtiFactFourScene, Credits],
 
  plugins: {
    scene: [{
      key: 'SpinePlugin',
      plugin: window.SpinePlugin,
      mapping: 'spine'
    }]
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 400
      }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
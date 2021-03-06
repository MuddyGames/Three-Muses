export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'PreloadScene'
    })
  }

  preload() {

    //Splash Screen
    this.load.image('truffles_splash', 'assets/splash/splash.png')

    //Artifact Pages and Scene Background
    this.load.image('artifact_scene_background', 'assets/artifacts/img/background.png')

    // Screen Vinnette
    this.load.image('vinnette', 'assets/level/vinnette.png')

    // Screen HUD
    this.load.image('hud_background', 'assets/level/hud_background.png')

    // Game Logos
    this.load.image('the_hunt_museum', 'assets/logos/the_hunt_museum.png')
    this.load.image('limerick_museum', 'assets/logos/limerick_city.png')
    this.load.image('limerick_gallery_of_art', 'assets/logos/LCGA.png')
    //this.load.image('SETU_Ireland_logo', 'assets/logos/SETU_Ireland_logo.png')
    this.load.image('SETU_Ireland_logo', 'assets/logos/SETU_Ireland_computing.png')

    // Church Bells
    this.load.audio('church_bells', ['assets/audio/level/church_bells.mp3', 'assets/audio/level/church_bells.ogg']);

    // Backing Tracks
    this.load.audio('splash_screen_track', ['assets/audio/splash/splash_screen_track.mp3', 'assets/audio/splash/splash_screen_track.ogg']);
    this.load.audio('level_backing_track', ['assets/audio/level/level_backing_track.mp3', 'assets/audio/level/level_backing_track.ogg']);
    this.load.audio('artifact_background', ['assets/audio/artifacts/artifact_background.mp3', 'assets/audio/artifacts/artifact_background.ogg']);

    //Rewards and Punishment
    this.load.audio('reward', ['assets/audio/level/reward.mp3', 'assets/audio/level/reward.ogg']);
    this.load.audio('punish_one', ['assets/audio/level/punish_one.mp3', 'assets/audio/level/punish_one.ogg']);
    this.load.audio('punish_two', ['assets/audio/level/punish_two.mp3', 'assets/audio/level/punish_two.ogg']);
    this.load.audio('revived', ['assets/audio/level/revived.mp3', 'assets/audio/level/revived.ogg']);
    this.load.audio('under_attack', ['assets/audio/level/under_attack.mp3', 'assets/audio/level/under_attack.ogg']);
    this.load.audio('reached_goal', ['assets/audio/level/reached_goal.mp3', 'assets/audio/level/reached_goal.ogg']);
    this.load.audio('bridge_open', ['assets/audio/level/bridge_opening.mp3', 'assets/audio/level/bridge_opening.ogg']);
    this.load.audio('water_splash', ['assets/audio/level/water_splash.mp3', 'assets/audio/level/water_splash.ogg']);

    // Idioms
    this.load.audio('a_boy_the_kid', ['assets/audio/idioms/a_boy_the_kid.mp3', 'assets/audio/idioms/a_boy_the_kid.ogg']);
    this.load.audio('come_here_i_want_ya', ['assets/audio/idioms/come_here_i_want_ya.mp3', 'assets/audio/idioms/come_here_i_want_ya.ogg']);
    this.load.audio('decent', ['assets/audio/idioms/decent.mp3', 'assets/audio/idioms/decent.ogg']);
    this.load.audio('dose', ['assets/audio/idioms/dose.mp3', 'assets/audio/idioms/dose.ogg']);
    this.load.audio('gawke', ['assets/audio/idioms/gawke.mp3', 'assets/audio/idioms/gawke.ogg']);
    this.load.audio('head_like_a_chewed_toffee', ['assets/audio/idioms/head_like_a_chewed_toffee.mp3', 'assets/audio/idioms/head_like_a_chewed_toffee.ogg']);
    this.load.audio('mup', ['assets/audio/idioms/mup.mp3', 'assets/audio/idioms/mup.ogg']);
    this.load.audio('sca', ['assets/audio/idioms/sca.mp3', 'assets/audio/idioms/sca.ogg']);
    this.load.audio('shades', ['assets/audio/idioms/shades.mp3', 'assets/audio/idioms/shades.ogg']);
    this.load.audio('sham', ['assets/audio/idioms/sham.mp3', 'assets/audio/idioms/sham.ogg']);
    this.load.audio('silent', ['assets/audio/idioms/silent.mp3', 'assets/audio/idioms/silent.ogg']);
    this.load.audio('state_of_ya', ['assets/audio/idioms/state_of_ya.mp3', 'assets/audio/idioms/state_of_ya.ogg']);
    this.load.audio('story', ['assets/audio/idioms/story.mp3', 'assets/audio/idioms/story.ogg']);
    this.load.audio('tackies', ['assets/audio/idioms/tackies.mp3', 'assets/audio/idioms/tackies.ogg']);
    this.load.audio('took_a_hopper', ['assets/audio/idioms/took_a_hopper.mp3', 'assets/audio/idioms/took_a_hopper.ogg']);
    this.load.audio('unreal', ['assets/audio/idioms/unreal.mp3', 'assets/audio/idioms/unreal.ogg']);
    this.load.audio('well_boi_whats_the_craic', ['assets/audio/idioms/well_boi_whats_the_craic.mp3', 'assets/audio/idioms/well_boi_whats_the_craic.ogg']);
    this.load.audio('well_kid', ['assets/audio/idioms/well_kid.mp3', 'assets/audio/idioms/well_kid.ogg']);
    this.load.audio('well_sham_any_sca', ['assets/audio/idioms/well_sham_any_sca.mp3', 'assets/audio/idioms/well_sham_any_sca.ogg']);
    this.load.audio('yurt', ['assets/audio/idioms/yurt.mp3', 'assets/audio/idioms/yurt.ogg']);
  }

  create() {
    this.scene.start('SplashScene')
  }
}
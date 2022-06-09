(()=>{"use strict";var e,s={818:(e,s,t)=>{t(260),t(127);class i extends Phaser.GameObjects.Text{constructor(e){super(e,10,10,"",{color:"black",fontSize:"28px"}),e.add.existing(this),this.setOrigin(0)}update(){this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`)}}class a extends Phaser.Physics.Arcade.Sprite{constructor(e,s,t,i){super(e,s,t,i),e.add.existing(this),e.physics.add.existing(this),this.setCollideWorldBounds(!0).setBounce(.6).setInteractive().on("pointerdown",(()=>{this.setVelocityY(-400)}))}}class o extends Phaser.Scene{constructor(){super({key:"SplashScene"}),this.timedEvents=[]}preload(){}create(){this.backingMusic=this.sound.add("splash_screen_track",{loop:!0}),this.backingMusic.play(),this.logo=new a(this,this.cameras.main.width/2,0,"the_hunt_museum"),this.timedEvents.push(this.time.delayedCall(2e3,this.onEventLogo,["limerick_museum"],this)),this.timedEvents.push(this.time.delayedCall(4e3,this.onEventLogo,["limerick_gallery_of_art"],this)),this.timedEvents.push(this.time.delayedCall(6e3,this.onEventLogo,["SETU_Ireland_logo"],this)),this.timedEvents.push(this.time.delayedCall(8e3,this.onEventGame,[],this)),this.fpsText=new i(this)}update(){}onEventLogo(e){this.logo.destroy(),this.logo=new a(this,this.cameras.main.width/2,0,e)}onEventGame(){this.logo.destroy(),this.scene.start("ArtiFactScene"),this.backingMusic.stop()}}class h extends Phaser.GameObjects.Text{constructor(e){super(e,10,50,"",{color:"black",fontSize:"28px"}),e.add.existing(this),this.setOrigin(0)}update(){}}class r extends Phaser.Physics.Arcade.Sprite{constructor(e,s,t){super(e,s,t,"cannon-ball"),e.add.existing(this),this.setDisplaySize(20,20)}update(){this.x+=10,this.setPosition(this.x,this.y)}}const n="truffles",l="orange",d="lemon",c="grape";class u extends Phaser.Scene{constructor(){super({key:"GameScene"}),this.animationNames=[],this.animationIndex=0,this.trufflesPosX=100,this.trufflesPosY=360,this.trufflesSpeed=2}preload(){this.load.image("tiles","assets/img/map_1.png"),this.load.image("hudTiles","assets/img/hud.png"),this.load.tilemapTiledJSON("level","assets/img/map_1.json"),this.load.setPath("assets/spine/"),this.load.spine(n,"truffles_all.json","truffles_all.atlas"),this.load.spine(l,"orange.json","orange.atlas"),this.load.spine(c,"grape.json","grape.atlas"),this.load.spine(d,"lemon.json","lemon.atlas")}create(){const e=this.make.tilemap({key:"level",tileWidth:32,tileHeight:32}),s=e.addTilesetImage("map_1","tiles"),t=e.addTilesetImage("hud","hudTiles");e.createLayer("map/ground/water",s,0,0).setDepth(0),e.createLayer("map/ground/ground",s,0,0).setDepth(0),e.createLayer("map/shadow 1",s,0,0).setDepth(1),e.createLayer("map/buildings/houses/house 2",s,0,0).setDepth(1),e.createLayer("map/buildings/houses/house 1",s,0,0).setDepth(1),e.createLayer("map/buildings/walls",s,0,0).setDepth(3),e.createLayer("map/buildings/church",s,0,0).setDepth(1),e.createLayer("map/buildings/castle",s,0,0).setDepth(3),e.createLayer("map/buildings/miselanious",s,0,0).setDepth(2),e.createLayer("map/move behind /wall top",s,0,0).setDepth(2),e.createLayer("map/move behind /Shadow 2",s,0,0).setDepth(2),e.createLayer("map/move behind /house roof/house roof 2",s,0,0).setDepth(2),e.createLayer("map/move behind /house roof/house roof 1",s,0,0).setDepth(2),e.createLayer("map/move behind /tower top",s,0,0).setDepth(2),e.createLayer("map/move behind /church roof",s,0,0).setDepth(2),e.createLayer("map/move behind /castle roof",s,0,0).setDepth(2),e.createLayer("map/move behind /miselanious top",s,0,0).setDepth(2),e.createLayer("hud",t,0,0).setDepth(2),this.frameText=new h(this),this.frameText.setDepth(5),this.ball=new r(this,this.cameras.main.width/2,0),this.ball.setDepth(2),this.backingMusic=this.sound.add("level_backing_track",{loop:!0}),this.backingMusic.play();const i="idle";this.truffles=this.createTruffles(i),this.truffles.setDepth(1),this.orange=this.createOrange(i),this.lemon=this.createLemon(i),this.grape=this.createGrape(i),this.frameText.setText(i),this.frameText.setText("idle[ "+this.animationIndex+" ]"),this.cursors=this.input.keyboard.createCursorKeys(),this.initializeAnimationsState(this.truffles),this.initializeAnimationsState(this.orange)}update(){this.frameText.update(),this.ball.update(),this.animationNames.length,Phaser.Input.Keyboard.JustDown(this.cursors.right)?(this.idiomCue=this.sound.add("a_boy_the_kid"),this.idiomCue.play(),this.changeAnimation(3)):Phaser.Input.Keyboard.JustDown(this.cursors.left)&&(this.idiomCue=this.sound.add("head_like_a_chewed_toffee"),this.idiomCue.play(),this.changeAnimation(2)),Phaser.Input.Keyboard.JustDown(this.cursors.up)?(this.idiomCue=this.sound.add("a_boy_the_kid"),this.idiomCue.play(),this.changeAnimation(4)):Phaser.Input.Keyboard.JustDown(this.cursors.down)&&(this.idiomCue=this.sound.add("head_like_a_chewed_toffee"),this.idiomCue.play(),this.changeAnimation(1)),this.cursors.right.isDown&&(this.trufflesPosX+=this.trufflesSpeed,this.truffles.setPosition(this.trufflesPosX,this.trufflesPosY)),this.cursors.left.isDown&&(this.trufflesPosX-=this.trufflesSpeed,this.truffles.setPosition(this.trufflesPosX,this.trufflesPosY)),this.cursors.up.isDown&&(this.trufflesPosY-=this.trufflesSpeed,this.truffles.setPosition(this.trufflesPosX,this.trufflesPosY)),this.cursors.down.isDown&&(this.trufflesPosY+=this.trufflesSpeed,this.truffles.setPosition(this.trufflesPosX,this.trufflesPosY)),this.cursors.down.isDown||this.cursors.up.isDown||this.cursors.left.isDown||this.cursors.right.isDown||this.changeAnimation(0)}createTruffles(e="idle"){const s=this.add.spine(100,360,n,e,!0);return s.scaleX=.25,s.scaleY=.25,s}createOrange(e="idle"){const s=this.add.spine(120,360,l,e,!0);return s.scaleX=.7,s.scaleY=.7,s}createGrape(e="idle"){const s=this.add.spine(80,360,c,e,!0);return s.scaleX=.7,s.scaleY=.7,s}createLemon(e="idle"){const s=this.add.spine(150,360,d,e,!0);return s.scaleX=.7,s.scaleY=.7,s}initializeAnimationsState(e){const s=e.getCurrentAnimation().name;e.getAnimationList().forEach(((e,t)=>{this.animationNames.push(e),e===s&&(this.animationIndex=t)}))}changeAnimation(e){const s=this.animationNames[e];this.truffles.play(s,!0),this.frameText.setText(s+"[ "+this.animationIndex+" ]")}}class p extends Phaser.Scene{constructor(){super({key:"PreloadScene"})}preload(){this.load.image("the_hunt_museum","assets/logos/the_hunt_museum.png"),this.load.image("limerick_museum","assets/logos/limerick_museum.png"),this.load.image("limerick_gallery_of_art","assets/logos/limerick_gallery_of_art.png"),this.load.image("SETU_Ireland_logo","assets/logos/SETU_Ireland_logo.png"),this.load.image("cannon-ball","assets/img/cannon-ball.png"),this.load.audio("splash_screen_track",["assets/audio/splash_screen_track.mp3","assets/audio/splash_screen_track.ogg"]),this.load.audio("level_backing_track",["assets/audio/level_backing-track.mp3","assets/audio/level_backing_track.ogg"]),this.load.audio("a_boy_the_kid",["assets/audio/idioms/a_boy_the_kid.mp3","assets/audio/idioms/a_boy_the_kid.ogg"]),this.load.audio("head_like_a_chewed_toffee",["assets/audio/idioms/head_like_a_chewed_toffee.mp3","assets/audio/idioms/head_like_a_chewed_toffee.ogg"])}create(){this.scene.start("SplashScene")}}class m extends Phaser.Scene{constructor(){super({key:"ArtiFactScene"}),this.timedEvents=[]}preload(){this.load.script("fractals","https://static.sketchfab.com/api/sketchfab-viewer-1.12.0.js"),this.load.html("test1","assets/html/test.html")}create(){this.element=this.add.dom(this.cameras.main.width/2,100).createFromCache("test1"),this.element.setPerspective(800),this.backingMusic=this.sound.add("splash_screen_track",{loop:!0}),this.backingMusic.play(),this.timedEvents.push(this.time.delayedCall(2e3,this.onEventGame,[],this))}update(){}onEventGame(){this.scene.start("GameScene"),this.backingMusic.stop()}}const f={type:Phaser.WEBGL,dom:{createContainer:!0},backgroundColor:"#ffffff",scale:{parent:"phaser-game",dom:{createContainer:!0},mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:1280,height:720},scene:[p,u,o,m],plugins:{scene:[{key:"SpinePlugin",plugin:window.SpinePlugin,mapping:"spine"}]},physics:{default:"arcade",arcade:{debug:!1,gravity:{y:400}}}};window.addEventListener("load",(()=>{new Phaser.Game(f)}))}},t={};function i(e){var a=t[e];if(void 0!==a)return a.exports;var o=t[e]={exports:{}};return s[e].call(o.exports,o,o.exports,i),o.exports}i.m=s,e=[],i.O=(s,t,a,o)=>{if(!t){var h=1/0;for(d=0;d<e.length;d++){for(var[t,a,o]=e[d],r=!0,n=0;n<t.length;n++)(!1&o||h>=o)&&Object.keys(i.O).every((e=>i.O[e](t[n])))?t.splice(n--,1):(r=!1,o<h&&(h=o));if(r){e.splice(d--,1);var l=a();void 0!==l&&(s=l)}}return s}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[t,a,o]},i.o=(e,s)=>Object.prototype.hasOwnProperty.call(e,s),(()=>{var e={179:0};i.O.j=s=>0===e[s];var s=(s,t)=>{var a,o,[h,r,n]=t,l=0;if(h.some((s=>0!==e[s]))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(n)var d=n(i)}for(s&&s(t);l<h.length;l++)o=h[l],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(d)},t=self.webpackChunkthree_muses_project=self.webpackChunkthree_muses_project||[];t.forEach(s.bind(null,0)),t.push=s.bind(null,t.push.bind(t))})();var a=i.O(void 0,[216],(()=>i(818)));a=i.O(a)})();
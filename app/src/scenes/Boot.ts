import keys from '../constants/keys';
import { load } from 'webfontloader';
export class BootScene extends Phaser.Scene {
  fontsReady: boolean;

  constructor () {
    super({ key: keys.scenes.BootScene });
    this.fontsReady = false;
    this.resizeGame();
  }

  fontsLoaded = () => {
    this.fontsReady = true;
  };

  preload () {
    this.load.path = '../assets/';
    this.load.image(keys.images.loaderBg, 'images/loader-bg.png');
    this.load.image(keys.images.loaderBar, 'images/loader-bar.png');
    this.load.image('dummyBottomCenter', 'images/dummy-bottom-right.png');
    this.load.atlas('mal01', 'spritesheets/mal01.png', 'atlases/mal01.json');
    this.load.atlas('grass01', 'spritesheets/grass01.png', 'atlases/grass01.json');

    this.load.image('tiles', 'spritesheets/grass01.png');
    this.load.tilemapTiledJSON('maps', 'tilesmap/maps.json');


    this.add.text(100, 100, 'Loading fonts...');
    load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    });
  }

  update () {
    if (this.fontsReady) {
      this.scene.start(keys.scenes.SplashScene);
    }
  }

  resizeGame () {
    window.addEventListener('resize', () => {
      this.scale.resize(window.innerWidth, window.innerHeight);
    });
  };
}

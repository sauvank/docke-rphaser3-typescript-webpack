import keys from '../constants/keys';
import { load } from 'webfontloader';
import { ImgSrv } from '../services/ImgServ';
import { configGO } from '../confGameObject/confGameObject';
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
      // this.physics.world.setBounds(0, 0, width, height, true, true, true, true);
      // this.cameras.main.setBounds(0, 0, width, height);
    });
  }


}

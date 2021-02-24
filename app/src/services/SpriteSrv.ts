import { ConfImg } from '../interfaces';
import { Helpers } from '../Helpers';
import { PosAndSize } from '../confGameObject/PosAndSize';
import { HelperGOSrv } from './HelperGOSrv';

/**
 * Todo duplicate code with img srv
 */
export class SpriteSrv extends Phaser.GameObjects.Sprite {
    private conf: ConfImg;
    private helper: Helpers;
    private graphic: Phaser.GameObjects.Graphics;
    private posAndSize: PosAndSize;

    constructor (scene: Phaser.Scene, conf: ConfImg) {
      super(scene, 0, 0, conf.texture, conf.frame);
      this.posAndSize = new PosAndSize(this.scene);
      this.conf = conf;
      this.helper = new Helpers(scene);
      this.graphic = scene.add.graphics();
      new HelperGOSrv(scene, this, conf);
      scene.add.existing(this);
    }
}

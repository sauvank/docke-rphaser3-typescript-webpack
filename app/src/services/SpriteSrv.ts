import { ConfImg, WH } from '../interfaces';
import { Helpers } from '../Helpers';
import { PosAndSize } from '../confGameObject/PosAndSize';
import { HelperGOSrv } from './HelperGOSrv';

/**
 * Todo duplicate code with img srv
 */
export class SpriteSrv extends Phaser.GameObjects.Sprite {
    private conf: ConfImg;
    public helper: Helpers;
    public helperGo: HelperGOSrv;
    private graphic: Phaser.GameObjects.Graphics;
    private posAndSize: PosAndSize;

    constructor (scene: Phaser.Scene, conf: ConfImg, referenceGo?: Phaser.GameObjects.Sprite |Phaser.GameObjects.Image | Phaser.Tilemaps.StaticTilemapLayer) {
      super(scene, 0, 0, conf.texture, conf.frame);
      this.posAndSize = new PosAndSize(this.scene);
      this.conf = conf;
      this.helper = new Helpers(scene);
      this.graphic = scene.add.graphics();
      this.helperGo = new HelperGOSrv(scene, this, conf, referenceGo);
      scene.add.existing(this);
    }
}

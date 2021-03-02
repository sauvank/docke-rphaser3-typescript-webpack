import { ConfImg, WH } from '../interfaces';
import { Helpers } from '../Helpers';
import { PosAndSize } from '../confGameObject/PosAndSize';

/**
 * Helper for function move and resize of game object.
 */
export class HelperGOSrv {
    private helper: Helpers;
    private gameObject: Phaser.GameObjects.Image;
    private scene: Phaser.Scene;
    private conf: ConfImg;
    private posAndSize: PosAndSize;
    private previousDim = { width: 0, height: 0 };
    private referenceGO?: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image| Phaser.Tilemaps.StaticTilemapLayer;

    constructor (scene: Phaser.Scene, gameObject: Phaser.GameObjects.Image, conf: ConfImg, referenceGo?: Phaser.GameObjects.Sprite |Phaser.GameObjects.Image | Phaser.Tilemaps.StaticTilemapLayer) {
      this.helper = new Helpers(scene);
      this.scene = scene;
      this.gameObject = gameObject;
      this.conf = conf;
      this.posAndSize = new PosAndSize(this.scene);

      if (referenceGo !== undefined) {
        this.setReferenceGo(referenceGo);
      }

      this.positionAndSize();
      this.resize();
    }

    public setReferenceGo (reference: Phaser.GameObjects.Sprite |Phaser.GameObjects.Image | Phaser.Tilemaps.StaticTilemapLayer) {
      this.referenceGO = reference;
    }

    /**
     * define the position of the game object from percentage X and Y.
     * @param xPercent
     * @param yPercent
     */
    public setPositionPercent (xPercent: number, yPercent: number): this {
      const parentSizes = this.getParentSize();
      const x = this.helper.percentFromReference(parentSizes.width, xPercent);
      const y = this.helper.percentFromReference(parentSizes.height, yPercent);

      this.gameObject.setPosition(x, y);
      return this;
    }

    /**
     * Set display size game object from width and height percent.
     * @param widthPercent
     * @param heightPercent
     */
    public setDisplaySizePercent (widthPercent: number, heightPercent: number): Phaser.GameObjects.Image {
      const parentSizes = this.getParentSize();
      const w = this.helper.percentFromReference(parentSizes.width, widthPercent);
      const h = this.helper.percentFromReference(parentSizes.height, heightPercent);

      if (this.conf.keepRatio !== undefined && !this.conf.keepRatio) {
        return this.gameObject.setDisplaySize(w, h);
      }

      const ratio = this.helper.calculateAspectRatioFit(this.gameObject.width, this.gameObject.height, w, h);
      return this.gameObject.setDisplaySize(ratio.width, ratio.height);
    }

    /**
     * Set position and size ogf the game object from conf.
     */
    public positionAndSize (isFromResize: boolean = false):void {
      const conf = this.posAndSize.getConf(this.conf);
      const origin = conf.origin ?? { x: 0.5, y: 0.5 };

      if (this.conf.newPositionWithResize === undefined || this.conf.newPositionWithResize || !isFromResize) {
        this.setPositionPercent(conf.x, conf.y);
      }
      this
        .setDisplaySizePercent('width' in conf ? conf.width : 0, 'height' in conf ? conf.height : 0)
        .setOrigin(origin.x, origin.y);
    }

    /**
     * Function call for each event resize.
     */
    public resize ():void {
      this.scene.scale.on('resize', (conf:WH, gameSize: WH, baseSize:WH, displaySize:WH, previousWidth:number, previousHeight:number) => {
        this.previousDim = { width: previousWidth, height: previousHeight };
        this.positionAndSize(true);
      }, this);
    }

    /**
     * todo refacto
     * get the width and height of the cancas.
     * @private
     */
    private getParentSize (): {width: number, height: number} {
      const canvas = this.scene.game.canvas;

      if (this.referenceGO === undefined) {
        return {
          width: canvas.width,
          height: canvas.height
        };
      }
      return {
        width: this.referenceGO.displayWidth,
        height: this.referenceGO.displayHeight
      };
    }
}

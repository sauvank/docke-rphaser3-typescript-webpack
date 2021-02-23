import { ConfImg } from '../interfaces';
import { Helpers } from '../Helpers';
import { PosAndSize } from '../confGameObject/PosAndSize';

export class ImgSrv extends Phaser.GameObjects.Image {
  private conf: ConfImg;
  private helper: Helpers;
  private graphic: Phaser.GameObjects.Graphics;

  constructor (scene: Phaser.Scene, conf: ConfImg) {
    super(scene, 0, 0, conf.texture, conf.frame);
    this.conf = new PosAndSize(this.scene).getConf(conf);
    this.helper = new Helpers(scene);
    this.graphic = scene.add.graphics();
    this.posAndSize();
    this.resize();
    scene.add.existing(this);
  }

  public setPositionPercent (xPercent: number, yPercent: number): this {
    const parentSizes = this.getParentSize();
    const x = this.helper.percentFromReference(parentSizes.width, xPercent);
    const y = this.helper.percentFromReference(parentSizes.height, yPercent);
    this.setPosition(x, y);
    return this;
  }

  public setDisplaySizePercent (widthPercent: number, heightPercent: number): this {
    const parentSizes = this.getParentSize();
    const w = this.helper.percentFromReference(parentSizes.width, widthPercent);
    const h = this.helper.percentFromReference(parentSizes.height, heightPercent);

    if (this.conf.keepRatio !== undefined && !this.conf.keepRatio) {
      return this.setDisplaySize(w, h);
    }

    const ratio = this.helper.calculateAspectRatioFit(this.width, this.height, w, h);
    this.setDisplaySize(ratio.width, ratio.height);
    return this;
  }

  public posAndSize () {
    const conf = new PosAndSize(this.scene).getConf(this.conf);
    const origin = conf.origin ?? { x: 0.5, y: 0.5 };
    this.setPositionPercent(conf.x, conf.y)
      .setDisplaySizePercent(conf.width, conf.height)
      .setOrigin(origin.x, origin.y);
  }

  private resize () {
    this.scene.scale.on('resize', function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
      this.posAndSize();
    }, this);
  }

  private haveParent ():boolean {
    // return this.parentContainer !== null;
    return false;
  }

  private getParentSize (): {width: number, height: number, x: number, y:number} {
    const canvas = this.scene.game.canvas;

    if (!this.haveParent()) {
      return {
        width: canvas.width,
        height: canvas.height,
        x: 0,
        y: 0
      };
    }

    const bounds = this.parentContainer.getBounds();
    return {
      width: bounds.width,
      height: bounds.height,
      x: this.parentContainer.x,
      y: this.parentContainer.y
    };
  }
}

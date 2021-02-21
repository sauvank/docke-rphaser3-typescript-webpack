import { ConfImg } from '../interfaces';
import { Helpers } from '../Helpers';
import { PosAndSize } from '../confGameObject/PosAndSize';

export class ImgSrv extends Phaser.GameObjects.Image {
  private conf: ConfImg;
  private helper: Helpers;
  constructor (scene: Phaser.Scene, conf: ConfImg) {
    super(scene, 0, 0, conf.texture, conf.frame);
    this.conf = new PosAndSize().getConf(conf);
    this.helper = new Helpers(scene);

    this.posAndSize();
    this.resize();
    scene.add.existing(this);
  }

  public setPositionPercent (xPercent: number, yPercent: number): this {
    const x = this.helper.percentFromCanvasWidth(xPercent);
    const y = this.helper.percentFromCanvasHeight(yPercent);
    this.setPosition(x, y);
    return this;
  }

  public setDisplaySizePercent (widthPercent: number, heightPercent: number): this {
    const w = this.helper.percentFromCanvasWidth(widthPercent);
    const h = this.helper.percentFromCanvasHeight(heightPercent);

    if (this.conf.keepRatio !== undefined && !this.conf.keepRatio) {
      return this.setDisplaySize(w, h);
    }

    const ratio = this.helper.calculateAspectRatioFit(this.width, this.height, w, h);
    this.setDisplaySize(ratio.width, ratio.height);
    return this;
  }

  private posAndSize () {
    const conf = new PosAndSize().getConf(this.conf);
    const origin = conf.origin ?? { x: 0.5, y: 0.5 };
    this.setPositionPercent(conf.x, conf.y)
      .setDisplaySizePercent(conf.width, conf.height)
      .setOrigin(origin.x, origin.y);
  }

  private resize () {
    window.addEventListener('resize', () => {
      this.posAndSize();
    });
  }
}

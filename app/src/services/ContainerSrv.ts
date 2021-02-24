import { ConfContainer } from '../interfaces';
import { PosAndSize } from '../confGameObject/PosAndSize';
import { Helpers } from '../Helpers';

export class ContainerSrv extends Phaser.GameObjects.Container {
  private conf: ConfContainer;
  private helper: Helpers;
  private graphic: Phaser.GameObjects.Graphics;
  private posAndSize: PosAndSize;
  constructor (scene: Phaser.Scene, conf:ConfContainer, children?: Phaser.GameObjects.GameObject[]) {
    super(scene, 0, 0, children);
    scene.add.existing(this);
    this.scene = scene;
    this.conf = conf;
    this.graphic = this.scene.add.graphics();
    this.posAndSize = new PosAndSize(this.scene);
    this.helper = new Helpers(scene);
    this.resize();
    this.setPositionPercent(conf.x, conf.y);
  }

  public getWidth (): number {
    return this.getBounds().width;
  }

  public getHeight (): number {
    return this.getBounds().height;
  }

  private resize () {
    this.scene.scale.on('resize', () => {
      const conf = this.posAndSize.getConf(this.conf);
      this.setPositionPercent(conf.x, conf.y);
    }, this);
  }

  // todo duplicate
  public setPositionPercent (xPercent: number, yPercent: number): this {
    const parentSizes = this.getParentSize();
    const x = this.helper.percentFromReference(parentSizes.width, xPercent);
    const y = this.helper.percentFromReference(parentSizes.height, yPercent);

    const origin = this.conf.origin ?? { x: 0.5, y: 0.5 };
    this.setPosition(x - (this.getWidth() / (100 / origin.x / 100)), y - (this.getHeight() / (100 / origin.y / 100)));
    this.setSize(this.getWidth(), this.getHeight());
    return this;
  }

  // todo duplicate
  private haveParent ():boolean {
    return this.parentContainer !== null;
  }

  // todo duplicate
  private getParentSize (): {width: number, height: number} {
    const canvas = this.scene.game.canvas;
    if (!this.haveParent()) {
      return {
        width: canvas.width,
        height: canvas.height
      };
    }

    const bounds = this.parentContainer.getBounds();
    return {
      width: bounds.width,
      height: bounds.height
    };
  }
}

import { ConfContainer } from '../interfaces';
import { PosAndSize } from '../confGameObject/PosAndSize';
import { Helpers } from '../Helpers';

export class ContainerSrv extends Phaser.GameObjects.Container {
  private conf: ConfContainer;
  private helper: Helpers;
  private graphic: Phaser.GameObjects.Graphics;
  constructor (scene: Phaser.Scene, conf:ConfContainer, children?: Phaser.GameObjects.GameObject[]) {
    super(scene, 0, 0, children);
    scene.add.existing(this);
    this.conf = conf;
    this.graphic = this.scene.add.graphics();
    this.helper = new Helpers(scene);
    this.resize();
    this.setPositionPercent(conf.x, conf.y);
    // @ts-ignore
    // children?.forEach((child:Phaser.GameObjects) => {
    //   if (child.posAndSize) {
    //     child.posAndSize();
    //   }
    // });
    this.debug();
  }

  public getWidth (): number {
    return this.getBounds().width;
  }

  public getHeight (): number {
    return this.getBounds().height;
  }

  public debug (color: number = 0xffff00): void {
    this.graphic.clear();
    this.graphic.fillStyle(color, 0.3);
    this.graphic.fillRect(this.x, this.y, this.getBounds().width, this.getBounds().height);
  }

  private resize () {
    window.addEventListener('resize', () => {
      const conf = new PosAndSize().getConf(this.conf);
      this.setPositionPercent(conf.x, conf.y);
      this.debug();
    });
  }

  // todo duplicate
  public setPositionPercent (xPercent: number, yPercent: number): this {
    const parentSizes = this.getParentSize();
    const x = this.helper.percentFromReference(parentSizes.width, xPercent);
    const y = this.helper.percentFromReference(parentSizes.height, yPercent);

    const origin = this.conf.origin ?? { x: 0.5, y: 0.5 };
    this.setPosition(x - (this.getWidth() / (100 / origin.x / 100)), y - (this.getHeight() / (100 / origin.y / 100)));
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

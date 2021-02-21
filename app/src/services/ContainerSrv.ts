export class ContainerSrv extends Phaser.GameObjects.Container {
  constructor (scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
    super(scene, x, y, children);
    scene.add.existing(this);
    this.debug()
    // this.setSize(this.getBounds().width, this.getBounds().height);
  }

  public getWidth (): number {
    return this.getBounds().width;
  }

  public getHeight (): number {
    return this.getBounds().height;
  }

  public debug (color: number = 0xffff00): void {
    const graphics2 = this.scene.add.graphics();
    graphics2.lineStyle(1, color, 0.2);
    graphics2.fillStyle(color, 0.5);
    graphics2.fillRect(this.x, this.y, this.getWidth(), this.getHeight());
  }
}

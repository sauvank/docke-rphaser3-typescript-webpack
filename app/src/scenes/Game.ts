import keys from '../constants/keys';
import { configGO } from '../confGameObject/confGameObject';
import { ImgSrv } from '../services/ImgSrv';
import { ContainerSrv } from '../services/ContainerSrv';

export class GameScene extends Phaser.Scene {
  private graphic: Phaser.GameObjects.Graphics;
  private dummy3: ImgSrv;
  private container: ContainerSrv;

  constructor () {
    super({
      key: keys.scenes.GameScene,
      physics: {
        default: 'arcade',
        // arcade: {
        //   gravity: { y: 0 },
        //   debug: true
        // }
      }
    });
  }

  init (data: Object) {
    console.log(`Scene ${keys.scenes.GameScene} passed data`, data);
  }

  preload () {
    this.graphic = this.add.graphics();

    const dummy = new ImgSrv(this, configGO.game.dummy);
    this.dummy3 = new ImgSrv(this, configGO.game.dummy);
    const dummy2 = new ImgSrv(this, configGO.game.dummy2);
    const container = new ContainerSrv(this, configGO.game.container, [dummy, dummy2]);
    this.container = container;
    this.input.enableDebug(container, 0xffff00);

    window.addEventListener('resize', () => {
      this.showGrid();
    });
  }

  create () {
    this.showGrid();
  }

  update () {
  }

  public showGrid () {
    this.graphic.clear();
    for (let i = 1; i < 10; i++) {
      const color = i === 5 ? 0xff0000 : 0xffff0;
      this.graphic.fillStyle(color, 0.5)
        .fillRect(this.game.canvas.width * (i * 10) / 100, 0, 1, this.game.canvas.height)
        .fillRect(0, this.game.canvas.height * (i * 10) / 100, this.game.canvas.width, 1)
        .setDepth(1);
    }
  }
}

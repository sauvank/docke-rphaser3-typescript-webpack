import keys from '../../constants/keys';
import { configGO } from '../../confGameObject/confGameObject';
import { Scene } from '../Scene';
import { Player } from '../../prefabs/Player';
import {ContainerSrv} from "../../services/ContainerSrv";

export class Move extends Scene {
  constructor () {
    super({
      key: keys.scenes.ExampleMove,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true
        }
      }
    });
  }

  init (data: Object) {
    super.init(data);
  }

  create () {
    const map = this.make.tilemap({ key: 'maps' });
    const tileset = map.addTilesetImage('grass01', 'tiles');
    const platforms = map.createStaticLayer('level1', tileset, 0, 0);

    // Keep ratio after resize
    const nSize = this.helper?.calculateAspectRatioFit(platforms.width, platforms.height, window.innerWidth, window.innerHeight);
    platforms.setScale(nSize.width / platforms.width, nSize.height / platforms.height);
    const player = new Player(this, configGO.example.move.mal, platforms);

    window.addEventListener('resize', () => {
      // get the value in percentage of the position x with respect to the tilemap.
      const xP = 100 - this.helper?.getPercentOfValue(platforms.displayWidth, player.x);
      const yP = 100 - this.helper?.getPercentOfValue(platforms.displayHeight, player.y);

      // Keep ratio after resize
      const nSize = this.helper?.calculateAspectRatioFit(platforms.width, platforms.height, window.innerWidth, window.innerHeight);
      platforms.setScale(nSize.width / platforms.width, nSize.height / platforms.height);

      player.helperGo.setPositionPercent(xP, yP);
      player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(platforms.x, platforms.y, platforms.displayWidth, platforms.displayHeight));

    });

    player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(platforms.x, platforms.y, platforms.displayWidth, platforms.displayHeight));
  }

  update () {
    super.update();
  }
}

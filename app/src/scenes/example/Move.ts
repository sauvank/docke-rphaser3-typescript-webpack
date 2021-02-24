import keys from '../../constants/keys';
import { ImgSrv } from '../../services/ImgSrv';
import { configGO } from '../../confGameObject/confGameObject';
import { ContainerSrv } from '../../services/ContainerSrv';
import { Scene } from '../Scene';
import { SpriteSrv } from '../../services/SpriteSrv';

export class Move extends Scene {
  constructor () {
    super({ key: keys.scenes.ExampleMove });
  }

  init (data: Object) {
    super.init(data);
  }

  create () {
    const mal = new SpriteSrv(this, configGO.example.move.mal);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('mal01', {
        prefix: 'male01-',
        suffix: '.png',
        start: 0,
        end: 2,
        zeroPad: 0,
      }),
      frameRate: 8,
      repeat: -1
    });
    mal.play('walk');

    this.add.group([
      { key: 'grass01', frame: 0, repeat: 10, setXY: { x: 32, y: 148, stepX: 32 } }
    ]);
  }

  update () {
    super.update();
  }
}

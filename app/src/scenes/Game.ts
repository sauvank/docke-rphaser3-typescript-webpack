import keys from '../constants/keys';
import { Scene } from './Scene';

export class GameScene extends Scene {
  constructor () {
    super({
      key: keys.scenes.GameScene,
      physics: {
        default: 'arcade'
      }
    });
  }

  init (data: Object) {
    super.init(data);
  }

  preload () {
  }

  create () {
    this.scene.start(keys.scenes.ExampleImgContainer);
  }

  update () {
  }
}

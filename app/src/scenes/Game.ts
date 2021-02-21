import keys from '../constants/keys';
import { configGO } from '../confGameObject/confGameObject';
import { ImgSrv } from '../services/ImgSrv';
import {ContainerSrv} from "../services/ContainerSrv";

export class GameScene extends Phaser.Scene {
  constructor () {
    super({
      key: keys.scenes.GameScene
    });
  }

  init (data: Object) {
    console.log(`Scene ${keys.scenes.GameScene} passed data`, data);
  }

  preload () {
    const dummy = new ImgSrv(this, configGO.game.dummy);
    const dummy2 = new ImgSrv(this, configGO.game.dummy2);
    const container = new ContainerSrv(this, 50, 0, [dummy, dummy2])
  }

  create () {
  }

  update () {
  }
}

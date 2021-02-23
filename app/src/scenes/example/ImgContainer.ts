import keys from '../../constants/keys';
import { ImgSrv } from '../../services/ImgSrv';
import { configGO } from '../../confGameObject/confGameObject';
import { ContainerSrv } from '../../services/ContainerSrv';
import { Scene } from '../Scene';

export class ImgContainer extends Scene {
  constructor () {
    super({ key: keys.scenes.ExampleImgContainer });
  }

  init (data: Object) {
    super.init(data);
  }

  create () {
    const dummy = new ImgSrv(this, configGO.example.imgContainer.dummy);
    const dummy2 = new ImgSrv(this, configGO.example.imgContainer.dummy2);
    new ContainerSrv(this, configGO.example.imgContainer.container, [dummy, dummy2]);

    this.debugSrv?.resizeGameEvent();
  }

  update () {
    super.update();
  }
}

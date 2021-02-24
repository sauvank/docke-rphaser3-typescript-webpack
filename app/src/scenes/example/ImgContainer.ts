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

    this.debugSrv?.resizeGameEvent([
      { width: this.scale.game.canvas.width, height: this.scale.game.canvas.height, title: 'base' },
      { width: 992, height: this.scale.game.canvas.height, title: 'PC MD' },
      { width: 768, height: this.scale.game.canvas.height, title: 'Tablet' },
      { width: 592, height: this.scale.game.canvas.height, title: 'mobile' }
    ]);
  }

  update () {
    super.update();
  }
}

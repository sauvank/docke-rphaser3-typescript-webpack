import { ImgSrv } from './ImgSrv';
import { ConfBtn } from '../interfaces';

export class BtnService extends ImgSrv {
    private framePointerdown: string | number = 0;
    private framePointerup: string | number = 0;
    private framePointerover: string | number = 0;
    constructor (scene: Phaser.Scene, conf: ConfBtn, referenceGo?: Phaser.GameObjects.Sprite |Phaser.GameObjects.Image | Phaser.Tilemaps.StaticTilemapLayer) {
        super(scene, conf, referenceGo);

        if (conf.frames) {
            this.framePointerdown = conf.frames?.pointerdown || 0;
            this.framePointerup = conf.frames?.pointerup || 0;
            this.framePointerover = conf.frames?.pointerover || 0;
        }
        this.setInteractive();
    }

    public pointerEvent (event: 'down'|'over'|'up', fnc: any = () => {}, keyBoardKey?: string) {
        this.on(`pointer${event}`, () => {
            this.setFrame(this[`framePointer${event}`]);
            fnc();
        });

        if (keyBoardKey) {
            this.scene.input.keyboard.on(keyBoardKey, fnc, this);
        }
        return this;
    }
}

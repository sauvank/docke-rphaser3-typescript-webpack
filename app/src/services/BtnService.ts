import { ImgSrv } from './ImgSrv';
import { ConfBtn } from '../interfaces';

export class BtnService extends ImgSrv {
    private framePointerdown: string | number = 0;
    private framePointerup: string | number = 0;
    private framePointerover: string | number = 0;
    constructor (scene: Phaser.Scene, conf: ConfBtn, referenceGo?: Phaser.GameObjects.Sprite |Phaser.GameObjects.Image | Phaser.Tilemaps.StaticTilemapLayer) {
        super(scene, conf, referenceGo);

        this.framePointerdown = conf.frames?.pointerdown || conf.frame || 0;
        this.framePointerup = conf.frames?.pointerup || conf.frame || 0;
        this.framePointerover = conf.frames?.pointerover || conf.frame || 0;

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

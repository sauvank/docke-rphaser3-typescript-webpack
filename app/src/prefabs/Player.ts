import { SpriteSrv } from '../services/SpriteSrv';
import { ConfImg } from '../interfaces';

export class Player extends SpriteSrv {
  private lastDirection?: 'up'| 'down' | 'left' | 'right';
  private direction?: 'up'| 'down' | 'left' | 'right';

  constructor (scene: Phaser.Scene, conf:ConfImg, referenceGo?: Phaser.GameObjects.Sprite |Phaser.GameObjects.Image | Phaser.Tilemaps.StaticTilemapLayer) {
    super(scene, conf, referenceGo);
    this.createAnimWalk();
    this.scene.physics.world.enable(this);
    this.controls();
  }

  createAnimWalk () {
    const walksConfig = {
      down: { start: 0, end: 2 },
      idle_down: { start: 1, end: 1 },

      up: { start: 9, end: 11 },
      idle_up: { start: 10, end: 10 },

      left: { start: 3, end: 5 },
      idle_left: { start: 4, end: 4 },

      right: { start: 6, end: 8 },
      idle_right: { start: 7, end: 7 }
    };

    for (const conf in walksConfig) {
      // @ts-ignore
      const baseConf = this.getBaseConf(walksConfig[conf].start, walksConfig[conf].end);
      this.createAnim(`walk_${conf}`, baseConf);
    }
  }

  private getBaseConf (start: 0, end: 0) {
    return {
      frames: this.scene.anims.generateFrameNames('mal01', {
        prefix: 'male01-',
        suffix: '.png',
        start: start,
        end: end,
        zeroPad: 0
      }),
      frameRate: 8,
      repeat: -1
    };
  }

  private createAnim (key: string, conf: {frames:Phaser.Types.Animations.AnimationFrame[], frameRate: number, repeat: number}) {
    this.scene.anims.create({
      key: key,
      frames: conf.frames,
      frameRate: conf.frameRate,
      repeat: conf.repeat
    });
  }

  private play (key: string, ignoreIfPlaying?: boolean, startFrame?: integer): this {
    if (this.lastDirection === this.direction) {
      return this;
    }

    this.direction = this.lastDirection;
    return super.play(key, ignoreIfPlaying, startFrame);
  }

  private controls () {
    const cursors = this.scene.input.keyboard.createCursorKeys();
    const self: Player = this;

    this.scene.events.on('update', function () {
      if (cursors === undefined) {
        return;
      }

      if (cursors.left.isDown) {
        self.play('walk_left');
        self.lastDirection = 'left';
        self.setPosition(self.x += -1, self.y);
      } else if (cursors.right.isDown) {
        self.lastDirection = 'right';
        self.setPosition(self.x -= -1, self.y);
        self.play('walk_right');
      } else if (cursors.up.isDown) {
        self.lastDirection = 'up';
        self.play('walk_up');
        self.setPosition(self.x, self.y -= 1);
      } else if (cursors.down.isDown) {
        self.lastDirection = 'down';
        self.play('walk_down');
        self.setPosition(self.x, self.y += 1);
      } else {
        self.lastDirection = null;
        self.play(`walk_idle_${self.direction}`);
      }
    }, self);
  }
}

export class DebugSrv {
    private scene: Phaser.Scene;
    private graphicsGrid: Phaser.GameObjects.Graphics;

    constructor (scene: Phaser.Scene) {
      this.scene = scene;
      this.graphicsGrid = scene.add.graphics().setDepth(1);

      this.resize();
      this.resizeFunctions();
    }

    private resizeFunctions () {
      this.showGrid();
    }

    private resize () {
      this.scene.scale.on('resize', function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
        this.resizeFunctions();
      }, this);
    }

    public showGrid () {
      this.graphicsGrid.clear();
      for (let i = 1; i < 10; i++) {
        const color = i === 5 ? 0xff0000 : 0xffff0;
        const canvas = this.scene.game.canvas;
        this.graphicsGrid.fillStyle(color, 0.5)
          .fillRect(canvas.width * (i * 10) / 100, 0, 1, canvas.height)
          .fillRect(0, canvas.height * (i * 10) / 100, canvas.width, 1);
      }
    }

    public resizeGameEvent () {
      const canvas = this.scene.game.canvas;
      this.scene.time.addEvent({
        delay: 1,
        loop: true,
        callback: () => {
          this.scene.scale.resize(canvas.width -= 1, canvas.height -= 1);
          if (canvas.width <= 400) {
            this.scene.scale.resize(window.innerWidth, window.innerHeight);
          }
        },
        callbackScope: this
      });
    }
}

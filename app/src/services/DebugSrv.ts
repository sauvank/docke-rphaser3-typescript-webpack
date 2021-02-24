export class DebugSrv {
    private scene: Phaser.Scene;
    private graphicsGrid: Phaser.GameObjects.Graphics;

    constructor (scene: Phaser.Scene) {
      this.scene = scene;
      this.graphicsGrid = scene.add.graphics().setDepth(1);

      this.resize();
      this.resizeFunctions();
    }

    /**
     * All function call for each resize of the page.
     * @private
     */
    private resizeFunctions () {
      this.showGrid();
    }

    private resize () {
      this.scene.scale.on('resize', () => {
        this.resizeFunctions();
      }, this);
    }

    /**
     * Show line X every 10% of the page.
     */
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

    /**
     * Resize game every X second.
     * @param resize, array object contain all dimension for resize the game.
     * @param delay, delay to call resize function.
     */
    public resizeGameEvent (resize: {width: number, height: number, title?: string}[], delay:number = 3000) {
      const text = this.scene.add.text(0, 0, '', { color: 'red', fontSize: 40 });
      let ite = 0;
      this.scene.time.addEvent({
        delay,
        loop: true,
        callback: () => {
          this.scene.scale.resize(resize[ite].width, resize[ite].height);
          text.setText(`${resize[ite].width}px, ${resize[ite].height}px - ${resize[ite].title || ''}`);
          ite - 1 < 0 ? ite = resize.length - 1 : ite -= 1;
        },
        callbackScope: this
      });
    }
}

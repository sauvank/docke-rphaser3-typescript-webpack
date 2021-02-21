export class Helpers {
    private scene:Phaser.Scene;

    constructor (scene:Phaser.Scene) {
      this.scene = scene;
    }

    public random (min:number, max:number, floatBetween = false):number {
      return floatBetween ? Phaser.Math.FloatBetween(min, max) : Phaser.Math.Between(min, max);
    }

    /**
     * Calcule the percent of x from the canvas width
     * @param percent
     */
    percentFromCanvasWidth (percent:number):number {
      return this.scene.game.canvas.width * percent / 100;
    }

    /**
     * Calcule the percent of x from the canvas height
     * @param percent
     */
    percentFromCanvasHeight (percent:number):number {
      return this.scene.game.canvas.height * percent / 100;
    }

    /**
     * Return percentage form value.
     * @param ref
     * @param percent
     */
    percentFromReference (ref: number, percent:number) {
      return ref * percent / 100;
    }

    /**
     * Resize game object with option for keep ratio image.
     * @param gameObject, elements to resize.
     * @param mxWidth, new width for the game object
     * @param mxHeight, new width for the game object
     * @param keepRatio,default true, true for keep ratio image
     */
    resize (gameObject:Phaser.GameObjects.Image|Phaser.GameObjects.Sprite, mxWidth: number, mxHeight:number, keepRatio: boolean = true) {
      let width = mxWidth;
      let height = mxHeight;

      if (keepRatio) {
        const ratio = this.calculateAspectRatioFit(gameObject.width, gameObject.height, mxWidth, mxHeight);
        width = ratio.width;
        height = ratio.height;
      }

      gameObject.setDisplaySize(width, height);
    }

    /**
     * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
     * images to fit into a certain area.
     *
     * @param {Number} srcWidth width of source image
     * @param {Number} srcHeight height of source image
     * @param {Number} maxWidth maximum available width
     * @param {Number} maxHeight maximum available height
     * @return {Object} { width, height }
     */
    calculateAspectRatioFit (srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {
      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
      return { width: srcWidth * ratio, height: srcHeight * ratio };
    }
}

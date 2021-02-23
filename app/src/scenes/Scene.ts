import { Helpers } from '../Helpers';
import { DebugSrv } from '../services/DebugSrv';

export class Scene extends Phaser.Scene {
    protected helper: Helpers | undefined;
    protected debugSrv: DebugSrv | undefined;
    private config:Phaser.Types.Scenes.SettingsConfig;
    constructor (config: Phaser.Types.Scenes.SettingsConfig) {
      super(config);
      this.config = config;
    }

    public init (data: object) {
      this.helper = new Helpers(this);
      this.debugSrv = new DebugSrv(this);
      this.resizeFunctions();
      this.resize();
      console.log(`Scene ${this.config.key} passed data`, data);
    }

    public create () {

    }

    public update () {

    }

    private resizeFunctions () {
    }

    private resize () {
      window.addEventListener('resize', () => {
        this.resizeFunctions();
      });
    }
}

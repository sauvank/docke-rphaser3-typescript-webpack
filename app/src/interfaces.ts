export interface GameWindow extends Window {
  game: Phaser.Game;
  cordova: Object;
}

export interface CordovaApp {
  initialize: () => void;
  onDeviceReady: () => void;
  receivedEvent: (id: string) => void;
}

export interface ControlsScheme {
  left: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
}

export interface ConfImg{
  x: number ;
  y: number;
  width: number;
  height: number;
  texture: string;
  frame?: string | integer;
  origin?: {x:number, y:number};
  keepRatio?: boolean;
  devices ?: {
    tablet ?: DevicesOrientation,
    mobile ?: DevicesOrientation
    }
  }

export interface ConfContainer{
  x: number ;
  y: number;
  origin?: {x:number, y:number};
  devices ?: {
    tablet ?: DevicesOrientation,
    mobile ?: DevicesOrientation
  }
}
export interface ConfImgOption extends ConfImg{
  x?: number ;
  y?: number;
  width?: number;
  height?: number;
  texture?: string;
}

export interface DevicesOrientation{
  landscape?: ConfImgOption,
  portrait?: ConfImgOption
}

export interface ConfigGO{
  game : {
    dummy : ConfImg
    dummy2 : ConfImg,
    container: ConfContainer
  }
}

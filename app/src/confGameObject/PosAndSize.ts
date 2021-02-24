import { configGO } from './confGameObject';
import { ConfImg } from '../interfaces';

export class PosAndSize {
  private scene: Game.Scene;
  private canvas: any;
  private breakPoints: { md: number; lg: number };

  constructor (scene:Phaser.Scene) {
    this.scene = scene;
    this.canvas = this.scene.game.canvas;
    this.breakPoints = {
      md: 768,
      lg: 992
    };
  }

  public getConf (conf:ConfImg): ConfImg {
    console.log('----------------------------------------');
    console.log('is PC ', this.isDesktop() && this.canvas.width >= this.breakPoints.lg);
    console.log('is tablet', this.isLandscape(), this.isTablet() || this.canvas.width >= this.breakPoints.md);
    console.log('is mobile', this.isLandscape(), this.isMobile() || this.canvas.width < this.breakPoints.md);
    console.log('conf', conf);
    console.log('----------------------------------------');

    if (this.isDesktop() && this.canvas.width >= this.breakPoints.lg) {
      return conf;
    }

    if (this.isTablet() || this.canvas.width >= this.breakPoints.md) {
      if (this.isLandscape() && conf.devices?.tablet?.landscape) {
        return {
          ...conf,
          ...conf.devices?.tablet?.landscape
        };
      }

      return {
        ...conf,
        ...conf.devices?.tablet?.portrait
      };
    }

    if (this.isMobile() || this.canvas.width < this.breakPoints.md) {
      if (this.isLandscape() && conf.devices?.mobile?.landscape) {
        return {
          ...conf,
          ...conf.devices?.mobile?.landscape
        };
      }

      return {
        ...conf,
        ...conf.devices?.mobile?.portrait
      };
    }

    return conf;
  }

  public getDeviceType (): 'tablet'|'mobile'|'desktop' {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return 'mobile';
    }
    return 'desktop';
  }

  public isMobile (): boolean {
    return this.getDeviceType() === 'mobile';
  }

  public isTablet (): boolean {
    return this.getDeviceType() === 'tablet';
  }

  public isDesktop (): boolean {
    return this.getDeviceType() === 'desktop';
  }

  public isLandscape (): boolean {
    return !this.isPortrait();
  }

  public isPortrait (): boolean {
    return window.matchMedia('(orientation: portrait)').matches;
  }
}

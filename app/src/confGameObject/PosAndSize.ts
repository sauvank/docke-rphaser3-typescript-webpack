import { configGO } from './confGameObject';
import { ConfImg } from '../interfaces';

export class PosAndSize {
  public getConf (conf:ConfImg): ConfImg {
    if (this.isDesktop()) {
      return conf;
    }

    if (this.isMobile()) {
      if (this.isLandscape() && conf.devices?.mobile?.landscape) {
        return {
          ...conf,
          ...conf.devices?.mobile?.landscape
        };
      }
      if (this.isPortrait() && conf.devices?.mobile?.portrait) {
        return {
          ...conf,
          ...conf.devices?.mobile?.landscape
        };
      }
    }

    if (this.isTablet()) {
      if (this.isLandscape() && conf.devices?.tablet?.landscape) {
        return {
          ...conf,
          ...conf.devices?.tablet?.landscape
        };
      }
      if (this.isPortrait() && conf.devices?.tablet?.portrait) {
        return {
          ...conf,
          ...conf.devices?.tablet?.portrait
        };
      }
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

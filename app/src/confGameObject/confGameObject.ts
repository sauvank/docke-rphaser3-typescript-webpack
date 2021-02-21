import { ConfigGO } from '../interfaces';

export const configGO: ConfigGO = {
  game: {
    dummy: {
      x: 50,
      y: 100,
      width: 50,
      height: 10,
      texture: 'dummyBottomCenter',
      origin: { x: 0.5, y: 1 },
      devices: {
        tablet: {
          portrait: {
            width: 100,
            y: 10,
            x: 30
          }
        }
      }
    },

    dummy2: {
      x: 0,
      y: 0,
      width: 25,
      height: 50,
      texture: 'dummyBottomCenter',
      origin: { x: 0, y: 0 },
    }
  }
};

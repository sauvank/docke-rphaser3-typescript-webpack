import { ConfigGO } from '../interfaces';

export const configGO: ConfigGO = {
  example: {
    imgContainer: {
      dummy: {
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        keepRatio: false,
        texture: 'dummyBottomCenter',
        origin: { x: 0.5, y: 0.5 },
        devices: {
          tablet: {
            portrait: {
              width: 50
            }
          }
        }
      },

      dummy2: {
        x: 0,
        y: 5,
        width: 10,
        height: 20,
        keepRatio: false,
        texture: 'dummyBottomCenter',
        origin: { x: 5, y: 1.5 }
      },
      container: {
        x: 50,
        y: 100,
        origin: { x: 0, y: 0.5 }
      }
    }
  }
};

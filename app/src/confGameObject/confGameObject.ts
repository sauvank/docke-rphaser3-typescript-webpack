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
          mobile: {
            portrait: {
              width: 50
            }
          },
          tablet: {
            portrait: {
              width: 80
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
        origin: { x: 5, y: 1.5 },
        devices: {
          tablet: {
            portrait: {
              y: 0,
              origin: { x: 0.5, y: 0.5 }
            }
          },
          mobile: {
            portrait: {
              origin: { x: -1.5, y: -0 }
            }
          }
        }
      },
      container: {
        x: 50,
        y: 100,
        origin: { x: 0, y: 0.5 }
      }
    },
    move: {
      grass: {
        x: 0,
        y: 0,
        width: 5,
        height: 5,
        keepRatio: true,
        texture: 'grass01',
        frame: '[A]Grass1-Grass3_pipo-0.png',
        origin: { x: 0, y: 0 }
      },
      mal: {
        x: 50,
        y: 50,
        width: 10,
        height: 10,
        texture: 'mal01',
        frame: 'male01-0.png',
        origin: { x: -0, y: 0 }
      }
    }

  }
};

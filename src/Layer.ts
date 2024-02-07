import { IShapeStyle, IRenderContext, Pixel, Bounds } from './types';
import { MapenElement } from './Element';

export interface IDataParams {
  path?: any;
  radius?: number;
  loc?: any;
  style?: IShapeStyle;
  extra?: any;
  [other: string]: any;
}

export interface IExtendImageData extends ImageData {
  bitmap?: ImageBitmap;
}

export class Layer extends MapenElement {
  constructor() {
    super();
    this.type = 'layer';
  }

  protected offscreen: boolean = false;
  offscreenAlpha: number = 1;
  offscreenCanvas: HTMLCanvasElement = null;
  // offScreenImgData: ImageBitmap = null
  offScreenImg: IExtendImageData = null;

  protected renderBounds: number[][] = [];
  protected dataChangedFlag: boolean = false;

  async render(rctx?: IRenderContext) {
    this.eachChildren(ele => {
      ele.render(rctx);
    });
    return super.render(rctx);
  }

  contain(pos: Pixel) {
    let result = false;
    this.eachChildren(ele => {
      if (ele.contain(pos)) {
        result = true;
        return false;
      }
    });
    return result;
  }

  protected makeBounds(): Bounds {
    let min: Pixel = [0, 0],
      max: Pixel = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
    this.eachChildren(ele => {
      min[0] = Math.min(min[0], ele.bounds[0][0]);
      min[1] = Math.min(min[1], ele.bounds[0][1]);
      max[0] = Math.max(max[0], ele.bounds[1][0]);
      max[1] = Math.max(max[1], ele.bounds[1][1]);
    });
    return [min, max];
  }
}

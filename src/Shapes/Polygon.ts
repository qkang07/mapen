import { Pixel, IShapeStyle, IRenderContext, Bounds } from '../types';
import windingLine from '../Utils/windingLine';
import { MapenElement } from '../Element';
import { makePolyBounds } from '../Utils';

const EPSILON = 1e-8;

function isAroundEqual(a, b) {
  return Math.abs(a - b) < EPSILON;
}

export class Polygon extends MapenElement {
  path: Pixel[] = [];
  h3Index: string = '';

  offImgSize: Pixel;

  constructor(path: Pixel[], style?: IShapeStyle) {
    super();
    this.path = path;
    this.type = 'polygon';
    this.style = Object.assign({}, this.style, style);
    // this.setStyle(style)
  }
  async customRender(rctx: IRenderContext, renderStyle: IShapeStyle) {
    let ctx = rctx.ctx;
    ctx.fillStyle = renderStyle.fillColor;
    ctx.strokeStyle = renderStyle.strokeColor;
    ctx.lineWidth = renderStyle.strokeWidth;

    ctx.globalAlpha = renderStyle.opacity || 1;
    ctx.beginPath();

    for (let i = 0; i < this.path.length; i++) {
      let p = this.path[i];
      ctx.lineTo(...p);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  contain(pos: Pixel) {
    // console.log(pos, this.path)
    let x = pos[0],
      y = pos[1];
    var w = 0;
    let points = this.path;
    var p = points[0];

    if (!p) {
      return false;
    }

    for (var i = 1; i < points.length; i++) {
      var p2 = points[i];
      w += windingLine(p[0], p[1], p2[0], p2[1], x, y);
      p = p2;
    }

    // Close polygon
    var p0 = points[0];
    if (!isAroundEqual(p[0], p0[0]) || !isAroundEqual(p[1], p0[1])) {
      w += windingLine(p[0], p[1], p0[0], p0[1], x, y);
    }

    return w !== 0;
  }

  protected makeBounds(): Bounds {
    return makePolyBounds(this.path);
  }
}

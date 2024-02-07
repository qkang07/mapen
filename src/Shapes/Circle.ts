import { IRenderContext, Bounds, IShapeStyle, Pixel } from '../types';
import { mapDistance } from '../Utils';
import { MapenElement } from '../Element';

export class Circle extends MapenElement {
  center: Pixel;
  radius: number;
  constructor(center: Pixel, radius: number, style?: IShapeStyle) {
    super();
    this.type = 'circle';
    this.center = center;
    this.radius = radius;
    this.style = Object.assign({}, this.style, style);
    // this.setStyle(style)
  }
  async customRender(rctx: IRenderContext, renderStyle: IShapeStyle) {
    const { ctx } = rctx;

    ctx.fillStyle = renderStyle.fillColor;
    ctx.strokeStyle = renderStyle.strokeColor;
    ctx.lineWidth = renderStyle.strokeWidth;
    ctx.globalAlpha = renderStyle.opacity || 1;

    ctx.beginPath();

    ctx.arc(this.center[0], this.center[1], this.radius, 0, 2 * Math.PI);

    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  contain(pos: Pixel) {
    let [x, y] = pos;
    return mapDistance(pos, this.center) < this.radius;
  }
  protected makeBounds(): Bounds {
    return [
      [this.center[0] - this.radius, this.center[1] - this.radius],
      [this.center[0] + this.radius, this.center[1] + this.radius],
    ];
  }
}

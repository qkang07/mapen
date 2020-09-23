import { LngLat, IShapeStyle, IRenderContext, Bounds } from "../index.d";
import windingLine from '../Utils/windingLine';
import { MapElement } from '../MapElement';
import { makePolyBounds } from '../Utils';


const EPSILON = 1e-8;

function isAroundEqual(a, b) {
    return Math.abs(a - b) < EPSILON;
}

export class Polygon extends MapElement  {
    path: LngLat[] = []
    pixelPath: LngLat[] = []
    h3Index: string = ''
    
    offImgSize: LngLat

    constructor(path: LngLat[], style?: IShapeStyle) {
        super()
        this.type='polygon'
        this.path = path
        this.style = Object.assign({}, this.style, style)
        // this.setStyle(style)
    }
    async render(rctx:IRenderContext):Promise<ImageBitmap|void>{
        let ctx = rctx.ctx
        ctx.fillStyle = this.style.fillColor
        ctx.strokeStyle = this.style.strokeColor
        ctx.lineWidth = this.style.strokeWeight
        if (this.style.opacity) {
            ctx.globalAlpha = this.style.opacity
        }
        ctx.beginPath()

        for (let i = 0; i < this.path.length; i++){
            let p = this.path[i]
            let pixel = this.view.lnglatToPixel(p)
            let screenPos: LngLat = [pixel.x, pixel.y]
            this.pixelPath.push(screenPos)
            ctx.lineTo(pixel.x,pixel.y)
            
        }
        
        ctx.fill()
        ctx.stroke()
        return super.render(rctx)
    }
    contain(pos:LngLat) {
        let x= pos[0], y = pos[1]
        var w = 0;
        let points = this.pixelPath
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

    protected makeBounds():Bounds{
        return makePolyBounds(this.path)
    }
}

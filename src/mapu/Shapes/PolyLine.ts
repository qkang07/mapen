import { LngLat, IShapeStyle, IRenderContext, Bounds } from "../index.d";
import { MapElement } from '../MapElement';
import { makePolyBounds } from '../Utils';
export class Line extends MapElement {
    path: LngLat[] = []
    containerPath: LngLat[] = []
    pixelPath: LngLat[] = []

    constructor(path: LngLat[], style?: IShapeStyle) {
        super()
        this.type = 'line'
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
        ctx.stroke()
        return super.render(rctx)

    }
    contain(pos:LngLat){
        return false
    }
    protected makeBounds():Bounds{
        return makePolyBounds(this.path)
    }
}
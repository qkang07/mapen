import { LngLat, IShapeStyle, IRenderContext, Bounds } from "../../index";
import { MapElement } from '../MapElement';
import { makePolyBounds } from '../Utils';
export class Line extends MapElement {
    path: LngLat[] = []
    containerPath: LngLat[] = []
    pixelPath: LngLat[] = []

    constructor(path: LngLat[], style?: IShapeStyle) {
        super()
        this.path = path
        this.type = 'line'
        this.style = Object.assign({}, this.style, style)
        // this.setStyle(style)
    }

    async customRender(rctx:IRenderContext, renderStyle:IShapeStyle) {
        let ctx = rctx.ctx
        ctx.fillStyle = renderStyle.fillColor
        ctx.strokeStyle = renderStyle.strokeColor
        ctx.lineWidth = renderStyle.strokeWidth
        ctx.globalAlpha = renderStyle.opacity || 1
       
        ctx.beginPath()

        for (let i = 0; i < this.path.length; i++){
            let p = this.path[i]
            let pixel = this.view.lnglatToPixel(p)
            let screenPos: LngLat = [pixel.x, pixel.y]
            this.pixelPath.push(screenPos)
            ctx.lineTo(pixel.x,pixel.y)
            
        }
        ctx.stroke()

    }
    contain(pos:LngLat){
        return false
    }
    protected makeBounds():Bounds{
        return makePolyBounds(this.path)
    }
}
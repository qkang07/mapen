import { IShapeStyle, IRenderContext, Bounds, Pixel } from "../types";
import { MapenElement } from '../Element';
import { makePolyBounds } from '../Utils';
export class Line extends MapenElement {
    path: Pixel[] = []

    constructor(path: Pixel[], style?: IShapeStyle) {
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
            ctx.lineTo(p[0],p[1])
        }
        ctx.stroke()

    }
    contain(pos:Pixel){
        return false
    }
    protected makeBounds():Bounds{
        return makePolyBounds(this.path)
    }
}
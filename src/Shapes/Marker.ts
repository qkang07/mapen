import { distance } from '../Utils';
import { IShapeStyle, IRenderContext, IFillImage, Bounds, Pixel } from "../types";
import { MapenElement } from '../Element';

export class Marker extends MapenElement {
    pos: Pixel
    scale?:(zoom:number)=>number
    
    constructor(pos: Pixel, style?: IShapeStyle) {
        super()
        this.type = 'marker'
        this.pos = [...pos]
        this.style = Object.assign({},this.style, style)
    }
    async customRender(rctx:IRenderContext, renderStyle:IShapeStyle) {
        if(!this.visible){
            return null
        }
        let ctx = rctx.ctx
        ctx.fillStyle = renderStyle.fillColor
        ctx.strokeStyle = renderStyle.strokeColor
        ctx.lineWidth = renderStyle.strokeWidth
        ctx.globalAlpha = renderStyle.opacity || 1
        if(renderStyle.fillImage){
            let height = renderStyle.fillImage.height || renderStyle.fillImage.imgData.height as number
            let width = renderStyle.fillImage.width || renderStyle.fillImage.imgData.width as number
            ctx.drawImage(renderStyle.fillImage.imgData, this.pos[0] - (width / 2), this.pos[1] - (height / 2),width, height)
        } else {
            ctx.beginPath()
            ctx.arc(...this.pos, renderStyle.strokeWidth, 0, 2 * Math.PI)
            ctx.stroke()
        }

    }
    contain(pos:Pixel){
        return this.visible && distance(pos, this.pos) < this.style.strokeWidth
    }

    protected makeBounds():Bounds{
        return null
        
    }
}

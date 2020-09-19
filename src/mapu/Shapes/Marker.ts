import { Shape } from "./Shape";
import { ShapeType, LngLat, IShapeStyle, IRenderContext, IFillImage } from "../Models";
import { MapElement } from '../MapElement';

export class Marker extends MapElement {
    shape: ShapeType = 'mark'
    location: LngLat
    image:IFillImage
    
    constructor(location: LngLat, style?: IShapeStyle, image?:IFillImage) {
        super()
        this.location = location
        this.style = Object.assign({},this.style, style)
        this.image = image
    }

    async render(rctx:IRenderContext):Promise<ImageBitmap|void> {
        let ctx = rctx.ctx
        ctx.fillStyle = this.style.fillColor
        ctx.strokeStyle = this.style.strokeColor
        ctx.lineWidth = this.style.strokeWeight
        if (this.style.opacity) {
            ctx.globalAlpha = this.style.opacity
        }
        let pixel = this.view.lnglatToPixel(this.location)
        if(this.image){
            let height = this.image.height || this.image.imgData.height as number
            let width = this.image.width || this.image.imgData.width as number
            ctx.drawImage(this.image.imgData, pixel.x - (width / 2), pixel.y - (height / 2))
        } else {
            ctx.beginPath()
            ctx.arc(pixel.x, pixel.y, this.style.strokeWidth, 0, 2 * Math.PI)
            ctx.stroke()
        }
        return super.render(rctx)

    }
}

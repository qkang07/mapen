import { distance } from '@/Utils';
import { LngLat, IShapeStyle, IRenderContext, IFillImage, Bounds, Pixel } from "../../index";
import { MapElement } from '../MapElement';

export class Marker extends MapElement {
    location: LngLat
    image:IFillImage
    pixel:Pixel = {x:0,y:0}
    
    constructor(location: LngLat, style?: IShapeStyle, image?:IFillImage) {
        super()
        this.type = 'marker'
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
        let pixel:Pixel = this.view.lnglatToPixel(this.location)
        this.pixel = pixel
        if(this.image){
            let height = this.image.height || this.image.imgData.height as number
            let width = this.image.width || this.image.imgData.width as number
            ctx.drawImage(this.image.imgData, pixel.x - (width / 2), pixel.y - (height / 2),width, height)
        } else {
            ctx.beginPath()
            ctx.arc(pixel.x, pixel.y, this.style.strokeWidth, 0, 2 * Math.PI)
            ctx.stroke()
        }
        return super.render(rctx)

    }
    contain(pos:LngLat, pixel:Pixel){
        return distance(pixel, this.pixel) < this.style.strokeWidth
    }

    protected makeBounds():Bounds{
        return null
        
    }
}

import { LngLat, IRenderContext, Bounds, IShapeStyle } from "../../index";
import { mapDistance } from '../Utils';
import { MapElement } from '../MapElement';

export class Circle extends MapElement {
    center: LngLat
    radius: number
    constructor(center: LngLat, radius: number, style?: IShapeStyle) {
        super()
        this.type='circle'
        this.center = center
        this.radius = radius
        this.style = Object.assign({},this.style, style)
        // this.setStyle(style)
    }
    async render(rctx:IRenderContext) :Promise<ImageBitmap|void> {
        const {ctx} = rctx
        let style = this.style

        ctx.fillStyle = style.fillColor
        ctx.strokeStyle = style.strokeColor
        ctx.lineWidth = style.strokeWidth
     
        ctx.beginPath()
        
        // let center = this.map.lngLatToContainer(new AMap.LngLat(shape.center[0], shape.center[1]))
        let centerPixel = this.view.lnglatToPixel(this.center)
       
        // 计算一个比例，将实际距离转换为页面距离。由于纬度是均匀的，使用纬度
        let loc1 = this.center
        let p1 = centerPixel
        let loc2:LngLat = this.center.map(v => v) as LngLat
        if (loc2[1] >= 89) {
            loc2[1] -= 1
        } else {
            loc2[1] +=1
        }
        
        let p2 = this.view.lnglatToPixel(loc2)
        let locDistance = mapDistance(loc1,loc2)
        let pDistance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
        let ratio = pDistance / locDistance

        let r = this.radius * ratio
      
        ctx.arc(centerPixel.x, centerPixel.y, r, 0, 2 * Math.PI)

        ctx.closePath()
        ctx.stroke()
        ctx.fill()
        return super.render(rctx)
    }
    contain(pos:LngLat) {
        let [x,y ]= pos
        return mapDistance(pos, this.center) < this.radius
    }
    protected makeBounds():Bounds{
        return [
            [this.center[0]-this.radius, this.center[1]-this.radius],
            [this.center[0]+this.radius, this.center[1]+this.radius]
        ]
    }
}

import { Marker } from '@/Shapes/Marker';
import { distance } from '@/Utils';
import { IRenderContext, IShapeStyle, Pixel } from 'index';
import { Layer } from '../Layer';


class GroupMarker extends Marker {
  
    markers:Marker[] = []
    offset:Pixel= {x:0,y:0}
    numOffset:Pixel = {x:0,y:0}


    textStyle:{
        fontSize:number
        color:string
    } = {
        fontSize:16,
        color:'black'
    }
    

    constructor(marker:Marker){
        super(marker.location, marker.style,marker.image)
        this.pixel = marker.pixel

    }

    async render(rctx:IRenderContext):Promise<ImageBitmap|void> {
        
        let ctx = rctx.ctx
      
        if (this.style.opacity) {
            ctx.globalAlpha = this.style.opacity
        }
        let pixel:Pixel = this.pixel
      
        if(this.image){
            let height = this.image.height || this.image.imgData.height as number
            let width = this.image.width || this.image.imgData.width as number
            ctx.drawImage(this.image.imgData, pixel.x - (width / 2) + this.offset.x , pixel.y - (height / 2),width + this.offset.y , height )
        } 

        let num = this.markers.length.toString()
       
        ctx.font = `${this.textStyle.fontSize}px`
        ctx.fillStyle = this.textStyle.color
        let textMeasure = ctx.measureText(num)
        textMeasure.width
        ctx.fillText(num,pixel.x - textMeasure.width /2 + this.offset.x, pixel.y - this.textStyle.fontSize / 2 + this.offset.y)

        // return super.render(rctx)
        return null

    }
}

export class MarkerLayer extends Layer {
    protected groupedMarkers:GroupMarker[] = []

    groupThreshold:number = 0
    
    canMerge?:(m1:Marker, m2:Marker, zoom:number)=>boolean 

    beforeRender:(gm:GroupMarker)=>any

    async render(rctx?: IRenderContext ) {
        let gmarkers:GroupMarker[] = []
        let markers: Marker[] = []
        this.eachChildren((ele:Marker)=>{
            let minDist = Number.MAX_VALUE
            let nearMarker: Marker = null
            ele.pixel = this.view.lnglatToPixel(ele.location)

            const checkMerge = (m:Marker) => {
                let gm = m as GroupMarker
                if(this.canMerge){

                    if(gm.markers){
                        if(gm.markers.find(om=>!this.canMerge(ele, om, this.view.zoomLevel))){
                            return
                        }
                    } else {
                        if(!this.canMerge(ele,m, this.view.zoomLevel)){
                            return
                        }
                    }
                }
                let dist = distance(ele.pixel, m.pixel)
                if(dist<minDist){
                    minDist = dist
                    nearMarker = m
                }
            }

            gmarkers.forEach(checkMerge)
            markers.forEach(checkMerge)
            if(minDist < this.groupThreshold && nearMarker){
                let gm:GroupMarker = nearMarker as GroupMarker
                gm.setView(this.view)
                gm.parent = this
                if(gm.markers){
                    gm.markers.push(ele)
                    ele.visible = false
                } else {
                    gm = new GroupMarker(ele)
                    gm.markers.push(ele)
                    gm.markers.push(nearMarker)
                    nearMarker.visible = false
                    ele.visible = false
                    markers.splice(markers.indexOf(nearMarker))
                    gmarkers.push(gm)
                }
            } else {
                markers.push(ele)
            }


            // ele.render(rctx)
        })

        gmarkers.forEach(m=>{
            if(this.beforeRender){
                this.beforeRender(m)
            }
            m.render(rctx)
        })
        markers.forEach(m=>{
            m.render(rctx)
        })


        return super.render(rctx)
    }
    addChildren(el:Marker){
        if(el instanceof Marker){
            super.addChildren(el)
        } else {
            console.warn('marker layer can only add marker')
        }
    }
}
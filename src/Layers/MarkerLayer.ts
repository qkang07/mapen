import { Marker } from '../Shapes/Marker';
import { distance } from '../Utils';
import { IRenderContext, IShapeStyle, Pixel } from '../../index';
import { Layer } from '../Layer';
import { MapElement } from '../MapElement';


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
        super(marker.location, marker.style)
        this.pixel = marker.pixel
        this.type = 'groupmarker'

    }

    async customRender(rctx:IRenderContext, renderStyle:IShapeStyle) {
        
        let ctx = rctx.ctx
        ctx.globalAlpha = renderStyle.opacity || 1
      
       
        let pixel:Pixel = this.pixel
      
        if(renderStyle.fillImage){
            let height = renderStyle.fillImage.height || renderStyle.fillImage.imgData.height as number
            let width = renderStyle.fillImage.width || renderStyle.fillImage.imgData.width as number
            // console.log(renderStyle.fillImage)
            ctx.drawImage(renderStyle.fillImage.imgData, pixel.x - (width / 2) + this.offset.x , pixel.y - (height / 2), width , height )
        } 

        let num = this.markers.length.toString()
        // console.log(num, 'group num')
        ctx.font = `${this.textStyle.fontSize}px Arial`
        // console.log(ctx.font)

        ctx.fillStyle = this.textStyle.color
        let textMeasure = ctx.measureText(num)
        ctx.fillText(num,pixel.x - textMeasure.width /2 + this.offset.x + this.numOffset.x , pixel.y  + this.offset.y + this.numOffset.y)

    }
}

export class MarkerLayer extends Layer {
    protected groupedMarkers:GroupMarker[] = []
    protected originMarkers:Marker[] = []

    groupThreshold:number = 0
    
    canMerge?:(m1:Marker, m2:Marker, zoom:number)=>boolean 

    beforeRender:(gm:GroupMarker)=>any

    eachChildren(cb:(item:MapElement) => boolean|void){
        for(let m of this.groupedMarkers){
            let flag = cb(m)
            if(flag === false){
                break
            }
        }
        for(let m of this.originMarkers){
            let flag = cb(m)
            if(flag === false){
                break
            }
        }
    }


    async render(rctx?: IRenderContext ) {
        let gmarkers:GroupMarker[] = []
        let markers: Marker[] = []
        super.eachChildren((ele:Marker)=>{
            let minDist = Number.MAX_VALUE
            let nearMarker: Marker = null
            ele.pixel = this.view.lnglatToPixel(ele.location)
            ele.visible = true
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
            if( minDist < this.groupThreshold && nearMarker){
                let gm:GroupMarker = nearMarker as GroupMarker
                gm.view = this.view
                gm.parent = this
                if(gm.markers){
                    gm.markers.push(ele)
                    ele.visible = false
                } else {
                    gm = new GroupMarker(ele)
                    gm.markers.push(ele)
                    gm.markers.push(nearMarker)

                    gm.on('click',()=>{
                        let map = this.view.map
                        let zoom = map.getZoom()
                        map.setZoomAndCenter(zoom +1, gm.location)
                    })

                    nearMarker.visible = false
                    ele.visible = false
                    markers.splice(markers.indexOf(nearMarker),1)
                    gmarkers.push(gm)
                }
            } else {
                markers.push(ele)
            }

        })
        this.groupedMarkers = gmarkers
        this.originMarkers = markers
        markers.forEach(m=>{
            m.render(rctx)
        })
        gmarkers.forEach(m=>{
            if(this.beforeRender){
                this.beforeRender(m)
            }
            // console.log(m)
            m.render(rctx)
        })

    }
    addChildren(el:Marker){
        if(el instanceof Marker){
            super.addChildren(el)
        } else {
            console.warn('marker layer can only add marker')
        }
    }
}
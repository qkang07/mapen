import {nanoid} from 'nanoid'
import { MapView } from './MapView'
import { IShapeStyle, Bounds, LngLat, IRenderContext, ITile, ElementType, Pixel } from '../index.d'
import { isShape, zoomLevels } from './Utils'
import { SortedMap } from './Utils/sortedMap'
import { MapEvent } from './Models'
import { EventManager } from './Utils/eventManager'

class RankLayer {
    zIndex: number
    elements:{[key:string]:MapElement} = {}
    constructor(zIndex){
        this.zIndex = zIndex
    }
}

export abstract class MapElement {
    id:string = nanoid()
    name?:string
    
    private childrenCollection: SortedMap<RankLayer> = new SortedMap()
    private zIndex:number = 0

    parent: MapElement
    type: ElementType

    protected eventManager:EventManager<MapEvent> = new EventManager()

    listeners:Map<string,((ev:MapEvent)=>any)[]> = new Map()
    visible:boolean = true

    tiles:ITile[] = []

    dataset:any = {}
    view:MapView
    style:IShapeStyle = {
        strokeColor:'transparent',
        strokeWidth:1
    }

    // this is a key property
    private _preRender?: boolean = false

    get preRender(){return this._preRender}
    set preRender(val){
        this._preRender = val
        if(val && !this.canvas){
            this.canvas = document.createElement('canvas')
            this.canvas.height = 1000
            this.canvas.width = 1000
        }
    }
    protected canvas?: HTMLCanvasElement | OffscreenCanvas
    protected bitmap:ImageBitmap
    bounds:Bounds

    constructor(){
       
    }

    async render(rctx:IRenderContext): Promise<ImageBitmap|void> {
        let renderStyle:IShapeStyle = JSON.parse(JSON.stringify(this.style))
        if(this.style.fillImage){
            renderStyle.fillImage.imgData = this.style.fillImage.imgData
        }
        if(this.beforeRender){
            if(this.beforeRender(renderStyle) === false){
                return
            }
        }

        if(this.customRender){
            this.customRender(rctx, renderStyle)
        }
        if(rctx.offScreen){
            let data = rctx.ctx.getImageData(0,0,this.canvas.width, this.canvas.height)
            let bitmap = await createImageBitmap(data)          
            return bitmap  
        }
        return null
    }

    beforeRender:(style:IShapeStyle)=> any

    abstract contain(pos:LngLat, pix?:Pixel):boolean
    protected  customRender?(rctx:IRenderContext, renderStyle:IShapeStyle):any

    addChildren(el:MapElement){
        el.parent = this
        el.view = this.view
        let layer = this.childrenCollection.get(el.zIndex)
        if(!layer){
            layer = new RankLayer(el.zIndex)
            this.childrenCollection.set(el.zIndex, layer)
        }
        layer.elements[el.id] = el
        if(this.view){

            this.view.render()
        }
    }
    setChildren(els:MapElement[]){
        this.childrenCollection.forEach(l=>{
            l.elements = {}
        })
        els.forEach(ele=>{
            this.addChildren(ele)
        })
    }
    clear(repaint:boolean = true){
        this.childrenCollection.forEach(l=>{l.elements={}})
        if(this.view && repaint){

            this.view.render()
        }
    }
    setZIndex(zIndex:number){
        if(this.parent){
            let originCollection = this.parent.childrenCollection.get(this.zIndex)
            if(originCollection){
                delete originCollection.elements[this.id]
            }
            this.zIndex = zIndex
            let newCollection = this.parent.childrenCollection.get(this.zIndex)
            if(!newCollection){
                newCollection = new RankLayer(zIndex)
                this.parent.childrenCollection.set(zIndex, newCollection)
            }
            newCollection.elements[this.id] = this
        }
    }
    getZIndex(){return this.zIndex}

    setView(view:MapView){
        this.view = view
        view.render()
    }

    eachChildren(cb:(item:MapElement) => boolean|void, reverse?:boolean){
        this.childrenCollection.forEach(layer=>{
            let keys = Object.keys(layer.elements)
            for(let key of keys){
                let flag = cb(layer.elements[key])
                if(flag === false){
                    return false
                }
            }
        },reverse)
    }

    on(eventName:string, handler: (ev:MapEvent)=>any){
        this.eventManager.on(eventName, handler)
    }
    off(eventName:string, handler?:(ev:MapEvent)=>any){
       
        this.eventManager.off(eventName, handler)

    }
    trigger(eventName:string,ev:MapEvent){
        const triggerSelf = ()=>{
            return this.eventManager.trigger(eventName, ev,ev=>{
                ev.mapElement = this
            })
        }
        // 如果是layer节点，先看子节点有没有触发事件
        if(this.type === 'layer'){
            let triggerFlag = false
            this.eachChildren(c=>{
                if(c.trigger(eventName, ev)){
                    triggerFlag = true
                    return false
                }
            },true)
            if(triggerFlag){
                triggerSelf()
                return true
            }
        } else if(this.contain(ev.pos,{x:ev.offsetX, y:ev.offsetY})){
            return triggerSelf()
        }
        return false
        
    }

    protected abstract makeBounds():Bounds

    protected renderOffScreen(){
        if(isShape(this)){
        }
    }

    protected async renderSingle(z:number, x:number, y:number){
        let span = zoomLevels[z]
        let bounds:Bounds = [[span*x, span*y], [span*(x+1),span*(y+1)]]
        this.canvas.height = 1000
        this.canvas.width = 1000
        let ctx = this.canvas.getContext('2d')
        let data = await this.render({
            mapBounds:bounds,
            ctx,
            offScreen:true
        })
        this.bitmap = data as ImageBitmap
    }


}
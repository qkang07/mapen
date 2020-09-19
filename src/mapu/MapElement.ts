import {nanoid} from 'nanoid'
import { MapView } from './MapView'
import { IShapeStyle, Bounds, LngLat, MapEvent, IRenderContext } from './Models'
import { zoomLevels } from './Utils'
import { SortedMap } from './Utils/sortedMap'

class RankLayer {
    zIndex: number
    elements:{[key:string]:MapElement} = {}
    constructor(zIndex){
        this.zIndex = zIndex
    }
}

export class MapElement {
    id:string = nanoid()
    name?:string
    
    private childrenCollection: SortedMap<RankLayer> = new SortedMap()
    private zIndex:number = 0

    parent: MapElement
    type:'layer'|'circle'|'line'|'marker'|'polygon'|'shape'
    listeners:Map<string,((ev:MapEvent)=>any)[]> = new Map()
    visible:boolean = true

    dataset:any = {}
    view:MapView
    style:IShapeStyle = {
        
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
    protected bounds:Bounds

    constructor(view?:MapView){
        if(view){
            this.view = view
        }
        
    }

    async render(rctx:IRenderContext): Promise<ImageBitmap|void> {

        if(rctx.offScreen){
            let data = rctx.ctx.getImageData(0,0,this.canvas.width, this.canvas.height)
            let bitmap = await createImageBitmap(data)          
            return bitmap  
        }
        return null
    }

    contain(pos:LngLat){
        return false
    }
    addChildren(el:MapElement){
        el.parent = this
        let layer = this.childrenCollection.get(el.zIndex)
        if(!layer){
            layer = new RankLayer(el.zIndex)
            this.childrenCollection.set(el.zIndex, layer)
        }
        layer.elements[el.id] = el
        this.view.render()
    }
    setChildren(els:MapElement[]){
        this.childrenCollection.forEach(l=>{
            l.elements = {}
        })
        els.forEach(ele=>{
            this.addChildren(ele)
        })
    }
    clear(){
        this.childrenCollection.forEach(l=>{l.elements={}})
        this.view.render()
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

    eachChildren(cb:(item:MapElement) => boolean|void){
        this.childrenCollection.forEach(layer=>{
            let keys = Object.keys(layer.elements)
            for(let key of keys){
                let flag = cb(layer.elements[key])
                if(flag === false){
                    break
                }
            }
        })
    }

    on(eventName:string, handler: (ev:MapEvent)=>any){
        let evList =this.listeners.get(eventName)
        if(!evList){
            evList = []
            this.listeners.set(eventName, evList)
        }
        if(evList.indexOf(handler)<0){
            evList.push(handler)
        }
    }
    off(eventName:string, handler?:(ev:MapEvent)=>any){
        let evList =this.listeners.get(eventName)
        if(evList){
            if(handler){
                let index = evList.indexOf(handler)
                if(index>=0){
                    evList.splice(index,1)
                }
            }else {
                this.listeners.delete(eventName)
            }
        }
    }
    trigger(eventName:string,ev:MapEvent){
        const triggerSelf = ()=>{
            let evList =this.listeners.get(eventName)
            if(evList){
                evList.forEach(h=>h(ev))
            }
        }
        // 如果是layer节点，先看子节点有没有触发事件
        if(this.type === 'layer'){
            let triggerFlag = false
            this.eachChildren(c=>{
                if(c.trigger(eventName, ev)){
                    triggerFlag = true
                    return false
                }
            })
            if(triggerFlag){
                triggerSelf()
                return true
            }
        } else if(this.contain([ev.x, ev.y])){
            triggerSelf()
            return true
        }
        return false
        
    }

    protected makeBounds():Bounds{
        if(this.type == 'layer'){

        }
        return null
    }

    protected renderOffScreen(){

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
import { LngLat, IShapeStyle, IMapEventListener, EventType, IRenderContext, Bounds } from "../../index.d";
import {MapEvent} from './Models'
import { MapElement } from './MapElement';
import { MapView } from '.';



export interface IDataParams {
    path?: any
    radius?:  number
    loc?: any
    style?: IShapeStyle
    extra?: any
    [other:string]:any
}

export interface IExtendImageData extends ImageData{
    bitmap?: ImageBitmap
}

export class Layer extends MapElement {

    constructor(view:MapView){
        super(view)
        this.type = 'layer'
    }
    
    protected offscreen: boolean = false
    offscreenAlpha:number = 1
    offscreenCanvas: HTMLCanvasElement = null
    // offScreenImgData: ImageBitmap = null
    offScreenImg: IExtendImageData = null

    protected renderBounds: number[][] = []
    protected dataChangedFlag:boolean = false

    setOffScreen(val: boolean, alpha?: number) {
        this.offscreen = val
        if (val) {
            if (!this.offscreenCanvas) {
                this.offscreenCanvas = document.createElement('canvas')
            }
            console.log(alpha, typeof alpha)
            if (alpha !== undefined && typeof alpha == 'number') {
                this.offscreenAlpha = alpha
            }
        } else {
            this.offscreenCanvas = null
        }
    }

    setPreRender(val: boolean, alpha?:number) {
        this.preRender = val
        if (val) {
            this.setOffScreen(true, alpha)
        } 
    }

    async render(rctx?: IRenderContext ) {
        this.eachChildren(ele=>{
            ele.render(rctx)
        })
        return super.render(rctx)
    }

    contain(pos:LngLat){
        let result = false
        this.eachChildren(ele=>{
            if(ele.contain(pos)){
                result = true
                return false
            }
        })
        return result
    }

    protected makeBounds():Bounds{
        let min:LngLat = [180,90], max:LngLat=[-180,-90]
        this.eachChildren(ele=>{
            min[0] = Math.min(min[0],ele.bounds[0][0])
            min[1] = Math.min(min[1],ele.bounds[0][1])
            max[0] = Math.max(max[0],ele.bounds[1][0])
            max[1] = Math.max(max[1],ele.bounds[1][1])
        })
        return [min,max]
    }
  
}
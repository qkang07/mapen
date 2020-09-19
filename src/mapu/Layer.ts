import { ShapeType, LngLat, IShapeStyle, IMapEventListener, EventType, MapEvent, IRenderContext } from "./Models";
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
  
}
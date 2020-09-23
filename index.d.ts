export declare interface IShapeStyle {
    fillColor?: string // 多边形填充颜色
    strokeWidth?: number // 线条宽度
    strokeColor?: string // 线条颜色
    opacity?: number
    [other: string]: any
}

export declare interface IFillImage {
    imgData?: CanvasImageSource
    height?:number
    width?:number
}
export declare interface ICanvasEvent {
    isEvent: boolean
    type: 'hover' | 'click'
    loc: { x: number, y: number }
}

export declare interface IRenderContext{
    ctx?: CanvasRenderingContext2D |OffscreenCanvasRenderingContext2D
    event?: MapEvent
    retina?: boolean
    canvas?: HTMLCanvasElement |OffscreenCanvas
    mapBounds?: [any, any]
    callByMap?: boolean
    fullRender?:boolean
    zoomLevel?:number
    offScreen?:boolean
}

export declare interface ITile{
    key:string
    x?:number
    y?:number
    resolution?:number
    data?:ImageBitmap
    bounds?:Bounds
}



export declare interface IPromiseCallback{
    resolve:Function
    reject:Function
}

export declare type LngLat = [number, number]

export declare type Bounds = [LngLat, LngLat]





export declare class MapEvent extends MouseEvent {
    extData:any
    static create(mouseEv: MouseEvent, extData?:any) : MapEvent
}


export declare interface IMapEventListener {
    type: EventType
    level: 'map'|'layer'|'shape'
    nanoid?: string
    source?: MapElement
    handler: (e: MapEvent) => void
}

export declare type TMouseStatus = "mouseover"

export declare type EventType = 'click' | 'hover' | 'dblclick' | 'mousemove' |'unmousemove'


export declare class MapElement {

}

export declare class MapView extends MapElement {
    
}

export declare class Layer extends MapElement {

}


export declare class Polygon extends MapElement {

}

export declare class Circle extends MapElement {

}

export declare class PolyLine extends MapElement {

}

export declare class Marker extends MapElement {

}
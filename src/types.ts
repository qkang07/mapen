import { MapenEvent } from "./Event"

export declare interface IShapeStyle {
  fillColor?: string // 多边形填充颜色
  strokeWidth?: number // 线条宽度
  strokeColor?: string // 线条颜色
  opacity?: number
  fillImage?:IFillImage
  [other: string]: any
}

export declare interface IFillImage {
  imgData?: CanvasImageSource
  height?:number
  width?:number
}

export declare interface IRenderContext{
  ctx?: CanvasRenderingContext2D |OffscreenCanvasRenderingContext2D
  event?: MapenEvent
  retina?: boolean
  canvas?: HTMLCanvasElement |OffscreenCanvas
  fullRender?:boolean
}

export declare interface ITile{
  key:string
  x?:number
  y?:number
  resolution?:number
  data?:ImageBitmap
  bounds?: Bounds
}



export declare interface IPromiseCallback{
  resolve:Function
  reject:Function
}

export declare type Pixel = [number, number]

export declare type EventType = 'click' | 'hover' | 'dblclick' | 'mousemove' |'unmousemove'

export declare type ElementType = 'layer'|'circle'|'line'|'marker'|'polygon'|'shape'|'groupmarker'

export type Bounds = [Pixel, Pixel]


export declare interface IRenderer {
  renderCircle
}

import {IRenderContext, IShapeStyle, IPromiseCallback, LngLat, EventType, Pixel  } from '../index.d'
import { MapElement } from './MapElement';
import { MapEvent } from './Models';

const AMap:any = (window as any).AMap
export class MapView extends MapElement{

    h3HexagonStyle: IShapeStyle = {
        fillColor: 'rgba(0,44,222,.3)', // 多边形填充颜色
        strokeWeight: 0, // 线条宽度，默认为 1
        // strokeColor: 'rgba(0,44,222,.3)', // 线条颜色
        strokeColor: 'rgba(0,44,222,0)', // 线条颜色
    }
    map: AMap.Map
    ready: -1|0|1 = 0
    readyPromise: IPromiseCallback = null

    mapBounds:[LngLat, LngLat] = [[0,0],[0,0]]
    // pixiApp: PIXI.Application = null
    
    
 
    customCanvasLayer: any

    private renderFlag:boolean = false

    // 当发生交互事件时，置为true，之后触发一次渲染，并在渲染时触发事件处理
    canvasEvent: MouseEvent = null

    // 事件相关
    mouseDown: boolean = false
    mouseDownTime: number = null

    protected zoomLayers = [5,10]

    private renderedImg?: any
    private latRange?: any[]
    private lngRange?: any[]

    extraData:any = {}
    

    constructor(el?:HTMLElement,config?:any){
        super()
        this.view = this
        if(el){
            this.init(el, config)
        }
    }
  
    async init(el: any, config:any, plugins: string[] = ['AMap.MouseTool']) {
        this.map = new AMap.Map(el, config) 
        
        return new Promise((resolve, reject) => {
            this.readyPromise = {resolve,reject}
            this.map.plugin(plugins, () => {
                // this.pixiApp = new PIXI.Application({
                //     transparent:true,
                // })

                let canvas = document.createElement('canvas')
                this.canvas = canvas

                let layer = new (AMap as any).CustomLayer(canvas,{
                    // alwaysRender: true,
                    map: this.map,
                    zIndex:100
                })

                layer.render = (rctx?: IRenderContext) => {
                    let size = this.map.getSize();//resize
                    
                    let width = size.getWidth();
                    let height = size.getHeight();
                    let retina = AMap.Browser.retina;
                  
                    canvas.width = width;
                    canvas.height = height;//清除画布
                    canvas.style.width = width+'px'
                    canvas.style.height = height + 'px'

                    if (!rctx) {
                        rctx = {
                            // callByMap: true
                        }
                    }
                    if(rctx.callByMap === undefined){
                        rctx.callByMap = true
                    }
                    rctx.ctx = canvas.getContext('2d')
                    rctx.retina = retina
                    rctx.canvas = canvas
                    let bounds = this.map.getBounds()
                    let latRange = [], lngRange = []
                    let ne = bounds.getNorthEast(), sw = bounds.getSouthWest()
                    this.bounds = [[sw.getLng(), sw.getLat()],[ne.getLng(),ne.getLat()]]

                
                    rctx.mapBounds = this.mapBounds
                    // if (!this.latRange) {
                    //     this.latRange = latRange
                    //     this.lngRange = lngRange
                    // }
                    // // 如果已经有了渲染好的图形，只是做缩放平移
                    // const calcCenter = (range: any[]) => {
                    //     return (range[0] + range[1]) / 2
                    // }
                    // const calcOffset = (range1, range2) => {
                    //     return calcCenter(range1) - calcCenter(range2)
                    // }
                    // if (this.renderedImg) {
                    //     let scale = Math.abs( (this.latRange[1] - this.latRange[0]) / (latRange[1] - latRange[0]))
                    //     let offsetX = calcOffset(lngRange, this.lngRange)
                    //     let offsetY = calcOffset(latRange, this.latRange)
                    //     console.log(scale, offsetX, offsetY)
                    //     rctx.ctx.translate(offsetX, offsetY)
                    //     rctx.ctx.scale(scale,scale)
                    //     this.latRange = latRange
                    //     this.lngRange = lngRange

                    // } else {

                    //     this.layers.sort((l1,l2)=>l1.zIndex - l2.zIndex).forEach(layer => {
                    //         if (layer.visible) {
                    //             layer.render(rctx)
                    //         }
                    //     })
                    //     this.renderedImg = true
                    // }
                    // if (rctx.callByMap) {
                    //     // this.pixiApp.stage.setTransform(Math.random() * 100, Math.random()*100)
                    //     // console.log('map transform')
                    // } else {
                    //     console.log('update data')
                    //     // this.pixiApp.stage.removeChildren()
                    //     this.layers.sort((l1,l2)=>l1.zIndex - l2.zIndex).forEach(layer => {
                    //         if (layer.visible) {
                    //             layer.render(rctx)
                    //         }
                    //     })
                            

                    // }
                    this.eachChildren(ele=>{
                        // console.log('each ch of view', ele)
                        ele.render(rctx)
                    })
                    // this.layers.sort((l1,l2)=>l1.zIndex - l2.zIndex).forEach(layer => {
                    //     if (layer.visible) {
                    //         layer.render(rctx)
                    //     }
                    // })
                   
                }
                ['click','dblclick', 'mousemove'].forEach((ename:EventType) => {
                    canvas.addEventListener(ename, (event: MouseEvent) => {
                        let dur = Date.now() - this.mouseDownTime
                        if (ename === 'click' && dur > 300) {
                            return
                        }
                        // 鼠标按下时不响应事件
                        if (this.mouseDown) {
                            return
                        }

                        let lnglat = this.pixelToLngLat(event.offsetX, event.offsetY)
                        // console.log(lnglat, event)
              
                        const mapEvent = MapEvent.create(event, lnglat)
                        
                        this.eachChildren(ele=>{
                            ele.trigger(ename,mapEvent)
                        })
                            
                       
                    })
                })
                canvas.addEventListener('mousedown', ev => {
                    this.mouseDownTime = Date.now()
                    this.mouseDown = true
                })
                canvas.addEventListener('mouseup', ev => {
                    this.mouseDown = false
                })

                this.customCanvasLayer = layer

                this.ready = 1
                resolve()
            });
        })
    }

    async render() {
        this.renderFlag = true
        setTimeout(() => {
            if (this.renderFlag) {
                this.renderFlag = false
                this.renderedImg = null
                this.customCanvasLayer.render({callByMap:false})
            }
        })

    }
    contain(pos:LngLat){
        return false
    }
    makeBounds(){return null}
    addChildren(el:MapElement){
        el.view = this
        super.addChildren(el)
    }

    pixelToLngLat(x:number,y:number):LngLat{
        let [sw, ne] = this.bounds
        
        let lngRatio = x / this.canvas.width 
        let latRatio = y / this.canvas.height
        let lng = (ne[0] - sw[0]) * lngRatio + sw[0]
        let lat = (ne[1] - sw[1]) * (1-latRatio) + sw[1]
        return [lng,lat]
    
    }

    lnglatToPixel(lnglat: LngLat):Pixel {

        let [sw, ne] = this.bounds
      
        let lngRatio = (lnglat[0] - sw[0]) / (ne[0] - sw[0])
        let latRatio = (lnglat[1] - sw[1]) / (ne[1] - sw[1])
        let x = Math.round(lngRatio * this.canvas.width)
        let y = Math.round((1 - latRatio) * this.canvas.height)
        return { x, y }
    
    }

}

export default new MapView()
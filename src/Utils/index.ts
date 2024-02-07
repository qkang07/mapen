import { MapenElement } from '../Element';
import { Bounds, Pixel } from '../types';

export const mapDistance = (p1:Pixel,p2:Pixel)=>{
    const Pu = 0.017453292519943295
    const TQ = 6378137
    var d = Pu
    , e = Math.cos
    , f = p1[0] * d
    , h = p2[0] * d
    , k = 2 * TQ
    , d = p1[1] * d - p2[1] * d
    let  ee = (1 - e(h - f) + (1 - e(d)) * e(f) * e(h)) / 2;
  return k * Math.asin(Math.sqrt(ee))
}

export function distance(p1:Pixel, p2:Pixel){
  return Math.sqrt(Math.pow(p1[0] -p2[0],2) + Math.pow(p1[1]-p2[1],2))
}

export const zoomLevels = []
let rad = 180
for(let i =0;i<15;i++){
  
  zoomLevels.push(rad)
  rad /= 3
}


export function makePolyBounds (path:Pixel[]):Bounds{
  let min:Pixel = [180,90], max:Pixel = [-180,-90]
  path.forEach(p=>{
    min[0] = Math.min(p[0], min[0])
    min[1] = Math.min(p[1], min[1])
    max[0] = Math.max(p[0], max[0])
    max[1] = Math.max(p[1], max[1])
  })
  return [min, max]
}

export function isShape(ele:MapenElement){
  return ele.type =='polygon'|| ele.type == 'circle' || ele.type == 'line' || ele.type == 'marker'
}


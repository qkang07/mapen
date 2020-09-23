import { Bounds, ITile, LngLat } from '../index.d'

export const resSpans = []
let rad = 180
for(let i =0;i<15;i++){
  
    resSpans.push(rad)
    rad /= 3
}

function createTile(res,x,y):ITile{
    let step = resSpans[res]
    return {
        key: `${res}-${x}-${y}`,
        x,
        y,
        resolution:res,
        bounds:[
            [x*step, y*step],
            [(x+1)*step,(y+1)*step]
        ]
    }
}

export function findTile(pos:LngLat, res:number):ITile{
    let step = resSpans[res]
    let x = Math.floor(pos[0] / step)
    let y = Math.floor(pos[1]/step)
    return createTile(res,x,y)
  
  }

export function boundsToTiles(bounds:Bounds,res:number):ITile[]{
    let step
    let start = findTile(bounds[0],res)
    let end = findTile(bounds[1],res)
    let result = [start]
    for(let x = start.x; x<end.x;x++){
        for(let y = start.y;y<=end.y;y++){
            
            result.push(createTile(res,x,y))
        }
    }
    return result
}
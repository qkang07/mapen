import { MapenElement } from './Element'
import { Pixel } from './types'

export class MapenEvent extends MouseEvent {
    extData:any
    element:MapenElement
    pos?: Pixel
    
    static create(mouseEv: MouseEvent, extData?:any) : MapenEvent {
        let mapEv: MapenEvent = mouseEv as MapenEvent
        mapEv.extData = extData
        return mapEv
    }
}

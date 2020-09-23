import { MapElement } from './MapElement'
import {LngLat} from '../../index'

export class MapEvent extends MouseEvent {
    extData:any
    pos:LngLat
    mapElement:MapElement
    
    static create(mouseEv: MouseEvent, pos:LngLat, extData?:any) : MapEvent {
        let mapEv: MapEvent = mouseEv as MapEvent
        mapEv.extData = extData
        mapEv.pos = pos
        return mapEv
    }
}

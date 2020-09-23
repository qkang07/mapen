
import { MapElement } from './MapElement';

import { MapView } from './MapView';



export class MapEvent extends MouseEvent {
    extData:any
    static create(mouseEv: MouseEvent, extData?:any) : MapEvent {
        let mapEv: MapEvent = mouseEv as MapEvent
        mapEv.extData = extData
        return mapEv
    }
}



export const EventTypes = ['click', 'hover', 'dblclick', 'mousemove','unmousemove']
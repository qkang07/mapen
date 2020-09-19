import { MapView, Polygon } from '@/mapu';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';

export default () => {
  const mapRef = useRef()
  useEffect(()=>{
    if(mapRef && mapRef.current){
      let view = new MapView()
      view.init(mapRef.current,{}).then(res=>{
        let step = 1/100
        for(let i =0;i<100;i++){
          for(let j =0;j<100;j++){
            let lng = 121 + i*step
            let lat = 30.5 +j*step
            let polygon = new Polygon([
              [lng,lat],[lng + step,lat],[lng+step,lat+step],[lng,lat+step]
            ],{
              fillColor:'rgba(0,0,222,.4)',
              strokeColor:'rgba(0,0,0,1)',
              strokeWidth:1
            })
            view.addChildren(polygon)
          }
        }
        
      
      })
    }
  },[mapRef])
  return (
    <div>
      <div style={{
        height:"100vh",
        
      }} ref={mapRef}></div>
    </div>
  );
}

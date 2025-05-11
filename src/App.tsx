import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import * as d3 from "d3";
window.d3 = d3;
import "./assets/leaflet.canvaslayer.field.js";
import Location from "./components/Location";
import CanvasRender from "./components/CanvasRender";
import store from "./store";
import Timeline from "./components/Timeline";
import Resource from "./components/Resource";
const MapData: MapDataType[] = [
  {
    name: "温度",
    time: "4-19",
    url: "/temp1.json",
    unit: "℃",
  },
  {
    name: "盐度",
    time: "4-20",
    url: "/temp2.json",
    unit: "mg/ml",
  },
  {
    name: "叶绿素",
    time: "4-21",
    url: "/temp2.json",
    unit: "mol/ml",
  },
  {
    name: "温度2",
    time: "4-22",
    url: "/temp1.json",
    unit: "℃",
  },
  {
    name: "盐度2",
    time: "4-23",
    url: "/temp2.json",
    unit: "mg/ml",
  },
  {
    name: "叶绿素2",
    time: "4-24",
    url: "/temp2.json",
    unit: "mol/ml",
  },
];
export interface MapDataType {
  name: string;
  url: string;
  unit: string;
  time: string;
}
const Default_Time_Index = 0;

export default function App() {
  // const currentDataKey: string = "温度";
  const [currentTimeIndex, setCurrentTimeIndex] = useState(Default_Time_Index);
  const currentMapData = MapData[currentTimeIndex];
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    if (mapRef.current) {
      const _map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([36, 120], 5);
      store.setMap(_map);

      setMapReady(true);

      L.control
        .scale({
          imperial: false,
          position: "bottomright",
        })
        .addTo(_map);
      L.control.zoom({ position: "bottomright" }).addTo(_map);
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "",
        }
      ).addTo(_map);

      return () => {
        _map.remove();
      };
    }
  }, []);

  return (
    <div className="relative">
      <div ref={mapRef} className="z-10 h-svh"></div>
      {mapReady && (
        <>
          <Location />
          <CanvasRender mapData={currentMapData} />
        </>
      )}
      <Timeline
        defalutIndex={Default_Time_Index}
        data={MapData}
        updateIndex={setCurrentTimeIndex}
      ></Timeline>
      <Resource
        defalutIndex={Default_Time_Index}
        source={MapData}
        update={setCurrentTimeIndex}
      />
    </div>
  );
}


// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import * as d3 from "d3";
// window.d3 = d3;
// import Location from "./components/Location";
// import CanvasRender from "./components/CanvasRender";
// import store from "./store";
// import Timeline from "./components/Timeline.js";
// import {ChevronLast,ChevronFirst,Play,Pause} from "lucide-react"
// import Resource from "./components/Resource.js";
// import * as Cesium from 'cesium'

// const MapData: MapDataType[] = [
//   {
//     name: "温度1",
//     url: "/temp1.json",
//     unit: "℃",
//     time:"4-19",
//   },
//   {
//     name: "盐度1",
//     url: "/temp2.json",
//     unit: "mg/ml",
//     time:"4-20",
//   },
//   {
//     name: "叶绿素1",
//     url: "/temp2.json",
//     unit: "mol/ml",
//     time:"4-21",
//   },
//   {
//     name: "温度2",
//     url: "/temp1.json",
//     unit: "℃",
//     time:"4-22",
//   },
//   {
//     name: "盐度2",
//     url: "/temp2.json",
//     unit: "mg/ml",
//     time:"4-23",
//   },
//   {
//     name: "叶绿素2",
//     url: "/temp2.json",
//     unit: "mol/ml",
//     time:"4-24",
//   },
// ];
// export interface MapDataType {
//   name: string;
//   url: string;
//   unit: string;
//   time: string;
// }
// const Default_Time_Index = 0;
// export default function App() {
//   //const currentDataKey: string = "温度";
//   const [currentTimeIndex,setCurrentTimeIndex] = useState(Default_Time_Index);
//   const currentMapData = MapData[currentTimeIndex];
//   const [mapReady, setMapReady] = useState(false);
//   useEffect(() => {
//     const viewer = new Cesium.Viewer("map",{
//       animation: false,
//       baseLayerPicker: false,
//       fullscreenButton: false,
//       geocoder: false,
//       homeButton: false,
//       infoBox: false,
//       sceneModePicker: false,
//       timeline: false,
//       navigationHelpButton: false,
//     })
//     store.setMap(viewer);
//     setMapReady(true);
//   }, []);

//   return (
//     <div className="relative">
//       <div id="map" className="z-10 h-svh"></div>
//       {mapReady && (
//         <>
//           {/* <Location />
//           <CanvasRender mapData={currentMapData} /> */}
//         </>
//       )}
//       <Timeline 
//       defalutIndex={Default_Time_Index} 
//       data ={MapData} 
//       updateIndex = {setCurrentTimeIndex}

//       ></Timeline>
//       <Resource 
//       defalutIndex={Default_Time_Index}
//       source={MapData}
//       update={setCurrentTimeIndex}/>
//     </div>
//   );  
// }

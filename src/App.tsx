import { useEffect, useState } from "react";
import * as d3 from "d3";
window.d3 = d3;
import store from "./store";
import Timeline from "./components/Timeline.js";
import Resource from "./components/Resource.js";
import Location from "./components/Location.js";
import CanvasRender from "./components/CanvasRender.js";
import * as Cesium from 'cesium'

const MapData: MapDataType[] = [
  {
    name: "温度1",
    url: "/temp1.json",
    unit: "℃",
    time: "4-19",
  },
  {
    name: "盐度1",
    url: "/temp2.json",
    unit: "mg/ml",
    time: "4-20",
  },
  {
    name: "叶绿素1",
    url: "/temp2.json",
    unit: "mol/ml",
    time: "4-21",
  },
  {
    name: "温度2",
    url: "/temp1.json",
    unit: "℃",
    time: "4-22",
  },
  {
    name: "盐度2",
    url: "/temp2.json",
    unit: "mg/ml",
    time: "4-23",
  },
  {
    name: "叶绿素2",
    url: "/temp2.json",
    unit: "mol/ml",
    time: "4-24",
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
  //const currentDataKey: string = "温度";
  const [currentTimeIndex, setCurrentTimeIndex] = useState(Default_Time_Index);
  const currentMapData = MapData[currentTimeIndex];
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    const viewer = new Cesium.Viewer("map", {
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      timeline: false,
      navigationHelpButton: false,
    })
    viewer.bottomContainer.remove();
    store.setMap(viewer);
    setMapReady(true);
  }, []);

  return (
    <div className="relative">
      <div id="map" className="z-10 h-svh"></div>
      {mapReady && (
        <div>
          <Location />
          <CanvasRender mapData={currentMapData} />
        </div>
      )}
      <Timeline
        defalutIndex={Default_Time_Index}
        data={MapData}
        updateIndex={setCurrentTimeIndex}
      ></Timeline>

      <Resource
        defalutIndex={Default_Time_Index}
        source={MapData}
        update={setCurrentTimeIndex} />
    </div>
  );
}
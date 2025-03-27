import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import Location from "./components/Location";
import store from "./store";
import 'leaflet/dist/leaflet.css';
export default function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    // getTempData();

    if (mapRef.current) {
      const _map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([36, 120], 7);
      store.setMap(_map);
      setMapReady(true);
      renderCanvas(_map);
      L.control.scale({
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

  const renderCanvas = async(map:L.Map) =>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillRect(10, 10, 55, 50);
    const url = canvas.toDataURL("png");
    // console.log(url);
    // document.body.appendChild(canvas);
    const tempData: FieldData = await fetch("/temp1.json").then((res) =>
      res.json()
    );

    const imageBounds =L.latLngBounds([
    [tempData.yllcorner, tempData.xllcorner], 
    [tempData.yllcorner + tempData.cellsize * tempData.nrows, 
     tempData.xllcorner + tempData.cellsize * tempData.ncols]]);

    const layer = L.imageOverlay(url,imageBounds).addTo(map);
    console.log(layer);
  };
  return (
    <div className="relative">
      <div ref={mapRef} className="z-10 h-svh"></div>
      {mapReady && <Location />}
    </div>
  );
}
type FieldData = {
  cellsize: number;
  data: number[][];
  nODATA: string;
  xllcorner: number;
  yllcorner: number;
  ncols: number;
  nrows: number;
}
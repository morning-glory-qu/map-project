
import { useEffect } from "react";
import L from "leaflet";
import store from "../store";
import type { FieldData } from "../App";

export default function CanvasOverlay() {
  useEffect(() => {
    const map = store.map;
    if (!map) return;

    let layer: L.ImageOverlay | null = null;

    const renderCanvas = async () => {

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "rgb(213, 10, 33)";
      ctx.fillRect(10, 10, 55, 50);
      const url = canvas.toDataURL("png");

      const tempData: FieldData = await fetch("/temp1.json").then((res) =>
        res.json()
      );

      const imageBounds = L.latLngBounds([
        [tempData.yllcorner, tempData.xllcorner],
        [
          tempData.yllcorner + tempData.cellsize * tempData.nrows,
          tempData.xllcorner + tempData.cellsize * tempData.ncols,
        ],
      ]);


      layer = L.imageOverlay(url, imageBounds).addTo(map);
    };

    renderCanvas();


    return () => {
      if (layer && map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    };
  }, []);

  return null; 
}
import { useRef, useEffect, useState } from "react";
import leaflet from "leaflet";

export default function App() {
  //
  const [clickPosition, setClickPosition] = useState<{ lat: number, lng: number } | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current) {
      const map = leaflet.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([35.771944, 120.024444], 7);

      //经纬度
      map.on("click", (e) => {
        setClickPosition({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      });

      leaflet.control.scale({
        imperial: false,
        position: "bottomright",
      }).addTo(map);
      leaflet.control.zoom({ position: "bottomright" }).addTo(map);
      leaflet
        .tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ).addTo(map);
      leaflet
        .marker([35.771944, 120.024444])
        .addTo(map)
        .openPopup();
    }
  }, []);
  return (
    <>
      <div ref={mapRef} style={{ width: "100vw", height: "100vh" }}></div>
      {clickPosition &&
        (<div
          style={{
            position: "absolute",
            bottom: "0px",
            right: "5px",
            color:"#fff",
            zIndex: 999,
          }}>
          <div>经度：{clickPosition.lat.toFixed(2)}</div>
          <div>纬度：{clickPosition.lng.toFixed(2)}</div>
        </div>)
      }
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          right: "130px",
          color:"#fff",
          zIndex: 999,
        }}>
          <div>姓名: 曲泓勃</div>
          <div>学号: 23020007099</div>
     </div>
    </>
  );
}

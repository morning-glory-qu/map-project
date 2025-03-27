import  { useEffect, useState } from "react";
import L from "leaflet";
import store from "../store/index.ts";
import { observer } from "mobx-react-lite";

const Location = observer(() => {
  const map = store.map;
  const [postion, setPostion] = useState<string>("");
  useEffect(() => {
    map.on("mousemove", updatePostion);
    return () => {
      map.off("mousemove", updatePostion);
    };
  }, [map]);

  const updatePostion = (evt: L.LeafletMouseEvent) => {
    setPostion(evt.latlng.toString());
  };
  return (
    <div className="absolute z-20 text-white bottom-0.5 text-sm right-0.5 py-2 px-4">
      {postion}
    </div>
  );
});

export default Location;

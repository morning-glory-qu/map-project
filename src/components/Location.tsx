import  { useEffect, useState } from "react";
import store from "../store/index.ts";
import { observer } from "mobx-react-lite";
import * as Cesium from "cesium";

const Location = observer(() => {
  const map = store.map;
  const [postion, setPostion] = useState<string | null>(null);

  useEffect(() => {
    const handler = new Cesium.ScreenSpaceEventHandler;
    handler.setInputAction((movement: any) => {
      const onmap = map.camera.pickEllipsoid(
        movement.endPosition,
        map.scene.ellipsoid
      )
      if (onmap) {
        const cartographic = Cesium.Cartographic.fromCartesian(onmap);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        setPostion(`经度：${longitude}°  纬度：${latitude}°`);
      } else {
        setPostion(null);
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE
    );
  }, [map]);

  return postion && (
    // 居中
    <div className="text-white text-sm absolute bottom-0 right-0 p-2 z-20">
      {postion}
    </div>
  )
});

export default Location;

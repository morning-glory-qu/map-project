import { useEffect, useState } from "react";
import store from "../store/index.ts";
import { observer } from "mobx-react-lite";
import Colorbar, { Range } from "./Colorbar.tsx";
import { MapDataType } from "../App.tsx";
import * as Cesium from "cesium";
import {
  extent,
  interpolateTurbo,
  scaleSequential,
  contours,
  geoPath,
} from "d3";

type CanvasRenderProps = {
  mapData: MapDataType;
};

const CanvasRender = observer(({ mapData }: CanvasRenderProps) => {
  const map = store.map;
  const [range, setRange] = useState<Range>({
    min: "",
    max: "",
  });
  const [unit, setUnit] = useState("");

  const renderCanvas = async (map: Cesium.Viewer) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const tempData: FieldData = await fetch(mapData.url).then((res) =>
      res.json()
    );
    //设置数据单位
    setUnit(mapData.unit);
    //设置数据范围
    const tempArray: number[] = tempData.data
      .reduce((sum, el) => {
        return sum.concat(el);
      }, [])
      .map((el) => (el === tempData.nODATA ? NaN : +el));
    const extentRange = extent(tempArray) as number[];

    setRange({
      min: extentRange[0].toString(),
      max: extentRange[1].toString(),
    });

    //生成countour;
    const colorMap = scaleSequential(interpolateTurbo).domain([
      Number(extentRange[0]),
      +extentRange[1],
    ]);
    const ticks = 8;
    const scale = 1;
    canvas.width = tempData.ncols * scale;
    canvas.height = tempData.nrows * scale;
    //@ts-expect-error 库文件错误
    const thresholds = colorMap.nice().ticks(ticks);
    console.log(thresholds);
    const _contour = contours()
      .size([tempData.ncols, tempData.nrows])
      .smooth(true);
    const path = geoPath(null, ctx);
    ctx.scale(scale, scale);
    thresholds.map((d: number) => {
      ctx.beginPath();
      path(_contour.contour(tempArray, d));
      ctx.fillStyle = colorMap(d);
      ctx.fill();
    });
    const img = canvas.toDataURL("png");

    //定位
    const rectangle = Cesium.Rectangle.fromDegrees(
      tempData.xllcorner,
      tempData.yllcorner,
      tempData.xllcorner + tempData.cellsize * tempData.ncols,
      tempData.yllcorner + tempData.cellsize * tempData.nrows
    )

    // Entity 把 img 贴到 retangle 划定的范围内
    map.entities.add({
      rectangle: {
        coordinates: rectangle,
        material: new Cesium.ImageMaterialProperty({
          image: img,
          transparent: true,
        }),
      },
    });
  };

  useEffect(() => {
    if (map) {
      renderCanvas(map);
    }
    return () => {
      map.entities.removeAll();
    };
  }, []);
  return <Colorbar range={range} unit={unit}></Colorbar>;
});

type FieldData = {
  cellsize: number;
  data: string[][];
  nODATA: string;
  xllcorner: number;
  yllcorner: number;
  ncols: number;
  nrows: number;
};

export default CanvasRender;

import { scaleSequential, interpolateTurbo } from "d3";
import { JSX } from "react";
export default function Colorbar(props: ColorProps) {
  const range = props.range;
  const min = Number(range.min);
  const max = Number(range.max);
  const colorMap = scaleSequential(interpolateTurbo).domain([min, max]);
  const colors: string[] = [];
  for (let index = min; index < max; index = index + (max - min) / 100) {
    colors.push(colorMap(index));
  }
  //
  const colorDom: JSX.Element = (
    <div className="flex flex-col">
      {colors.map((el, index) => (
        <div key={index} style={{ background: el }} className="h-0.5 w-4"></div>
      ))}
    </div>
  );

  return (
    <div className="absolute left-5 bottom-5 z-20 text-white">
      <div className="text-lg py-1">{props.unit}</div>
      <div className="absolute left-6 bottom-[175px]">{range.min}</div>
      {colorDom}
      <div className="absolute left-6 bottom-0">{range.max}</div>
    </div>
  );
}
type ColorProps = {
  range: Range;
  unit: string;
};
export type Range = {
  min: string;
  max: string;
};

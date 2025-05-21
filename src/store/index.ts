import { makeAutoObservable } from "mobx";
import {Viewer} from "cesium";
class App {
  name = "遥感可视化";
  map!: Viewer;
  constructor() {
    makeAutoObservable(this);
  }
  setName = (name: string) => {
    this.name = name;
  };
  setMap = (map: Viewer) => {
    this.map = map;
  };

}
export default new App();
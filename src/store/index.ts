import leaflet from "leaflet";
import { makeAutoObservable } from "mobx";

class APP {
    private name = "遥感可视化";
    map!: leaflet.Map;
    constructor() {
        makeAutoObservable(this);
    }
    setName = (name: string) =>{
        this.name = name;
    };

    setMap = (map: leaflet.Map) =>{
        this.map = map;
    };
}
export default new APP();

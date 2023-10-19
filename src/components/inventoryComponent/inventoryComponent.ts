import InventoryController from "./controller/inventoryController"
import "./style/inventoryStyle.css"

export default class InventoryComponent{
    public controller:InventoryController = new InventoryController();

    constructor(node:JQuery<HTMLElement>,commFunction:(args:any)=>void){
        this.controller.init(node,commFunction)
    }
}
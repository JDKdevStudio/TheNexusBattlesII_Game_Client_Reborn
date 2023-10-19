import InventoryController from "./controller/inventoryController"

export default class InventoryComponent{
    public controller:InventoryController = new InventoryController()

    constructor(node:JQuery<HTMLElement>){
        this.controller.init(node)
    }
}
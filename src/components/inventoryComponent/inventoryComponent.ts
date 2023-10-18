import $ from "jquery"
import InventoryController from "./controller/inventoryController"

export default class InventoryComponent{
    public controller:InventoryController = new InventoryController()

    constructor(){
        this.controller.init($("#game-view"))
    }
}

const test = new InventoryComponent()
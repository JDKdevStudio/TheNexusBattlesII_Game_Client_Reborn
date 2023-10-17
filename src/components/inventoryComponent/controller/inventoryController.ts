import InventoryModel from "../model/inventoryModel";
import InventoryView from "../view/inventoryView";

export default class InventoryController {
    constructor(private readonly view: InventoryView = new InventoryView(), private readonly model: InventoryModel = new InventoryModel()) { }

    init = (node:JQuery<HTMLElement>):void=>{
        this.view.render(node)
    }

    cardRender = ():JQuery<HTMLElement>=>{
        return this.view.renderInventoryCard()
    }
}
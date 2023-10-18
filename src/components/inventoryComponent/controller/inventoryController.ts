import CardComponent from "../../cardComponent/cardComponent";
import { CardStatusHandler } from "../../cardComponent/enum/cardStatusEnum";
import InventoryModel from "../model/inventoryModel";
import { InventoryType } from "../types/inventoryType";
import InventoryView from "../view/inventoryView";

export default class InventoryController {
    constructor(private readonly view: InventoryView = new InventoryView(), private readonly model: InventoryModel = new InventoryModel()) { }

    init = (node: JQuery<HTMLElement>): void => {
        this.view.render(node)
        this.inventoryRender()
    }


    private inventoryRender = async (): Promise<void> => {
        const response = await this.model.getUserInventory();
        await Promise.all(response.map(async (item: InventoryType) => {
            for (let index = 0; index < item.quantity; index++) {
                if (item.type == "Heroes") {
                    await this.cardRender(CardStatusHandler.InventoryHeroe, item.id_carta);
                } else {
                    await this.cardRender(CardStatusHandler.InventoryConsumible, item.id_carta);
                }
            }
        }));
    };

    private cardRender = async (cardType: CardStatusHandler, cardId: string): Promise<void> => {
        const cardData = this.model.inventoryCardMap.has(cardId) ? this.model.inventoryCardMap.get(cardId)! : await this.model.getCard(cardId)
        if (!this.model.inventoryCardMap.has(cardId)) { this.model.inventoryCardMap.set(cardId, cardData) }
        const card = new CardComponent(this.view.getInventoryList(), cardType, cardData, true)
        card.controller.getCardNode().addClass("col-2 card-col")
    }
}
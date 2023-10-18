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
        if (!this.model.inventoryCardMap.has(cardId)) {
            const cardData = await this.model.getCard(cardId);
            this.model.inventoryCardMap.set(cardId, cardData);
        }
        const cardData = this.model.inventoryCardMap.get(cardId)!;
        const card = new CardComponent(this.view.getInventoryList(), cardType, cardData, true);
        const cardNode = card.controller.getCardNode();
        cardNode.addClass("col-2 card-col");
        cardNode.on("click", () => this.cardSelection(card, cardId));
    };

    private cardSelection = (cardObject: CardComponent, cardId: string) => {
        const cardSelected = cardObject.controller.setCardSelection();
        const currentCount = this.model.inventorySelectedCardMap.get(cardId) ?? 0;
        if (cardSelected) {
            this.model.inventorySelectedCardMap.set(cardId, currentCount + 1);
        } else {
            if (currentCount > 0) {
                this.model.inventorySelectedCardMap.set(cardId, currentCount - 1);
            }
            if (this.model.inventorySelectedCardMap.get(cardId) === 0) {
                this.model.inventorySelectedCardMap.delete(cardId);
            }
        }
    };

}
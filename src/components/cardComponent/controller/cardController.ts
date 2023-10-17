import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";
import { CardStatusHandler } from "../enum/cardStatusEnum";
import CardModel from "../model/cardModel";
import CardView from "../view/cardView";

export default class CardController {
    constructor(private readonly view: CardView, private readonly model: CardModel) { }

    init = (node: JQuery<HTMLElement>, cardType: CardStatusHandler, cardData: string | HeroeType | ConsumibleType, isLocalCard: boolean): void => {
        const cardTypeHandler: { [key in CardStatusHandler]: () => void } = {
            [CardStatusHandler.InventoryHeroe]: () => this.renderInventoryHeroe(node, cardData as string | HeroeType),
            [CardStatusHandler.InventoryConsumible]: () => this.renderInventoryConsumible(node, cardData as string | ConsumibleType),
            [CardStatusHandler.GameHeroe]: () => this.renderGameHeroe(node, cardData as string | HeroeType, isLocalCard),
            [CardStatusHandler.GameConsumible]: () => this.renderGameConsumible(node, cardData as string | ConsumibleType)
        }
        cardTypeHandler[cardType]()
    }

    private renderInventoryHeroe = async (node: JQuery<HTMLElement>, cardData: string | HeroeType): Promise<void> => {
        const data = await this.model.getHeroe(cardData)
        this.view.renderCardHeader(data)
        this.view.renderHeroeStats(data)
        this.view.renderCardDesc(data.descripcion)
        this.view.render(node)
    }

    private renderInventoryConsumible = async (node: JQuery<HTMLElement>, cardData: string | ConsumibleType): Promise<void> => {
        const data = await this.model.getConsumible(cardData)
        this.view.renderCardHeader(data)
        this.view.renderCardDesc(data.descripcion)
        this.view.render(node)
    }

    private renderGameHeroe = async (node: JQuery<HTMLElement>, cardData: string | HeroeType, isLocalCard: boolean): Promise<void> => {
        const data = await this.model.getHeroe(cardData)
        this.view.renderCardHeader(data)
        this.view.renderHeroeLifeBar(data.vida)
        this.view.renderHeroeStats(data)
        if (isLocalCard) { this.view.renderHeroeButtons() }
        this.view.render(node)
    }

    private renderGameConsumible = async (node: JQuery<HTMLElement>, cardData: string | ConsumibleType): Promise<void> => {
        const data = await this.model.getConsumible(cardData)
        this.view.renderCardHeader(data)
        this.view.renderCardDesc(data.descripcion)
        this.view.render(node)
    }
}
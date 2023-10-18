import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";
import CardComponent from "../cardComponent";
import { CardStatusHandler } from "../enum/cardStatusEnum";
import CardView from "../view/cardView";

export default class CardController {
    private isSelected:boolean = false

    constructor(private readonly view: CardView) { }

    init = (node: JQuery<HTMLElement>, cardType: CardStatusHandler, cardData: HeroeType | ConsumibleType, isLocalCard: boolean, componentBreaker:CardComponent): void => {
        const cardTypeHandler: { [key in CardStatusHandler]: () => void } = {
            [CardStatusHandler.InventoryHeroe]: () => this.renderInventoryHeroe(node, cardData as HeroeType),
            [CardStatusHandler.InventoryConsumible]: () => this.renderInventoryConsumible(node, cardData as ConsumibleType),
            [CardStatusHandler.GameHeroe]: () => this.renderGameHeroe(node, cardData as HeroeType, isLocalCard, componentBreaker),
            [CardStatusHandler.GameConsumible]: () => this.renderGameConsumible(node, cardData as ConsumibleType)
        }
        cardTypeHandler[cardType]()
    }

    private renderInventoryHeroe = async (node: JQuery<HTMLElement>, cardData:HeroeType): Promise<void> => {
        this.view.renderCardHeader(cardData)
        this.view.renderHeroeStats(cardData)
        this.view.renderCardDesc(cardData.descripcion)
        this.view.render(node)
    }

    private renderInventoryConsumible = async (node: JQuery<HTMLElement>, cardData:ConsumibleType): Promise<void> => {
        this.view.renderCardHeader(cardData)
        this.view.renderCardDesc(cardData.descripcion)
        this.view.render(node)
    }

    private renderGameHeroe = async (node: JQuery<HTMLElement>, cardData:HeroeType, isLocalCard: boolean,componentBreaker:CardComponent): Promise<void> => {
        this.view.renderCardHeader(cardData)
        this.view.renderHeroeLifeBar(cardData.vida)
        this.view.renderHeroeStats(cardData)
        if (isLocalCard) { this.view.renderHeroeButtons() }
        this.view.render(node,componentBreaker)
    }

    private renderGameConsumible = async (node: JQuery<HTMLElement>, cardData:ConsumibleType): Promise<void> => {
        this.view.renderCardHeader(cardData)
        this.view.renderCardDesc(cardData.descripcion)
        this.view.render(node)
    }

    public getCardNode = ():JQuery<HTMLElement>=>{
        return this.view.getCardElement
    }
    public getCardSelection=():boolean=>{return this.isSelected}

    public setCardSelection =():boolean=>{
        this.isSelected =!this.isSelected
        if (this.isSelected) {
            this.getCardNode().addClass("cardComponent-selected")
        }else{
            this.getCardNode().removeClass("cardComponent-selected")
        }
        return this.isSelected
    }
}
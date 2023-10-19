import HeroDecorator from "../../../classes/heroDecorator/decoratorHero";
import ConsumibleType from "../../../types/consumibleType";
import HeroeType from "../../../types/heroeType";
import CardComponent from "../cardComponent";
import { CardOwner } from "../enum/cardOwnerEnum";
import { CardStatusHandler } from "../enum/cardStatusEnum";
import CardView from "../view/cardView";

export default class CardController {
    private isSelected: boolean = false

    constructor(private readonly view: CardView) { }

    init = (node: JQuery<HTMLElement>, cardType: CardStatusHandler, cardData: HeroeType | ConsumibleType, cardOwner: CardOwner, componentBreaker: CardComponent): void => {
        const cardTypeHandler: { [key in CardStatusHandler]: () => void } = {
            [CardStatusHandler.InventoryHeroe]: () => this.renderInventoryHeroe(node, cardData as HeroeType),
            [CardStatusHandler.InventoryConsumible]: () => this.renderInventoryConsumible(node, cardData as ConsumibleType),
            [CardStatusHandler.GameHeroe]: () => this.renderGameHeroe(node, cardData as HeroeType, cardOwner, componentBreaker),
            [CardStatusHandler.GameConsumible]: () => this.renderGameConsumible(node, cardData as ConsumibleType)
        }
        cardTypeHandler[cardType]()
    }

    private renderInventoryHeroe = async (node: JQuery<HTMLElement>, cardData: HeroeType): Promise<void> => {
        this.view.renderCardHeader(this.view.getCardElement, cardData)
        this.view.renderHeroeStats(cardData)
        this.view.renderCardDesc(cardData.descripcion)
        this.view.render(node, this.view.getCardElement)
    }

    private renderInventoryConsumible = async (node: JQuery<HTMLElement>, cardData: ConsumibleType): Promise<void> => {
        this.view.renderCardHeader(this.view.getCardElement, cardData)
        this.view.renderCardDesc(cardData.descripcion)
        this.view.render(node, this.view.getCardElement)
    }

    private renderGameHeroe = async (node: JQuery<HTMLElement>, cardData: HeroeType, cardOwner: CardOwner, componentBreaker: CardComponent): Promise<void> => {
        this.view.renderCardHeader(this.view.getCardElement, cardData)
        this.view.renderHeroeLifeBar(cardData.vida)
        this.view.renderHeroeStats(cardData)
        this.view.renderHeroeActionBar()
        if (cardOwner == CardOwner.Local) { this.view.renderHeroeButtons() }
        this.view.render(node, this.view.getCardElement, componentBreaker)
    }

    private renderGameConsumible = (node: JQuery<HTMLElement>, cardData: ConsumibleType): void => {
        this.view.renderCardHeader(this.view.getSmallCardElement, cardData)
        this.view.renderSmallCardDesc(cardData.descripcion)
        this.view.render(node, this.view.getSmallCardElement)
    }

    public getCardNode = (): JQuery<HTMLElement> => {
        return this.view.getCardElement
    }
    public getCardSelection = (): boolean => { return this.isSelected }

    public setCardSelection = (): boolean => {
        this.isSelected = !this.isSelected
        if (this.isSelected) {
            this.getCardNode().addClass("cardComponent-selected")
        } else {
            this.getCardNode().removeClass("cardComponent-selected")
        }
        return this.isSelected
    }

    public updateCardName = (name: string): void => {
        this.view.updatePlayerName(name)
    }

    public updateEfectiveDamage = (num: number): void => {
        this.view.getToUpdateStats("daño-efectivo").text(num)
    }

    public updateCardStats = (referenceCard: HeroeType, actualCard: HeroDecorator): void => {
        //Actualizar vida
        this.view.getToUpdateStats("vida").text(actualCard.getVida())
        const healthRate: number = ((actualCard.getVida() * 100) / referenceCard.vida)
        this.view.getToUpdateStats("vida-bar").css("background-color", healthRate > 60 ? "rgb(115, 188, 88)" : healthRate >= 40 ? "rgb(185, 207, 60)" : "rgb(230, 67, 86)")
        this.view.getToUpdateStats("vida-bar").css("width", `${healthRate}%`)
        //Actualizar stats
        this.updateSingleStat("ataque", referenceCard.ataqueBase, actualCard.getAtaque())
        this.updateSingleStat("daño", referenceCard.daño, actualCard.getDano())
        this.updateSingleStat("poder", referenceCard.poder, actualCard.getPoder())
        this.updateSingleStat("defensa", referenceCard.defensa, actualCard.getDefensa())
    }

    private updateSingleStat = (statName: string, referenceStat: number, actualStat: number): void => {
        const statObject = this.view.getToUpdateStats(statName)
        statObject.text((actualStat > referenceStat ? "↑" : actualStat < referenceStat ? "↓" : "") + actualStat)
        actualStat > referenceStat ? statObject.css("color", "rgb(115, 188, 88)") : actualStat < referenceStat ? statObject.css("color", "rgb(230, 67, 86)") : statObject.css("color", "white")
    }
}
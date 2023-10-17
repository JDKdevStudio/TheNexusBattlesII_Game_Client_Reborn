import CardView from "./view/cardView";
import "../cardComponent/style/cardStyle.css"
import { CardStatusHandler } from "./enum/cardStatusEnum";
import CardController from "./controller/cardController";
import CardModel from "./model/cardModel";
import HeroeType from "../../types/heroeType";
import ConsumibleType from "../../types/consumibleType";

export default class CardComponent {
    private model: CardModel = new CardModel()
    private view: CardView = new CardView()
    public controller: CardController = new CardController(this.view, this.model)

    constructor(node: JQuery<HTMLElement>, cardType: CardStatusHandler, cardData: string | HeroeType | ConsumibleType,isLocalCard:boolean) {
        this.controller.init(node, cardType, cardData,isLocalCard)
    }
}
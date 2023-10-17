import CardView from "./view/cardView";
import "../cardComponent/style/cardStyle.css"
import $ from "jquery"
import { CardStatusHandler } from "./enum/cardStatusEnum";
import CardController from "./controller/cardController";
import CardModel from "./model/cardModel";
import HeroeType from "../../types/heroeType";
import ConsumibleType from "../../types/consumibleType";
import { gameStateContext } from "../../classes/gameState/gameStateMachine";

export default class CardComponent {
    private model: CardModel = new CardModel()
    private view: CardView = new CardView()
    public controller: CardController = new CardController(this.view, this.model)
    stateMachine:gameStateContext;

    constructor(node: JQuery<HTMLElement>, cardType: CardStatusHandler, cardData: string | HeroeType | ConsumibleType,isLocalCard:boolean,
            stateMachine:gameStateContext) {
        this.stateMachine = stateMachine;        
        this.controller.init(node, cardType, cardData,isLocalCard,this)     
    }
}
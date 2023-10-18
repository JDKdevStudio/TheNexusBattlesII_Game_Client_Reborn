import CardView from "./view/cardView";
import "../cardComponent/style/cardStyle.css"
import { CardStatusHandler } from "./enum/cardStatusEnum";
import CardController from "./controller/cardController";
import CardModel from "./model/cardModel";
import HeroeType from "../../types/heroeType";
import ConsumibleType from "../../types/consumibleType";
import GameViewHandler from "../../classes/viewHandlers/gameViewHandler";

export default class CardComponent {
    private model: CardModel = new CardModel()
    private view: CardView = new CardView()
    public controller: CardController = new CardController(this.view, this.model)
    viewContext:GameViewHandler|undefined;

    constructor(node: JQuery<HTMLElement>, cardType: CardStatusHandler, cardData: string | HeroeType | ConsumibleType,isLocalCard:boolean,
            viewContext?:GameViewHandler) {
        this.viewContext = viewContext;        
        this.controller.init(node, cardType, cardData,isLocalCard,this)     
    }
    
    isThisTheLocalCard():boolean{
        return this == this.viewContext?.playerMap.get(this.viewContext.localSessionID);
    }

    notifyTurnSkip():void{
        //Che
        if(this.isThisTheLocalCard() && this.viewContext){
            this.viewContext.dialog.notify(this.viewContext, "ClientSkipAction", {})
        }
    }
}
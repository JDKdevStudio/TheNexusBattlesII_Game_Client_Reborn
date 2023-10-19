import CardView from "./view/cardView";
import "../cardComponent/style/cardStyle.css"
import { CardStatusHandler } from "./enum/cardStatusEnum";
import CardController from "./controller/cardController";
import HeroeType from "../../types/heroeType";
import ConsumibleType from "../../types/consumibleType";
import {GameViewHandler, EnemyCardInteractions} from "../../classes/viewHandlers/gameViewHandler";
import { CardOwner } from "./enum/cardOwnerEnum";

export default class CardComponent {
    private view: CardView = new CardView()
    public controller: CardController = new CardController(this.view)
    viewContext?:GameViewHandler;

    constructor(node: JQuery<HTMLElement>, cardType: CardStatusHandler, cardData: HeroeType | ConsumibleType,cardOwner: CardOwner,
            viewContext?:GameViewHandler) {
        this.viewContext = viewContext;        
        this.controller.init(node, cardType, cardData,cardOwner,this)     
    }
    
    isThisTheLocalCard():boolean{
        return this == this.viewContext?.playerMap.get(this.viewContext.localSessionID);
    }

    notifyTurnSkip():void{
        if(this.isThisTheLocalCard() && this.viewContext){
            this.viewContext.dialog.notify(this.viewContext, "ClientSkipAction", {})
            this.viewContext.setCurrentAction(EnemyCardInteractions.None);
        }
    }

    notifyAttackButtonPressed():void{
        if(this.isThisTheLocalCard() && this.viewContext){
            this.viewContext.setCurrentAction(EnemyCardInteractions.Attack);
        }
    }
}
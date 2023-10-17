import Component from "../gameMediator/componentClass";
import Mediator from "../gameMediator/mediatorInterface";
import Cookies from "js-cookie";
import $ from "jquery";
import CardComponent from "../../components/cardComponent/cardComponent";
import { CardStatusHandler } from "../../components/cardComponent/enum/cardStatusEnum";

export default class GameViewHandler extends Component{
    playerMap: Map<string, any>;
    localSessionID: string;
    identifier: number = 0;
    
    constructor(dialog:Mediator, localSessionID: string){
        super(dialog);
        this.localSessionID = localSessionID;
        this.playerMap = new Map<string, any>();
    }

    init = async():Promise<void> => {
        let joinOrCreate = -1;
        if(Cookies.get("Join") == undefined){
            joinOrCreate = 0;
        }else{
            joinOrCreate = 1;
        }
        
        if(joinOrCreate != -1)
            this.dialog.notify(this,"nexusStartMatch",{
                parameter: joinOrCreate,
                chatNode: $("#chat-insert")
            });
    }

    updateCardStats(id: string, stats: any) {
        const currentCard = this.playerMap.get(id);
        currentCard.update(stats);
    }

    drawLocalPlayer = ():void =>{
        this.playerMap.set(this.localSessionID, new CardComponent($("#bottom"), CardStatusHandler.GameHeroe, "650f38ee7aaeb67f7dfc712e", true,this));
    }

    drawNewPlayer = (sessionID: string, cardID: string) => {
        if (this.identifier < 3) {
            let node = "#top";
            if (this.identifier == 1) node = "#left"
            else if (this.identifier == 2) node = "#right"
            this.playerMap.set(sessionID, new CardComponent($(node), CardStatusHandler.GameHeroe, cardID, false, this));
            this.identifier++;
        }
    }

    enableButtonsForTurnAction = ():void =>{
        console.error("IMPLEMENTATION MISSING FOR ENABLE BUTTONS! ENABLED BY DEFAULT?");
    }

    disableButtonsForTurnAction = ():void =>{
        console.error("IMPLEMENTATION MISSING FOR DISABLE BUTTONS!");
    }
}
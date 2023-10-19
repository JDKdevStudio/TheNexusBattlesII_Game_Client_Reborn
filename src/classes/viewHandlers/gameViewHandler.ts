import Component from "../gameMediator/componentClass";
import Mediator from "../gameMediator/mediatorInterface";
import Cookies from "js-cookie";
import $ from "jquery";
import CardComponent from "../../components/cardComponent/cardComponent";
import { CardStatusHandler } from "../../components/cardComponent/enum/cardStatusEnum";
import InventoryManager from "../inventoryManager/inventoryManager";
import HeroDecoratorInterface from "../heroDecorator/decoratorInterface";

export enum EnemyCardInteractions {
    None,
    Attack
}

export class GameViewHandler extends Component {
    playerMap: Map<string, any>;
    decoratorMap:Map<string,HeroDecoratorInterface>;
    localSessionID: string;
    identifier: number = 0;
    current_action: EnemyCardInteractions = EnemyCardInteractions.None;
    inventoryManager: InventoryManager;

    constructor(dialog: Mediator, localSessionID: string) {
        super(dialog);
        this.localSessionID = localSessionID;
        this.playerMap = new Map<string, any>();
        this.decoratorMap = new Map<string,HeroDecoratorInterface>;
        this.inventoryManager = new InventoryManager(this, this.updateTextForDeck);
    }

    init = async (): Promise<void> => {
        let joinOrCreate = -1;
        if (Cookies.get("Join") == undefined) {
            joinOrCreate = 0;
        } else {
            joinOrCreate = 1;
        }

        if (joinOrCreate != -1)
            this.dialog.notify(this, "nexusStartMatch", {
                parameter: joinOrCreate,
                chatNode: $("#chat-insert")
            });
    }

    updateCardStats(id: string, stats: any) {
        const currentCard = this.playerMap.get(id);
        currentCard.update(stats);
    }

    drawLocalPlayer = (): void => {
        this.playerMap.set(this.localSessionID,
            new CardComponent($("#bottom"), CardStatusHandler.GameHeroe, this.inventoryManager.getLocalHeroData(), true, this));
        this.updateTextForDeck("30");
    }

    drawNewPlayer = (sessionID: string, cardID: string) => {
        if (this.identifier < 3) {
            let node = "#top";
            if (this.identifier == 1) node = "#left"
            else if (this.identifier == 2) node = "#right"

            this.inventoryManager.getCardDataByID(cardID).then((card) => {
                this.playerMap.set(sessionID, new CardComponent($(node), CardStatusHandler.GameHeroe,
                    card, false, this));
                this.identifier++;
                this.playerMap.get(sessionID).controller.getCardNode().on("click", () => {
                    this.dialog.notify(this, "rivalCardPressed", {
                        currentAction: this.current_action,
                        remoteID: sessionID
                    });
                });
            });
        }
    }

    registerPlayerDecorator = (sessionID:string):void=>{

    }

    enableButtonsForTurnAction = (): void => {
        console.error("IMPLEMENTATION MISSING FOR ENABLE BUTTONS! ENABLED BY DEFAULT?");
    }

    disableButtonsForTurnAction = (): void => {
        console.error("IMPLEMENTATION MISSING FOR DISABLE BUTTONS!");
    }

    setCurrentAction = (newAction: EnemyCardInteractions): void => {
        this.current_action = newAction;
    }

    handleRemoteAnim = (sessionID: string) => {
        /*let effectToPlay = "";
        if (sessionID == this.localSessionID) {
            effectToPlay = "pulsate"
        } else {
            effectToPlay = "shake"
        }

        this.playerMap.get(sessionID).controller.getCardNode().effect(effectToPlay);*/
    };

    updateTextForDeck = (ammount: string) => {
        $("#count").text(`Restantes:${ammount}`)
    }
}
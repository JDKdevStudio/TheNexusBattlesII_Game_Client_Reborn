import Component from "../gameMediator/componentClass";
import Mediator from "../gameMediator/mediatorInterface";
import Cookies from "js-cookie";
import $ from "jquery";
import CardComponent from "../../components/cardComponent/cardComponent";
import { CardStatusHandler } from "../../components/cardComponent/enum/cardStatusEnum";
import InventoryManager from "../inventoryManager/inventoryManager";
import HeroDecoratorInterface from "../heroDecorator/decoratorInterface";
import CardDraggableWrapper from "../cardDraggableWrapper/cardDraggableWrapper";
import ConsumibleType from "../../types/consumibleType";
import StrategyContext from "../gameStrategy/context/gameStrategyContext";
import AddBuffStrategy from "../gameStrategy/strategies/addBuffStrategy";
import HeroDecorator from "../heroDecorator/decoratorHero";
import HeroeType from "../../types/heroeType";
import { CardOwner } from "../../components/cardComponent/enum/cardOwnerEnum";
import HeroDecoratorBase from "../heroDecorator/decoratorBase";

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
    strategyContext: StrategyContext;

    constructor(dialog: Mediator) {
        super(dialog);
        this.playerMap = new Map<string, any>();
        this.decoratorMap = new Map<string,HeroDecoratorInterface>();
        this.inventoryManager = new InventoryManager(this, this.updateTextForDeck);
        this.strategyContext =  new StrategyContext();
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

    setMyLocalSessionID(id:string){
        this.localSessionID = id;
    }

    updateCardStats(id: string, stats: any) {
        const currentCard = this.playerMap.get(id);
        currentCard.update(stats);
    }

    drawLocalPlayer = (): void => {    
        this.playerMap.set(this.localSessionID,
            new CardComponent($("#bottom"), CardStatusHandler.GameHeroe, this.inventoryManager.getLocalHeroData(), CardOwner.Local, this));
        new CardDraggableWrapper(this.playerMap.get(this.localSessionID),false,undefined,this.handleOnDrop);
        console.log(this.inventoryManager.getLocalHeroData())
        this.decoratorMap.set(this.localSessionID,new HeroDecoratorBase(this.inventoryManager.getLocalHeroData()));
        this.updateTextForDeck("30");
    }

    drawNewPlayer = (sessionID: string, cardID: string) => {
        if (this.identifier < 3) {
            let node = "#top";
            if (this.identifier == 1) node = "#left"
            else if (this.identifier == 2) node = "#right"

            this.inventoryManager.getCardDataByID(cardID).then((card) => {
                this.playerMap.set(sessionID, new CardComponent($(node), CardStatusHandler.GameHeroe,
                    card, CardOwner.Enemy, this));
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

    registerPlayerDecorator = (data:HeroeType):void=>{
        const tmpDer = new HeroDecorator(data,this.decoratorMap.get(this.localSessionID) as HeroDecoratorInterface,-1)
        this.decoratorMap.set(this.localSessionID,tmpDer);
        const localCard = this.playerMap.get(this.localSessionID) as CardComponent;
        localCard.controller.updateCardStats(this.inventoryManager.getLocalHeroData(),this.decoratorMap.get(this.localSessionID) as HeroDecorator);
    }

    registerRemoteDecorator = ():void =>{

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

    handleOnDrop =(data:ConsumibleType, cardComponent:CardComponent):void =>{
        switch(data.efecto.id_estrategia){
            //Modifica una estadistica del jugador
            case 0:
                console.log("Vamos a modificar una estadística del jugador");
                this.strategyContext.setStrategy(new AddBuffStrategy());
            break;

            //Modifica una estadística del oponente
            case 1:
            break;
        }

        this.strategyContext.executeStrategy(data,this.registerPlayerDecorator);
        this.inventoryManager.deleteCardFromActive(cardComponent);
        
    }
}
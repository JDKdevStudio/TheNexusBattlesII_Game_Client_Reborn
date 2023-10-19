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
        this.disableButtonsForTurnAction();
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
                this.inventoryManager.cardRepository.set(cardID,card);
                this.decoratorMap.set(sessionID,new HeroDecoratorBase(card as HeroeType));

                this.playerMap.get(sessionID).controller.getCardNode().on("click", () => {
                    this.dialog.notify(this, "rivalCardPressed", {
                        currentAction: this.current_action,
                        remoteID: sessionID,
                    });
                });
            });
        }
    }

    registerPlayerDecorator = (data:HeroeType,validTurns:number):void=>{
        const tmpDer = new HeroDecorator(data,this.decoratorMap.get(this.localSessionID) as HeroDecoratorInterface,validTurns)
        this.decoratorMap.set(this.localSessionID,tmpDer);
        const localCard = this.playerMap.get(this.localSessionID) as CardComponent;
        localCard.controller.updateCardStats(this.inventoryManager.getLocalHeroData(),this.decoratorMap.get(this.localSessionID) as HeroDecorator);
        this.dialog.notify(this,"createdLocalDecorator",{
            remoteID: this.localSessionID,
            heroe:data,
            turnos:validTurns,
            remoteCardID: this.inventoryManager.heroInitialID
        });
    }

    registerRemoteDecorator = (remoteID:string, data:HeroeType,validTurns:number,remoteCardID:string):void =>{
        this.inventoryManager.getCardDataByID(remoteCardID).then((card) => {            
            const tmpDer = new HeroDecorator(data,this.decoratorMap.get(remoteID) as HeroDecoratorInterface,validTurns)
            this.decoratorMap.set(remoteID,tmpDer);
            const localCard = this.playerMap.get(remoteID) as CardComponent;
            localCard.controller.updateCardStats(card as HeroeType,this.decoratorMap.get(remoteID) as HeroDecorator);
        });
    }

    enableButtonsForTurnAction = (): void => {
        this.playerMap.get(this.localSessionID).controller.setButtonsAction(true);
        //console.error("IMPLEMENTATION MISSING FOR ENABLE BUTTONS! ENABLED BY DEFAULT?");
    }

    disableButtonsForTurnAction = (): void => {
        this.playerMap.get(this.localSessionID).controller.setButtonsAction(false);
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
        this.strategyGenerator(data.efecto.id_estrategia);
        this.strategyContext.executeStrategy(data,this.registerPlayerDecorator);

        if(data.efectoHeroe != undefined){
            const myCard = this.playerMap.get(this.localSessionID);
            if(data.clase == myCard.controller.clase && data.tipo == myCard.controller.tipo){
                this.strategyGenerator(data.efectoHeroe.id_estrategia);
                this.strategyContext.executeStrategy(data,this.registerPlayerDecorator,true);
            }
        }

        this.inventoryManager.deleteCardFromActive(data);   
        this.dialog.notify(this,"ClientSkipAction",{});
    }

    strategyGenerator = (id:number):void =>{
        switch(id){
            //Modifica una estadistica del jugador
            case 0:
                this.strategyContext.setStrategy(new AddBuffStrategy());
            break;

            //Modifica una estadística del oponente
            case 1:
            break;
        }
    }

    updateDecorators = ():void =>{
        this.decoratorMap.forEach((value,_)=>{
            value.reduceTurnsRemaining();
        });
    }

    getDamageValue = (enemy:string):number =>{
        const cartaLocal = this.decoratorMap.get(this.localSessionID);
        const enemyCard = this.decoratorMap.get(enemy)
        let daño = 0;
        if(cartaLocal != undefined && enemyCard != undefined){
            const ataque = cartaLocal.getAtaque() + Math.floor(Math.random() * (cartaLocal.getAtaque() - 1 + 1) + 1);
            if(ataque > enemyCard.getDefensa()){
                daño = Math.floor(Math.random() * (cartaLocal.getDano() - 1 + 1) + 1);
            }
        }
        this.updateClientEffectiveDamage(this.localSessionID,daño)
        return daño;
    }

    updateClientEffectiveDamage(id:string,num:number){
        this.playerMap.get(id).controller.updateEfectiveDamage(num);
    }
}
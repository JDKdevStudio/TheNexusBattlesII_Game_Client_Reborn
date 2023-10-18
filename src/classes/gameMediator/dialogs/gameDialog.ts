import Chat from "../../../components/chatComponent/chatComponent";
import { chatMessageType } from "../../../components/chatComponent/types/messageType";
import { NexusClient } from "../../nexusClient/nexusClient";
import Component from "../componentClass";
import Mediator from "../mediatorInterface";
import { gameStateContext, stateType } from "../../gameState/gameStateMachine";
import TurnManager from "../../turnManager/turnManager";
import {GameViewHandler, EnemyCardInteractions} from "../../viewHandlers/gameViewHandler";

export default class GameDialog implements Mediator{
    private nexusClient:NexusClient;
    private chatComponent:Chat;
    private stateMachine: gameStateContext;
    private turnManager:TurnManager;
    private gameViewHandler:GameViewHandler;

    constructor(){
        this.nexusClient = new NexusClient(this);
        this.chatComponent = new Chat(this);
        this.stateMachine = new gameStateContext(this);        
        this.turnManager = new TurnManager(this);
        this.gameViewHandler = new GameViewHandler(this,this.nexusClient.sessionId);
    }

    init = () =>{
        this.gameViewHandler.init();
    }

    notify(sender: Component, event: string,args:any): any {
        if(sender == this.nexusClient){
            this.handleNexusClientEvent(event,args);
        }

        if(sender == this.chatComponent){
            this.handleChatEvent(event,args);
        }

        if(sender == this.gameViewHandler){
            this.handleViewEvent(event,args);
        }

        if(sender == this.stateMachine){
            return this.handleStateMachineEvent(event,args);
        }

        if(sender == this.turnManager){
            this.handleTurnManagerEvent(event,args);
        }
    }

    private handleTurnManagerEvent(event:string,args:any){
        switch(event){
            case "newRound":
                this.stateMachine.drawAnnouncer("Turno: " + args.turn);  
            break;

            case "yourTurn":
                this.gameViewHandler.enableButtonsForTurnAction();    
            break;

            case "notYourTurn":
                this.stateMachine.drawAnnouncer("Turno: " + args.turn);  
                this.gameViewHandler.disableButtonsForTurnAction();
            break;

            case "updateCounterData":
                this.stateMachine.drawAnnouncer(`Es tu turno! (Restante: ${args.timer}s)`);
            break;

            case "actionFinishTurn":
                this.stateMachine.drawAnnouncer("Comunicando...");
                this.nexusClient.sendClientFinishedTurn();
            break;
        }
    }

    private handleViewEvent(event:string, args:any){
        switch(event){
            case "nexusStartMatch":
                if(args.parameter == 0){
                    this.nexusClient.nexusClientCreateRoom();
                }else if(args.parameter == 1){
                    this.nexusClient.nexusClientJoinRoom();
                }
                this.chatComponent.init(args.chatNode);
            break;

            case "ClientSkipAction":
                this.turnManager.actionFinishTurn();
            break;

            case "rivalCardPressed":
                switch(args.currentAction){
                    case EnemyCardInteractions.None:
                        console.log("None!");
                    break;

                    case EnemyCardInteractions.Attack:
                        const players = this.nexusClient.nexusClientGetPlayers();
                        
                        if((players.get(args.remoteID).team != players.get(this.nexusClient.sessionId).team) || (players.get(args.remoteID).team == -1)){
                            //console.log("Attack!")
                            this.nexusClient.sendClientAttack(args.remoteID);
                            this.turnManager.actionFinishTurn();
                            this.gameViewHandler.setCurrentAction(EnemyCardInteractions.None);
                        }               
                    break;
                }
            break;
        }
    }

    private handleChatEvent = (event:string,args:chatMessageType):void => {
        switch(event){
            case "sendChatMessage":
                const message = args.toString();
                this.nexusClient.sendChatMessage(message);
            break;
        }
    }

    private handleNexusClientEvent = (event:string,args:any):void =>{
        switch(event){
            case "newChatStatusMessage":
            case "newChatGeneralMessage":
                const message = args as chatMessageType;
                this.chatComponent.insertNewMessage(message.player_name,message.message_content);  
            break;

            case "nexusJoinedRoom":
                this.stateMachine.init();
            break;

            case "nexusClientJoinedRoom":
                if (this.stateMachine.currentState == stateType.WaitingRoom) {
                    this.stateMachine.drawToScreen();
                    this.chatComponent.insertNewMessage(args.username,"Se ha unido!");
                }
            break;

            case "nexusClientLeftRoom":
                if(this.stateMachine.currentState == stateType.WaitingRoom){
                    this.stateMachine.drawToScreen();
                    this.chatComponent.insertNewMessage(args.username,"Ha salido!");
                }    
            break;

            case "nexusRoomReady":
                this.stateMachine.changeMachineState(stateType.Inventory);
                this.stateMachine.drawToScreen();                
            break;

            case "nexusFinishInventory":
                this.stateMachine.changeMachineState(stateType.Gameplay);
                this.stateMachine.drawToScreen();
                this.gameViewHandler.drawLocalPlayer();
            break;
            
            case "nexusGetTurn":
                this.gameViewHandler.disableButtonsForTurnAction();
                this.nexusClient.sendLocalCardID(this.gameViewHandler.inventoryManager.heroInitialID);
                this.turnManager.setAssignerTurn(args.turn,this.nexusClient.nexusClientGetPlayers().size);
            break;
                
            case "playerHasTerminatedTurn":
                console.log("Message from colyseus")
                this.turnManager.handleTurnProgress();    
            break;

            case "registerRemotePlayerCard":
                this.gameViewHandler.drawNewPlayer(args.remoteID,args.cardID);
            break;

            case "remoteAttackRecieved":
                this.gameViewHandler.handleRemoteAnim(args.remoteID);
            break;
        }
    }

    private handleStateMachineEvent(event:string,args:any):any{
        let myReturn:any = -1;
        switch(event){
            case "nexusClientGetPlayers":
                myReturn = this.nexusClient.nexusClientGetPlayers();
            break;

            case "clientLoadedGameView":
                this.nexusClient.sendClientGameViewLoaded();
            break;

            case "getSessionID":
                myReturn = this.nexusClient.sessionId;    
            break;

            case "getDataFromInventory":
                this.gameViewHandler.inventoryManager.setFromInventory(args.cardDictionary,args.cardDeck);
                this.stateMachine.changeMachineState(stateType.Gameplay);
                this.stateMachine.drawToScreen();
            break;
        }
        return myReturn;
    }
}
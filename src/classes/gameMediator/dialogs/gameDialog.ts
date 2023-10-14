import Chat from "../../../components/chatComponent/chatComponent";
import { chatMessageType } from "../../../components/chatComponent/types/messageType";
import { NexusClient } from "../../nexusClient/nexusClient";
import Component from "../componentClass";
import Mediator from "../mediatorInterface";
import { gameStateContext, stateType } from "../../gameState/gameStateMachine";
import TurnManager from "../../turnManager/turnManager";
import GameViewHandler from "../../viewHandlers/gameViewHandler";

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
        this.turnManager = new TurnManager(this,this.nexusClient.nexusClientGetPlayers().size);
        this.gameViewHandler = new GameViewHandler(this);
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
                //this.stateMachine.changeMachineState(stateType.Inventory);
                //this.stateMachine.drawToScreen();                
                this.stateMachine.changeMachineState(stateType.Gameplay);
                this.stateMachine.communicatorBreaker("init");
            break;
            
            case "nexusGetTurn":
                this.stateMachine.communicatorBreaker("matchStart");
                this.turnManager.setAssignerTurn(args.turn);
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
        }
        return myReturn;
    }
}
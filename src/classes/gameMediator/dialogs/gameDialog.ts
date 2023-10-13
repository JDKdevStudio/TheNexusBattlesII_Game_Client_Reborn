import Chat from "../../../components/chatComponent/chatComponent";
import { chatMessageType } from "../../../components/chatComponent/types/messageType";
import GeneralViewHandler from "../../viewHandlers/generalViewHandler";
import { NexusClient } from "../../nexusClient/nexusClient";
import Component from "../componentClass";
import Mediator from "../mediatorInterface";
import { gameStateContext } from "../../gameState/gameStateMachine";
import TurnManager from "../../turnManager/turnManager";
import GameViewHandler from "../../viewHandlers/gameViewHandler";

export default class GeneralDialog implements Mediator{
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
    }

    private handleViewEvent(event:string, args:any){
        switch(event){
            case "nexusStartMatch":
                if(args.parameter == 0){
                    this.nexusClient.nexusClientCreateRoom();
                }else if(args.parameter == 2){
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
                this.nexusClient.SendChatMessage(message);
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

            case "":
                
            break;
        }
    }
}
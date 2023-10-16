import Chat from "../../../components/chatComponent/chatComponent";
import { chatMessageType } from "../../../components/chatComponent/types/messageType";
import GeneralViewHandler from "../../viewHandlers/generalViewHandler";
import { NexusClient } from "../../nexusClient/nexusClient";
import Component from "../componentClass";
import Mediator from "../mediatorInterface";

export default class GeneralDialog implements Mediator{
    private nexusClient:NexusClient;
    private chatComponent:Chat;
    private generalView: GeneralViewHandler;

    constructor(){
        this.nexusClient = new NexusClient(this);
        this.chatComponent = new Chat(this);
        this.generalView = new GeneralViewHandler(this);
    }

    init = () =>{
        this.generalView.init();
        this.chatComponent.init(this.generalView.getChatNode());
    }

    notify(sender: Component, event: string,args:any): any {
        if(sender == this.nexusClient){
            this.handleNexusClientEvent(event,args);
        }

        if(sender == this.chatComponent){
            this.handleChatEvent(event,args);
        }

        if(sender == this.generalView){
            return this.handleGeneralViewEvent(event,args);
        }
    }

    private handleGeneralViewEvent = (event:string,_:any):any => {
        let operationResult = undefined;
        switch(event){
            case "nexusJoinGlobalRoom":
                this.nexusClient.nexusClientHandleGlobalRoom();
            break;

            case "nexusSearchRooms":
                operationResult = this.nexusClient.nexusClientGetAvaliableRooms();
            break;
        }
    
        return operationResult;
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
            case "newChatGeneralMessage":
                const message = args as chatMessageType;
                this.chatComponent.insertNewMessage(message.player_name,message.message_content);  
            break;
        }
    }
}
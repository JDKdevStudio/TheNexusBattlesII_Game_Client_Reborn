import { NexusClient } from "../../../utils/nexusClient";
import { chatMessageType } from "../types/messageType";
import ChatView from "../view/chatView";

export default class ChatController{
    constructor(private readonly view:ChatView){}

    init =(node:JQuery<HTMLDivElement>):void =>{
        this.view.init(node,this.sendMessage);
    }

    insertNewMessage = (message:chatMessageType) =>{
        this.view.insertNewMessage(message);
    }

    sendMessage = (message:string):void =>{
        console.log("sending");
        
        NexusClient.SendChatMessage(message);
    }
}
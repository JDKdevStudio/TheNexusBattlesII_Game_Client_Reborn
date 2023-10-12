import Chat from "../chatComponent";
import { chatMessageType } from "../types/messageType";
import ChatView from "../view/chatView";

export default class ChatController{
    constructor(private readonly view:ChatView,private readonly chat:Chat){}

    init =(node:JQuery<HTMLDivElement>):void =>{
        this.view.init(node,this.sendMessage);
    }

    insertNewMessage = (message:chatMessageType) =>{
        this.view.insertNewMessage(message);
    }

    sendMessage = (message:string):void =>{
        console.log("sending");
        this.chat.dialog.notify(this.chat,"sendChatMessage",message);
    }
}
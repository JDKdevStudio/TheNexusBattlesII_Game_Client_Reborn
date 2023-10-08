import ChatController from "./controller/chatController";
import { chatMessageType } from "./types/messageType";
import ChatView from "./view/chatView";

export default class Chat{
    private readonly controller:ChatController;

    constructor(){
        this.controller =  new ChatController(new ChatView());
    }

    init = (node:JQuery<HTMLDivElement>):void => {
        this.controller.init(node);
    }

    insertNewMessage(player_name:string, message:string){
        this.controller.insertNewMessage({
            player_name: player_name,
            message_content: message,
        } as chatMessageType);
    }
}
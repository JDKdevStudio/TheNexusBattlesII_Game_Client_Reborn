import Component from "../../classes/gameMediator/componentClass";
import Mediator from "../../classes/gameMediator/mediatorInterface";
import ChatController from "./controller/chatController";
import { chatMessageType } from "./types/messageType";
import ChatView from "./view/chatView";

export default class Chat extends Component{
    private readonly controller:ChatController;

    constructor(dialog:Mediator){
        super(dialog);
        this.controller =  new ChatController(new ChatView(),this);
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
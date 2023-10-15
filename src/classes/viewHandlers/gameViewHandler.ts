import Component from "../gameMediator/componentClass";
import Mediator from "../gameMediator/mediatorInterface";
import Cookies from "js-cookie";
import $ from "jquery";

export default class GameViewHandler extends Component{
    constructor(dialog:Mediator){
        super(dialog);
    }

    init = async():Promise<void> => {
        let joinOrCreate = -1;
        if(Cookies.get("Join") == undefined){
            joinOrCreate = 0;
        }else{
            joinOrCreate = 1;
        }
        
        if(joinOrCreate != -1)
            this.dialog.notify(this,"nexusStartMatch",{
                parameter: joinOrCreate,
                chatNode: $("#chat-insert")
            });
    }
}
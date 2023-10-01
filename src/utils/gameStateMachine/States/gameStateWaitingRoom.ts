import {gameStateContext} from "./gameStateMachine";
import { State } from "./gameStateInferface"

export default class stateWaitingRoom extends State{
    constructor(gameContext:gameStateContext){
        super(gameContext);
    }

    drawToScreen(): void {
        this.gameScene.drawAnnouncer("Esperando jugadores");

        

        console.log("WaitingRoomCalled!");
    }
}
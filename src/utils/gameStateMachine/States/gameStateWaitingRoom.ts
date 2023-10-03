import {gameStateContext} from "./gameStateMachine";
import { State } from "./gameStateInferface"

export default class stateWaitingRoom extends State{

    drawToScreen(): void {
        gameStateContext.drawAnnouncer("Esperando jugadores");

        //Dibujar la sala de espera


        console.log("WaitingRoomCalled!");
    }
}
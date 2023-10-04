import {gameStateContext} from "./gameStateMachine";
import { State } from "./gameStateInferface"
import { NexusClient } from "../../nexusClient";

export default class stateWaitingRoom extends State{
    drawToScreen(): void {
        gameStateContext.drawAnnouncer("Esperando jugadores");

        const players:Map<string,any> = NexusClient.nexusClientGetPlayers();
        
        for(let [key,val] of players){
            
        }

        console.log("WaitingRoomCalled!");
    }
}
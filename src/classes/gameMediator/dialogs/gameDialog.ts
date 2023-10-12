import { gameStateContext } from "../../gameState/gameStateMachine";
import TurnManager from "../../turnManager/turnManager";
import Component from "../componentClass";
import GeneralDialog from "./generalDialog";

export default class GameDialog extends GeneralDialog{
    private gameStateMachine:gameStateContext;
    private turnManager:TurnManager;

    constructor(){
        super();
        this.gameStateMachine = new gameStateContext();
        this.turnManager =  new TurnManager();
    }

    notify(sender: Component, event: string): void {
        throw new Error("Method not implemented.");
    }
}
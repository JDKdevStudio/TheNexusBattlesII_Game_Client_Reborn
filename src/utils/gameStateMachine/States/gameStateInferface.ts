import {gameStateContext} from "./gameStateMachine";

export abstract class State{
    
    protected gameScene:gameStateContext;

    constructor(gameScene:gameStateContext){
        this.gameScene = gameScene;
    }

    abstract drawToScreen():void;
}
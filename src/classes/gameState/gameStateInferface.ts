import { gameStateContext } from "./gameStateMachine";

export abstract class State {
    machine: gameStateContext;

    constructor(machine:gameStateContext){
        this.machine = machine;
    }
    
    abstract drawToScreen(): void;
}
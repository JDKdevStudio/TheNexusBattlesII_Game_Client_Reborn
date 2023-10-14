import { gameStateContext } from "./gameStateMachine";

export abstract class State {
    machine: gameStateContext;

    constructor(machine:gameStateContext){
        this.machine = machine;
    }
    
    abstract drawToScreen(): void;

    communicatorBreaker(_:string): void {
        console.error("Attemped to use communication breaker with a state that doesn't use it. \nIs this desired?");
    }
}
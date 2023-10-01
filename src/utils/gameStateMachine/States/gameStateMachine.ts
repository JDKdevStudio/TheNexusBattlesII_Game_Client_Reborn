import { State } from "./gameStateInferface";
import stateWaitingRoom from "./gameStateWaitingRoom";
import $ from "jquery";

/*
    Welcome to the main game view's state machine!

    This lets us change betweeen different HTML Templates
    based on the current state of the game.
    This code was built uppon the following pattern: https://refactoring.guru/design-patterns/state
    Please refer to the article in case you need guidance.

    For now, the following states are considered:
    - Connection Error -> The game is unable to connec to colyseus or another unexpected network event took place.
    - Waiting Room -> The game is waiting for players to fill up spots in the created room.
    - Inventory -> The game is waiting for players to select their cards.
    - Gameplay -> The game is currently running on the main "Scene"
    - Results -> The game is drawing a message according to the results of the match ("Win/Lose").
    - Rewards -> ?

    Please note this class might expand in the future.
*/

export class gameStateContext{
    //Reference to the object of a class that is a children of an interface
    functionalState:State;

    //In the constructor we assume the first state ever is Waiting Room.
    constructor(){ 
        this.functionalState = new stateWaitingRoom(this);
        console.log("Generated Machine!"); 
    }

    //Let's you change between states from a remote object.
    changeMachineState(newState:State) {
        this.functionalState = newState;
    }

    //This function clears the game view then draws based upon current state object.
    drawToScreen(){
        $("#main-game-view").html("");
        this.functionalState.drawToScreen();
    }

    //This function can be accesed to change the announcer's text
    drawAnnouncer(message:string){
        $("#room-announcer").text(message);
    }
}
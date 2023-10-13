import { State } from "./gameStateInferface";
import $ from "jquery";
import {stateWaitingRoom,stateInventory} from "./gameStates";
import Component from "../gameMediator/componentClass";
import Mediator from "../gameMediator/mediatorInterface";

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

export enum stateType {
    GeneralScreen,
    ConnectionError,
    WaitingRoom,
    Inventory,
    Gameplay,
    Results,
    Rewards
}

export class gameStateContext extends Component {
    //Reference to the object of a class that is a children of an interface
    functionalState: State;
    currentState: stateType;

    constructor(dialog:Mediator){
        super(dialog);
    }

    init():void{
        this.changeMachineState(stateType.WaitingRoom);
        this.drawToScreen();
    }

    //Let's you change between states from a remote object. When a state is changed the screen is redrawn.
    changeMachineState(newState: stateType) {
        switch (newState) {
            case stateType.GeneralScreen:
                console.log("State Machine: OK!");
                break;
            case stateType.ConnectionError:
                console.error("Connection Error Scene not defined yet.");
                break;
            case stateType.WaitingRoom:
                this.currentState = stateType.WaitingRoom;
                this.functionalState = new stateWaitingRoom(this);
                break;
            case stateType.Inventory:
                this.currentState = stateType.Inventory;
                this.functionalState = new stateInventory(this);
                break;
            case stateType.Gameplay:
                console.error("Gameplay Scene not defined yet.");
                break;
            case stateType.Results:
                console.error("Results Scene not defined yet.");
                break;
            case stateType.Rewards:
                console.error("Rewards Scene not defined yet.");
                break;
            default:
                console.error("State Machine Critical Error: Attempted to set an state that is undefined!");
                break;
        }
    }

    //This function clears the game view then draws based upon current state object.
    drawToScreen() {
        this.functionalState.drawToScreen();
    }

    //This function can be accesed to change the announcer's text
    drawAnnouncer(message: string) {
        $("#room-announcer").text(message);
    }
}
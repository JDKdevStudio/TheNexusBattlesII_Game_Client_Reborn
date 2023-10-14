import Component from "../gameMediator/componentClass";
import Mediator from "../gameMediator/mediatorInterface";

/* 
    Turn Manager

    Es una clase que permite manejar los turnos que se tendrán
    durante la partida.

    Guarda la ronda actual, el turno actual y el asignado.
*/
export default class TurnManager extends Component{
    currentRound:Number = 0;
    currentTurn:Number = 0;
    assignedTurn:Number = 0;

    constructor(mediator:Mediator){
        super(mediator);
    }

    setAssignerTurn(turn:number){
        console.log("Got Turn: ", turn);
        this.assignedTurn = turn;
    }

    handleTurnProgress = ()=>{
        
    }
}
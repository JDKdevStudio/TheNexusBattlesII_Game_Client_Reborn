import Component from "../gameMediator/componentClass";
import Mediator from "../gameMediator/mediatorInterface";

/* 
    Turn Manager

    Es una clase que permite manejar los turnos que se tendrán
    durante la partida.

    Guarda la ronda actual, el turno actual y el asignado.
*/
export default class TurnManager extends Component{
    private currentRound:number = 1;
    private currentTurn:number = 0;
    private assignedTurn:number = -1;
    private maxNumber:number = -1;

    constructor(mediator:Mediator,maxNumber:number){
        super(mediator);
        this.maxNumber = maxNumber;
    }

    setAssignerTurn(turn:number){
        console.log("Got Turn: ", turn);
        this.assignedTurn = turn;
        this.sendUpdateRoundSignal();
    }

    handleTurnProgress = ()=>{
        this.currentTurn += 1;
        if(this.currentTurn < this.maxNumber){
            if(this.currentRound == this.assignedTurn){
                //Disable Controls!
            }
        }else{
            this.currentRound += 1;
            this.currentTurn = 1;
            this.sendUpdateRoundSignal();
        }  
    }

    private sendUpdateRoundSignal = () => {
        this.dialog.notify(this,"newRound",{turn:this.currentRound});
    }
}
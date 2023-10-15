import Component from "../gameMediator/componentClass";
import Mediator from "../gameMediator/mediatorInterface";

/* 
    Turn Manager

    Es una clase que permite manejar los turnos que se tendrán
    durante la partida.

    Guarda la ronda actual, el turno actual y el asignado.
*/
export default class TurnManager extends Component {
    private currentRound: number = 1;
    private currentTurn: number = 1;
    private assignedTurn: number = -1;
    private maxNumber: number = -1;
    private intervID: any;

    constructor(mediator: Mediator) {
        super(mediator);
    }

    setAssignerTurn(turn: number,maxNumber:number): void {
        this.assignedTurn = turn;
        this.maxNumber = maxNumber;
        this.sendUpdateRoundSignal();
        this.checkForTurnActive();
    }

    checkForTurnActive(): void {
        if (this.currentTurn == this.assignedTurn) {
            this.dialog.notify(this, "yourTurn", { turn: this.currentRound });
            this.countdown();
        } else {
            this.dialog.notify(this, "notYourTurn", { turn: this.currentRound });
        }
    }

    handleTurnProgress = (): void => {
        this.currentTurn += 1;
        if (this.currentTurn > this.maxNumber) {
            this.currentRound += 1;
            this.currentTurn = 1;
            this.sendUpdateRoundSignal();
        }
        this.checkForTurnActive();
    }

    private sendUpdateRoundSignal = (): void => {
        this.dialog.notify(this, "newRound", { turn: this.currentRound });
    }

    countdown = (): void => {
        let timeleft = 60;
        this.intervID = setInterval(() => {
            if (timeleft > -1) timeleft--;
            if (timeleft == 0) {
                this.actionFinishTurn();
            } else {
                this.dialog.notify(this,"updateCounterData",{timer:timeleft});
            }
        }, 1000);
    }

    removeTimer = () => {
        clearInterval(this.intervID);
    }

    actionFinishTurn = () => {
        this.removeTimer();
        this.dialog.notify(this,"actionFinishTurn",{});
    }
}
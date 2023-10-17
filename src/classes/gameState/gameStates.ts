import { State } from "./gameStateInferface"
import { NexusPlayer } from "../../types/nexusPlayer";
import $ from "jquery";
import { gameStateContext } from "./gameStateMachine";
import CardComponent from "../../components/cardComponent/cardComponent";
import { CardStatusHandler } from "../../components/cardComponent/enum/cardStatusEnum";

export class stateWaitingRoom extends State {
    drawToScreen(): void {
        this.machine.drawAnnouncer("Esperando jugadores");
        const players: Map<string, NexusPlayer> = this.machine.dialog.notify(this.machine, "nexusClientGetPlayers", {}) as unknown as Map<string, NexusPlayer>;

        $.get("../../templates/waitingRoomPlayer.html", function (data: string) { //Get function lets you get the template from web server
            $("#main-game-view").empty();
            players.forEach((current_player: NexusPlayer) => {
                let response = data; //Iterate through all Players and draw them to screen
                let placeholders: Record<string, string> = {
                    "{{player_name_place_holder}}": current_player.username
                };

                //Replace in template
                for (let placeholder in placeholders) {
                    if (placeholders.hasOwnProperty(placeholder)) {
                        response = response.replace(placeholder, placeholders[placeholder]);
                    }
                }
                $('#main-game-view').append(response);//Finally append to UL in html
            });
        });
    }
}

export class stateInventory extends State {
    drawToScreen(): void {
        this.machine.drawAnnouncer("Inventario");
        $("#main-game-view").empty();
    }
}

export class stateInGame extends State {
    playerMap: Map<string, any>;
    localSessionID: string;

    constructor(machine: gameStateContext, localSessionID: string) {
        super(machine);
        this.localSessionID = localSessionID;
        this.playerMap = new Map<string, any>();
    }

    override communicatorBreaker(type: string, args: any): void {
        switch (type) {
            case "init":
                this.init();
                break;
            case "updateStats":
                break;
            case "yourTurn":
                $(".btn-skip").prop('disabled', false);
                break;
            case "notYourTurn":
                $(".btn-skip").prop('disabled', true);
                break;
        }
    }

    init(): void {
        this.drawToScreen();

        this.machine.dialog.notify(this.machine, "clientLoadedGameView", {});
        $("#main-game-view").on('click', ".btn-skip", () => {
            this.machine.dialog.notify(this.machine, "ClientSkipAction", {});
        });
    }

    updateCardStats(id: string, stats: any) {
        const currentCard = this.playerMap.get(id);
        currentCard.update(stats);
    }

    drawToScreen(): void {
        this.machine.drawAnnouncer("Esperando Inicio de Partida...");
        $("#main-game-view").empty();
        $('#main-game-view').append(
            `<div class="container-battle">
            <!-- Vista batalla -->
            <div class="col-2 player-col enemy" id="top"></div> <!-- Jugador enemigo -->
            <div class="col-2 player-col side-1" id="left"></div> <!-- Jugador extra 1 -->
            <div class="col-2 player-col side-2" id="right"></div> <!-- Jugador extra 2 -->
            <div class="col-2 player-col user" id="bottom"></div> <!-- Jugador principal -->
            <div class="col-2 card-deck"></div> <!-- Baraja -->
            <div class="col-2 card-hand"></div> <!-- Mano de juego -->
            <!-- Vista batalla -->
        </div>
        `
        );
        let identifier:number = 0;
        const playersInSession = this.machine.dialog.notify(this.machine, "nexusClientGetPlayers", {}) as unknown as Map<string, NexusPlayer>;
        playersInSession.forEach((player) => {
            if (player.sessionID == this.localSessionID)
                this.playerMap.set(player.sessionID, new CardComponent($("#bottom"), CardStatusHandler.GameHeroe, "650f38ee7aaeb67f7dfc712e", true));
            else{
                if(identifier<playersInSession.size)
                if(identifier == 0){
                    this.playerMap.set(player.sessionID, new CardComponent($("#top"), CardStatusHandler.GameHeroe, "650f38ee7aaeb67f7dfc712e", false));
                }else if(identifier == 1){
                    this.playerMap.set(player.sessionID, new CardComponent($("#left"), CardStatusHandler.GameHeroe, "650f38ee7aaeb67f7dfc712e", false));
                }else{
                    this.playerMap.set(player.sessionID, new CardComponent($("#right"), CardStatusHandler.GameHeroe, "650f38ee7aaeb67f7dfc712e", false));
                }
                identifier ++;
            }
        });
    }
}
import { State } from "./gameStateInferface"
import { NexusPlayer } from "../../types/nexusPlayer";
import $ from "jquery";
import { gameStateContext } from "./gameStateMachine";

export class stateWaitingRoom extends State{
    drawToScreen(): void {
        this.machine.drawAnnouncer("Esperando jugadores");
        const players: Map<string, NexusPlayer> = this.machine.dialog.notify(this.machine,"nexusClientGetPlayers",{}) as unknown as Map<string,NexusPlayer>;
        
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

export class stateInGame extends State{
    playerMap:Map<string,any>;

    constructor(machine:gameStateContext){
        super(machine);
        this.playerMap = new Map<string,any>();
    }

    override communicatorBreaker(type:string,args:any):void{
        switch(type){
            case "init":
                this.init();
                break;
            case "updateStats":
                break;
            case "yourTurn":
                $(".btn-skip").prop('disabled',false);
                break;
            case "notYourTurn":                
                $(".btn-skip").prop('disabled',true);
                break;
        }
    }

    init():void{
        const playersInSession = this.machine.dialog.notify(this.machine,"nexusClientGetPlayers",{}) as unknown as Map<string,NexusPlayer>;
        playersInSession.forEach((player)=>{
            this.playerMap.set(player.sessionID,{});
        });

        this.drawToScreen();
        this.machine.dialog.notify(this.machine,"clientLoadedGameView",{});

        $("#main-game-view").on('click',".btn-skip",()=>{
            this.machine.dialog.notify(this.machine,"ClientSkipAction",{});
        });
    }

    updateCardStats(id:string,stats:any){
        const currentCard = this.playerMap.get(id);
        currentCard.update(stats);
    }

    drawToScreen(): void {
        this.machine.drawAnnouncer("Esperando Inicio de Partida...");

        $.get("../../layouts/inGameLayout.html", function (data: string) { 
            $("#main-game-view").empty(); 
            $('#main-game-view').append(data);
        });
    }
}
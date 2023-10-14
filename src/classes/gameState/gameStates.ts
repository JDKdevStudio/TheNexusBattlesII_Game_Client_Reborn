import { State } from "./gameStateInferface"
import { NexusPlayer } from "../../types/nexusPlayer";
import $ from "jquery";

export class stateWaitingRoom extends State{
    drawToScreen(): void {
        this.machine.drawAnnouncer("Esperando jugadores");
        const players: Map<string, NexusPlayer> = this.machine.dialog.notify(this.machine,"nexusClientGetPlayers",{}) as unknown as Map<string,NexusPlayer>;
        // NexusClient.nexusClientGetPlayers();
        
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
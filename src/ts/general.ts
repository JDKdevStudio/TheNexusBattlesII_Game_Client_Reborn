import $ from "jquery";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { ColyseusNexusClient } from "../utils/colyseusClient";
import { NexusRoom } from "../types/nexusRoom";
import { validarNombreSala } from "./roomConfig"; 

$("#btn-create-room").on("click", function () { 
    if (validarNombreSala()) { 
        $("#roomConfig").show();
    }
});

/*
    This function lets you consult and draw to screen the current rooms in
    the redis database.
*/
const loadRoomDataOnList = async () => {
    $("#party-list").empty(); //Empty the view
    let availableRooms = await ColyseusNexusClient.nexusClientGetAvaliableRooms(); //Get room data from colyseus redis driver
    if (availableRooms.length > 0) { //If there's data
        $.get("../templates/partyListItem.html", function (data: string){ //Get function lets you get the template from web server
            availableRooms.forEach((current_room: NexusRoom) => {
                let response = data; //Iterate through all rooms and draw them to screen
                let placeholders: Record<string, string> = {
                    "{{id_placeholder}}": current_room.roomId,
                    "{{name_placeholder}}": current_room.roomMedatadataNombre,
                    "{{current_placeholder}}": current_room.roomMetadataClients,
                    "{{max_placeholder}}": current_room.roomMetadataMaxClients,
                    "{{mode_placeholder}}": "TBD", //TODO: Implement metadata for gamemode
                    "{{bonus_placeholder}}": current_room.roomMetadataGanancia,
                };
                //Replace in template
                for (let placeholder in placeholders) {
                    if (placeholders.hasOwnProperty(placeholder)) {
                        response = response.replace(placeholder, placeholders[placeholder]);
                    }
                }
                $('#party-list').append(response);//Finally append to UL in html
            });
        });
    }
}

$('#refresh-button').on('click', loadRoomDataOnList);
$(loadRoomDataOnList);
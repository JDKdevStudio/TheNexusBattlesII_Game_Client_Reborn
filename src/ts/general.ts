import * as $ from "jquery";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { ColyseusNexusClient } from "../utils/colyseusClient";
import { NexusRoom } from "../types/nexusRoom";

$("#btn-create-room").on("click", function () {
    $("#modal-create-room").load("../components/roomConfigComponent/roomConfig.html", () => {
        $("#roomConfig").show();
    });
})

const loadRoomDataOnList = async () => {
    $("#party-list").empty();
    let availableRooms = await ColyseusNexusClient.nexusClientGetAvaliableRooms();
    if (availableRooms.length > 0) {
        $.get("../templates/partyListItem.html", function (data: string) {
            availableRooms.forEach((current_room: NexusRoom) => {
                let response = data;
 
                let placeholders: Record<string, string> = {
                    "{{id_placeholder}}": current_room.roomId,
                    "{{name_placeholder}}": current_room.roomMedatadataNombre,
                    "{{current_placeholder}}": current_room.roomMetadataClients,
                    "{{max_placeholder}}": current_room.roomMetadataMaxClients,
                    "{{mode_placeholder}}": "TBD",
                    "{{bonus_placeholder}}": current_room.roomMetadataGanancia,
                };

                for (let placeholder in placeholders) {
                    if (placeholders.hasOwnProperty(placeholder)) {
                        console.log(placeholders[placeholder])
                        response = response.replace(placeholder, placeholders[placeholder]);
                        console.log(response);

                    }
                }
                $('#party-list').append(response);
            });
        });
    }
}

$('#refresh-button').on('click', loadRoomDataOnList);
import $ from "jquery";
import Cookies from "js-cookie";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { NexusClient } from "../utils/nexusClient";
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
const loadRoomDataOnList = async (): Promise<boolean> => {
    try {
        $("#party-list").empty(); //Empty the view
        let availableRooms = await NexusClient.nexusClientGetAvaliableRooms(); //Get room data from colyseus redis driver
        if (availableRooms.length > 0) { //If there's data
            $.get("../templates/partyListItem.html", function (data: string) { //Get function lets you get the template from web server
                availableRooms.forEach((current_room: NexusRoom) => {
                    let response = data; //Iterate through all rooms and draw them to screen
                    let placeholders: Record<string, string> = {
                        "{{id_placeholder}}": current_room.roomId,
                        "{{name_placeholder}}": current_room.roomMedatadataNombre,
                        "{{current_placeholder}}": current_room.roomMetadataClients,
                        "{{max_placeholder}}": current_room.roomMetadataMaximoClients,
                        "{{bonus_placeholder}}": current_room.roomMetadataGanancia,
                        "{{mode_placeholder}}": current_room.roomMetadataEquipos,
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
        return true;
    } catch { return false; }
}

$('#refresh-button').on('click', loadRoomDataOnList);
//$(loadRoomDataOnList);

//Creates a function that allows buttons on playlist to generate a cookie w/ room ID.
$("#party-list").on("click", ".join-party-button", function (this: HTMLElement) {
    // Find the closest card element to the clicked button
    var joining_room_id = $(this).closest(".card ").find(".card-header").html();

    //Cookie Logic
    Cookies.remove("Join");

    Cookies.set('Join', joining_room_id, {
        expires: new Date(Date.now() + 3 * 60 * 1000),
        path: '/',
        //domain: 'juego.thenexusbattles2.cloud',
        secure: true,
        sameSite: "Lax"
    });

    //redirect
    window.location.href = "./gameView.html";
});
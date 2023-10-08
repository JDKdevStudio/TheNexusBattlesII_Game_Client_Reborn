import $ from "jquery";
import Cookies from "js-cookie";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { NexusClient } from "../utils/nexusClient";
import { NexusRoom } from "../types/nexusRoom";
import { validarNombreSala } from "./roomConfig";
//import HeroDecoratorBase from "../classes/Decorator/decoratorBase";
//import HeroeType from "../types/heroeType";
//import HeroDecorator from "../classes/Decorator/decoratorHero";
//import Chat from "../components/chatComponent/chatComponent";

$("#btn-create-room").on("click", function () {
    if (validarNombreSala()) {
        $("#roomConfig").show();
    }
});

const initializeGeneralView = async():Promise<void> => {
    loadRoomDataOnList();
    NexusClient.nexusClientHandleGlobalRoom();
}

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
$(initializeGeneralView);

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

/*
//Create Hero Base
let myDefaultHero = new HeroDecoratorBase({
    vida:10,
    poder:1,
    defensa:10,
    ataqueRnd:3,
    ataqueBase: 10,
    daño: 0
} as HeroeType);

console.log("------------ TURNO 0 -------------");
console.log("Vida: " + myDefaultHero.getVida());
console.log("Ataque: " + myDefaultHero.getAtaque());
console.log("Defensa: " + myDefaultHero.getDefensa());
console.log("Poder: " + myDefaultHero.getPoder());
console.log("Daño:  " + myDefaultHero.getDano());


//Create New Hero Decorator
myDefaultHero = new HeroDecorator({
    vida:100,
    poder:-1,
    defensa:11000000000,
    ataqueRnd:0,
    ataqueBase: 20,
    daño: 0
} as HeroeType, myDefaultHero,1);

//Decorate the hero decorator
myDefaultHero = new HeroDecorator({
    vida:200,
    poder:0,
    defensa:0,
    ataqueRnd:0,
    ataqueBase: 0,
    daño: 600
} as HeroeType, myDefaultHero,2);

console.log("------------ TURNO 1 -------------");
console.log("Vida: " + myDefaultHero.getVida());
console.log("Ataque: " + myDefaultHero.getAtaque());
console.log("Defensa: " + myDefaultHero.getDefensa());
console.log("Poder: " + myDefaultHero.getPoder());
console.log("Daño:  " + myDefaultHero.getDano());

myDefaultHero.reduceTurnsRemaining();

console.log("------------ TURNO 2 -------------");
console.log("Vida: " + myDefaultHero.getVida());
console.log("Ataque: " + myDefaultHero.getAtaque());
console.log("Defensa: " + myDefaultHero.getDefensa());
console.log("Poder: " + myDefaultHero.getPoder());
console.log("Daño:  " + myDefaultHero.getDano());

myDefaultHero.reduceTurnsRemaining();

console.log("------------ TURNO 3 -------------");
console.log("Vida: " + myDefaultHero.getVida());
console.log("Ataque: " + myDefaultHero.getAtaque());
console.log("Defensa: " + myDefaultHero.getDefensa());
console.log("Poder: " + myDefaultHero.getPoder());
console.log("Daño:  " + myDefaultHero.getDano());
*/
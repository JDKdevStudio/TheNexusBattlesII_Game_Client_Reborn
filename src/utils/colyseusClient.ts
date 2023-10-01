import { Client, Room } from "colyseus.js";
import { NexusRoom } from "../types/nexusRoom";
import { gameStateContext } from "./gameStateMachine/States/gameStateMachine";
import Cookies from "js-cookie";

/* 
    Welcome to Colyseus Nexus Client.

    This abstract class will implement most of the methods needed for
    The Nexus Battles II Online Battles.

    colyseusNexusClient: Colyseus.Client

    room_data: Map<String,String>, Contains general room data
    used for the cases of joining or creating a room.
        "room_id": string,
        "room":Colyseus.Room
        "session_id":string
*/

export class ColyseusNexusClient{
    static colyseusNexusClient:Client = new Client('https://game.thenexusbattles2.cloud/server-0');
    static colyseusRoom:Room;
    static sessionId:String;
    static playerMap:Map<string,any>;
    static gameStateMachine:gameStateContext;

    //Method to get the avaliable rooms in Redis Cache
    static nexusClientGetAvaliableRooms = async():Promise<NexusRoom[]> => {
        let nexusRoomReturn:Array<NexusRoom> = []; //Define return array
        try{
            const rooms = await this.colyseusNexusClient.getAvailableRooms("room_battle"); //Await colyseus query

            rooms.forEach((room) => { //For each room transfrom colyseus promise to NexusRoom Type
                nexusRoomReturn.push({
                    roomId: room.roomId,
                    roomMedatadataNombre: room.metadata.nombre,
                    roomMetadataClients: room.clients.toString(),
                    roomMetadataMaxClients: room.maxClients.toString(),
                    roomMetadataGanancia: room.metadata.ganacia
                });
            });

            return nexusRoomReturn; //Return final list
        }catch(error){
            console.log("Error fetching rooms.",error);
            return nexusRoomReturn;
        }
    }

    static nexusClientCreateRoom = async():Promise<boolean> => {
        try{
            const cookie_data = {
                numero_creditos: Cookies.get("NumeroRecompensa"),
                numero_jugadores:Cookies.get("NumeroJugadores"),
                nombre_sala: Cookies.get("NombreSala"),
                equipos:Cookies.get("SetEquipos"),
            };

            this.colyseusNexusClient.create("room_battle",cookie_data).then((room:Room) => {this.colyseusRoom = room});
            return true;
        }catch{
            return false;
        }
    }

    static nexusClientJoinRoom = async():Promise<boolean> => {
        return true;
    }

    static nexusClientHandleConnection = ():void => {

    }
     
    static HandleJoinAction = (gameMachine:gameStateContext):void => {
        
    }
}
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

import { Client } from "colyseus.js";
import { NexusRoom } from "../types/nexusRoom";

export class ColyseusNexusClient{
    static colyseusNexusClient:Client = new Client('https://game.thenexusbattles2.cloud/server-0');
    static room_data:Map<String,String>= new Map<String,String>();

    static nexusClientGetAvaliableRooms = async():Promise<NexusRoom[]> => {
        let nexusRoomReturn:Array<NexusRoom> = [];
        try{
            const rooms = await this.colyseusNexusClient.getAvailableRooms("room_battle");

            rooms.forEach((room) => {
                nexusRoomReturn.push({
                    roomId: room.roomId,
                    roomMedatadataNombre: room.metadata.nombre,
                    roomMetadataClients: room.clients.toString(),
                    roomMetadataMaxClients: room.maxClients.toString(),
                    roomMetadataGanancia: room.metadata.ganacia
                });
            });

            return nexusRoomReturn;
        }catch(error){
            console.log("Error fetching rooms.",error);
            return nexusRoomReturn;
        }
    }



}
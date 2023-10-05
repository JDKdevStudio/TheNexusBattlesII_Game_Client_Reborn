import { Client, Room } from "colyseus.js";
import { NexusRoom } from "../types/nexusRoom";
import { gameStateContext, stateType } from "./gameStateMachine/States/gameStateMachine";
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

export class NexusClient{
    static colyseusNexusClient:Client = new Client(import.meta.env.VITE_COLYSEUS_URL);
    private static colyseusRoom:Room;
    private static sessionId:String;
    private static playerMap:Map<string,any> =  new Map<string,any>();
    //private static gameStateMachine:gameStateContext = new gameStateContext();

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
                    roomMetadataMaximoClients: room.metadata.maximo,
                    roomMetadataGanancia: room.metadata.ganacia,
                    roomMetadataEquipos: room.metadata.equipos == "1" ? "Equipos" : "Individual"
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
                equipos:Cookies.get("SetEquipos")
            };

            this.colyseusNexusClient.create("room_battle",cookie_data).then((room:Room) => {
                this.colyseusRoom = room;
                this.sessionId = room.sessionId;
                this.HandleJoinAction();    
            });
        
            return true;
        }catch{
            return false;
        }
    }

    static nexusClientJoinRoom = async():Promise<boolean> => {
        try{
            const joining_id = Cookies.get("Join");
            if(joining_id != undefined) {
                this.colyseusNexusClient.joinById(joining_id,{}).then((room:Room) => {
                    this.colyseusRoom = room;
                    this.sessionId = room.sessionId;
                    this.HandleJoinAction();  
                });
            }
            return true;
        }catch{
            return false;
        }
    }

    static nexusClientGetPlayers = ():Map<string,any> =>{
        return this.playerMap;
    }
     
    private static HandleJoinAction = ():void => {
        //Initialize Waiting Room
        gameStateContext.changeMachineState(stateType.WaitingRoom);

        //#region Define Game Status Sync based on Colyseus
        this.colyseusRoom.state.clients.onAdd((client:NexusClient, key:string) => {   
            this.playerMap.set(key,client);
            if(gameStateContext.currentState == stateType.WaitingRoom) gameStateContext.drawToScreen();
        });
    
        this.colyseusRoom.state.clients.onRemove((_:NexusClient,key:string) => {
            this.playerMap.delete(key);
            if(gameStateContext.currentState == stateType.WaitingRoom) gameStateContext.drawToScreen();
        });
        //#endregion
    }
}
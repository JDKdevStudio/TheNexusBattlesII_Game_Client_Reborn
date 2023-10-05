import { Client, Room } from "colyseus.js";
import { NexusRoom } from "../types/nexusRoom";
import { gameStateContext, stateType } from "./gameStateMachine/States/gameStateMachine";
import Cookies from "js-cookie";
import { NexusPlayer } from "../types/nexusPlayer";
import { Player } from "../types/colyseusRelayPlayer";
import Chat from "../components/chatComponent/chatComponent";
import $ from "jquery";

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

export enum ColyseusMessagesTypes{
    RoomHasReachedPlayerMax = 0,
    ChatRemoteUpdate = 1,
}

enum ColyseusChatMessageTypes{
    OnJoinMessage = 0,
    OtherMessage = 1,
    OnLeaveMessage = 2
}

export class NexusClient{
    static colyseusNexusClient:Client = new Client(import.meta.env.VITE_COLYSEUS_URL);
    private static colyseusRoom:Room;
    private static localUsername:string = "Nexus Player";
    private static sessionId:String;
    private static playerMap:Map<string,any> =  new Map<string,any>();
    private static chatComponent:Chat;

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

    static nexusClientHandleGlobalRoom = async():Promise<void> => {
        this.colyseusNexusClient.joinOrCreate("global_room",{
            name:this.localUsername
        }).then( (room) => {
            this.colyseusRoom = room;
            this.sessionId = room.sessionId;
            this.HandleGlobalJoinAction();  
        });
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
        this.ChatGenerator();

        //#region Define Game Status Sync based on Colyseus
        this.colyseusRoom.state.clients.onAdd((client:NexusPlayer, key:string) => {   
            this.playerMap.set(key,client);
            this.HandleChatInteraction(ColyseusChatMessageTypes.OnJoinMessage,client.username,"Se ha unido!");
            if(gameStateContext.currentState == stateType.WaitingRoom) gameStateContext.drawToScreen();
        });
    
        this.colyseusRoom.state.clients.onRemove((_:NexusClient,key:string) => {
            this.playerMap.delete(key);
            if(gameStateContext.currentState == stateType.WaitingRoom) gameStateContext.drawToScreen();
            //TODO: Codigo en caso de desconexión
        });
        //#endregion

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.RoomHasReachedPlayerMax,()=>{
            setTimeout(()=>{
                gameStateContext.changeMachineState(stateType.Inventory);
                gameStateContext.drawToScreen();
            },1000);
        });

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.ChatRemoteUpdate,(message)=>{
            this.HandleChatInteraction(ColyseusChatMessageTypes.OtherMessage,
                    message.username,
                    message.text
                );
        });
    }

    private static HandleGlobalJoinAction = ():void => {
        gameStateContext.currentState = stateType.GeneralScreen;
        this.ChatGenerator();

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.ChatRemoteUpdate,([_,message])=>{
            this.HandleChatInteraction(ColyseusChatMessageTypes.OtherMessage,
                    message.username,
                    message.text
                );
        });
    }

    private static HandleChatInteraction = (type:ColyseusChatMessageTypes,player_name:string,message:string):void => {
        switch(type){
            case ColyseusChatMessageTypes.OtherMessage:
                this.chatComponent.insertNewMessage(player_name,message);    
                break;

            case ColyseusChatMessageTypes.OnJoinMessage:
            case ColyseusChatMessageTypes.OnLeaveMessage:
                if(gameStateContext.currentState != stateType.GeneralScreen) 
                    this.chatComponent.insertNewMessage(player_name,message);    
                break;

            default:
                console.error("Chat Error: Trying to compute an undefined type of message!");
                break;
        }
    }

    static SendChatMessage = (message:string):void =>{
        this.colyseusRoom.send(ColyseusMessagesTypes.ChatRemoteUpdate,{
            username: this.localUsername,
            text: message
        });

        this.HandleChatInteraction(ColyseusChatMessageTypes.OtherMessage,this.localUsername,message);
    }

    private static ChatGenerator = ():void => {
        this.chatComponent = new Chat();
        this.chatComponent.init($("#chat-insert"));
    }
}
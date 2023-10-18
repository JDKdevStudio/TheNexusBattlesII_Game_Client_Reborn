import { Client, Room } from "colyseus.js";
import { NexusRoom } from "../../types/nexusRoom";
import Cookies from "js-cookie";
import { NexusPlayer } from "../../types/nexusPlayer";
import Component from "../gameMediator/componentClass";
import Mediator from "../gameMediator/mediatorInterface";

/* 
    Welcome to Colyseus Nexus Client.

    This class will implement most of the methods needed for
    The Nexus Battles II Online Battles.

    colyseusNexusClient: Colyseus.Client

    room_data: Map<String,String>, Contains general room data
    used for the cases of joining or creating a room.
        "room_id": string,
        "room":Colyseus.Room
        "session_id":string
*/

export enum ColyseusMessagesTypes {
    RoomHasReachedPlayerMax = 0,
    ChatRemoteUpdate = 1,
    ClientGameViewLoaded = 2,
    RemoteGetOrder = 3,
    ClientHasTerminatedTurn = 4,
    ClientSyncHeroCard = 5,
    ClientSendAttackedWho = 6,
}

enum ColyseusChatMessageTypes {
    OnJoinMessage = 0,
    OtherMessage = 1,
    OnLeaveMessage = 2
}

export class NexusClient extends Component {
    colyseusNexusClient: Client = new Client(import.meta.env.VITE_COLYSEUS_URL);
    private colyseusRoom: Room;
    private localUsername: string = "Nexus Player";
    sessionId: string;
    private playerMap: Map<string, any> = new Map<string, any>();

    constructor(dialog: Mediator) {
        super(dialog);
    }

    //Method to get the avaliable rooms in Redis Cache
    nexusClientGetAvaliableRooms = async (): Promise<NexusRoom[]> => {
        let nexusRoomReturn: Array<NexusRoom> = []; //Define return array
        try {
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
        } catch (error) {
            console.log("Error fetching rooms.", error);
            return nexusRoomReturn;
        }
    }

    nexusClientHandleGlobalRoom = async (): Promise<void> => {
        this.colyseusNexusClient.joinOrCreate("global_room").then((room) => {
            this.colyseusRoom = room;
            this.sessionId = room.sessionId;
            this.handleGlobalJoinAction();
        });
    }

    nexusClientCreateRoom = async (): Promise<boolean> => {
        try {
            const cookie_data = {
                numero_creditos: Cookies.get("NumeroRecompensa"),
                numero_jugadores: Cookies.get("NumeroJugadores"),
                nombre_sala: Cookies.get("NombreSala"),
                equipos: Cookies.get("SetEquipos"),
                username: this.localUsername
            };

            this.colyseusNexusClient.create("room_battle", cookie_data).then((room: Room) => {
                this.colyseusRoom = room;
                this.sessionId = room.sessionId;
                this.handleJoinAction();
            });

            return true;
        } catch {
            return false;
        }
    }

    nexusClientJoinRoom = async (): Promise<boolean> => {
        try {
            const joining_id = Cookies.get("Join");
            if (joining_id != undefined) {
                this.colyseusNexusClient.joinById(joining_id, {username:this.localUsername}).then((room: Room) => {
                    this.colyseusRoom = room;
                    this.sessionId = room.sessionId;
                    this.handleJoinAction();
                });
            }
            return true;
        } catch {
            return false;
        }
    }

    nexusClientGetPlayers = (): Map<string, any> => {
        return this.playerMap;
    }

    private handleJoinAction = (): void => {
        //Initialize Waiting Room
        this.dialog.notify(this, "nexusJoinedRoom", {});

        //#region Define Game Status Sync based on Colyseus
        this.colyseusRoom.state.clients.onAdd((client: NexusPlayer, key: string) => {
            this.playerMap.set(key, client);
            this.dialog.notify(this,"nexusClientJoinedRoom",{
                username: client.username
            });
        });

        this.colyseusRoom.state.clients.onRemove((client: NexusPlayer, key: string) => {
            this.playerMap.delete(key);
            this.dialog.notify(this,"nexusClientLeftRoom",{
                username: client.username
            });
            //TODO: Codigo en caso de desconexión
        });
        //#endregion

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.RoomHasReachedPlayerMax, () => {
            setTimeout(() => {
                this.dialog.notify(this,"nexusFinishInventory",{});
            }, 1000);
        });

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.ChatRemoteUpdate, (message) => {
            this.handleChatInteraction(ColyseusChatMessageTypes.OtherMessage,
                message.username,
                message.text
            );
        });

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.RemoteGetOrder,(message)=>{
            this.dialog.notify(this,"nexusGetTurn",message);
        });

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.ClientHasTerminatedTurn,()=>{
            this.dialog.notify(this,"playerHasTerminatedTurn",{});
        });

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.ClientSyncHeroCard,(message)=>{
            this.dialog.notify(this,"registerRemotePlayerCard",message);
        });

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.ClientSendAttackedWho,(message)=>{
            this.dialog.notify(this,"remoteAttackRecieved",message);
        });
    }

    private handleGlobalJoinAction = (): void => {
        this.colyseusRoom.onMessage(ColyseusMessagesTypes.ChatRemoteUpdate, (message) => {
            this.handleChatInteraction(ColyseusChatMessageTypes.OtherMessage,
                message.username,
                message.text
            );
        });
    }

    private handleChatInteraction = (type: ColyseusChatMessageTypes, player_name: string, message: string): void => {
        switch (type) {
            case ColyseusChatMessageTypes.OtherMessage:
                this.dialog.notify(this, "newChatGeneralMessage", {
                    player_name: player_name,
                    message_content: message
                });
                break;

            case ColyseusChatMessageTypes.OnJoinMessage:
            case ColyseusChatMessageTypes.OnLeaveMessage:
                this.dialog.notify(this, "newChatStatusMessage", {
                    player_name: player_name,
                    message_content: message
                });
                break;

            default:
                console.error("Nexus Client Error: Trying to compute an undefined type of message!");
                break;
        }
    }

    sendChatMessage = (message: string): void => {
        this.colyseusRoom.send(ColyseusMessagesTypes.ChatRemoteUpdate, {
            username: this.localUsername,
            text: message
        });

        this.handleChatInteraction(ColyseusChatMessageTypes.OtherMessage, this.localUsername, message);
    }

    sendClientGameViewLoaded = ():void =>{
        this.colyseusRoom.send(ColyseusMessagesTypes.ClientGameViewLoaded);
    }

    sendClientFinishedTurn = ():void => {
        this.colyseusRoom.send(ColyseusMessagesTypes.ClientHasTerminatedTurn);
    }

    sendLocalCardID = (cardID:string):void =>{
        this.colyseusRoom.send(ColyseusMessagesTypes.ClientSyncHeroCard,{
            cardID: cardID
        })
    }

    sendClientAttack = (remoteID:string):void =>{
        this.colyseusRoom.send(ColyseusMessagesTypes.ClientSendAttackedWho,{
            remoteID: remoteID
        })
    }
}
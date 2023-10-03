import { NexusClient } from "../utils/nexusClient";
import Cookies from "js-cookie";

if(Cookies.get("Join") == undefined){
    console.log("Creating a Room");
    NexusClient.nexusClientCreateRoom();
}else{
    console.log("Joining a Room");
    NexusClient.nexusClientJoinRoom();
}
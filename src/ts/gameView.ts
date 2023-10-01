import { ColyseusNexusClient } from "../utils/colyseusClient";
import Cookies from "js-cookie";

if(Cookies.get("Join") == undefined){
    console.log("Creating a Room");
}else{
    console.log("Joining a Room");
}
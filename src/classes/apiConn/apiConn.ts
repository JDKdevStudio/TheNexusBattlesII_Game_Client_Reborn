import Cookies from "js-cookie";
import { UserDataType } from "./types/userDataType";

export default class ApiConn{
        private static AccessToken?:string = Cookies.get("access_token")
        static getUserData=async():Promise<UserDataType>=>{
            let headersList = {
                "Content-Type": "application/json",
                "Authorization": this.AccessToken ?? ""
               }
               
               let response = await fetch("https://webserver.thenexusbattles2.cloud/ver-perfil", { 
                 method: "GET",
                 headers: headersList
               });

               if (response.status == 200) {
                const parsedResponse:UserDataType = JSON.parse(await response.text())
                return parsedResponse
               }
               const parsedResponse:UserDataType =JSON.parse(datasample)
               return parsedResponse
        }

}

const datasample= `
{
    "id": 2,
    "user": "Administrador",
    "games": 122,
    "sub": false,
    "credits": 15,
    "days": null
  }
`
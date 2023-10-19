import Cookies from "js-cookie";
import { UserDataType } from "./types/userDataType";

export default class ApiConn{
        private static AccessToken?:string = Cookies.get("access_token")
        static getUserData=async():Promise<UserDataType>=>{
            
        }

}
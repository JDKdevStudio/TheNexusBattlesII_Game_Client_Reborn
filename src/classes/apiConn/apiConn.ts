import Cookies from "js-cookie";

export default class ApiConn{
        static AccessToken?:string = Cookies.get("access_token")

        
}
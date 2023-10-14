import { chatMessageType } from "../types/messageType";
import $ from "jquery";

export default class ChatView {
    constructor() { }

    init = async (node: JQuery<HTMLDivElement>, sendMessageFunction: (message: string) => void): Promise<void> => {
        await node.load("../templates/chatTemplate.html");

        //Añadir el control!
        $("#chat-insert").on("click", "#send-chat-button", () => {
            const data = $("#chat-input").val();
            if (data != "") {
                sendMessageFunction(data == undefined ? "Hola!" : data.toString());
                $("#chat-input").val("");
            }
        });
    }

    insertNewMessage = (message: chatMessageType) => {
        $.get("../templates/chatItem.html", function (data: string) {
            let response = data;
            let placeholders: Record<string, string> = {
                "{{player_name_place_holder}}": message.player_name,
                "{{message_placeholder}}": message.message_content
            };
            //Replace in template
            for (let placeholder in placeholders) {
                if (placeholders.hasOwnProperty(placeholder)) {
                    response = response.replace(placeholder, placeholders[placeholder]);
                }
            }
            $("#chat-list").append(response);
        });
    }
}
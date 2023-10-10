import { main } from "@popperjs/core";
import $ from "jquery";

export default class ModalGeneral {
    private title: string;
    private message: string;

    constructor(title: string, message: string) {
        this.title = title;
        this.message = message;
        this.toggleModal();
    }
   
    toggleModal =():void=>{
        $.get("../components/modalGeneral/modal.html", (data) => {
            $(main).append(data);

            $("#alertModal").show();
            $("#alertModal .modal-title").text(this.title);
            $("#alertModal #textMessage").text(this.message);

            console.log($("#closeButton"))
            console.log($("#closeAlertModal"))
            $("#closeButton, #closeAlertModal").on('click', function () {
                $("#alertModal").hide();
            });
            
            
        }).fail((error) => {
            console.error("Error al cargar el archivo modal.html:", error);
        });
        
    }

  
}
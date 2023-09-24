import * as $ from "jquery";
import 'bootstrap/dist/js/bootstrap.bundle.js';

$("#btn-create-room").on("click",function () {
    $("#modal-create-room").load("../components/roomConfigComponent/roomConfig.html",()=>{
        $("#roomConfig").show();
    });
})


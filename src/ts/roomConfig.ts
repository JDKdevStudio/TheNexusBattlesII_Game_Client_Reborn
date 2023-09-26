import $ from "jquery";

$("#btn-up-modal-close, #btn-down-modal-close").on('click',function(){ //Add with multiple selectors close event to buttons
    $("#roomConfig").hide();
});

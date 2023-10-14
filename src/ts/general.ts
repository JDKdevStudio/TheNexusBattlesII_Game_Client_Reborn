import $ from "jquery";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import GeneralDialog from "../classes/gameMediator/dialogs/generalDialog";

$(()=>{
    const generalDialog = new GeneralDialog();
    generalDialog.init();
});
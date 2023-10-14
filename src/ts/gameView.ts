import $ from "jquery";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import GameDialog from "../classes/gameMediator/dialogs/gameDialog";

$(()=>{
    const gameDialog = new GameDialog();
    gameDialog.init();
});
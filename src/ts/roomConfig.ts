import $ from "jquery";

function realizarValidaciones() {
    const nombreSalaInput = $("#room-name");
    const nombreSala = nombreSalaInput.val() as string;
    const palabrasProhibidas = ["hp", "shakira", "petro"]; 

    for (const palabra of palabrasProhibidas) {
        if (nombreSala.toLowerCase().includes(palabra)) {
            alert("El nombre de la sala no puede contener palabras obscenas, nombres de celebridades o conocidos.");
            nombreSalaInput.val("");
            return false;
        }
    }

    const numeroJugadores = parseInt($("#select-number-players").val() as string);

    const equiposSelect = $("#select-equipos");
    if (numeroJugadores === 1 || numeroJugadores === 2) {
        equiposSelect.val("2"); 
        equiposSelect.prop("disabled", true); 
    } else {
        equiposSelect.prop("disabled", false); 
    }

    const recompensaSelect = $("#select-recompensa-bool");

    const cantidadRecompensaInput = $("#recompensa-cantidad");
    if (recompensaSelect.val() === "2") {
        cantidadRecompensaInput.val("0");
        cantidadRecompensaInput.prop("disabled", true);
    } else {
        cantidadRecompensaInput.prop("disabled", false);
    }

    return true;
}

$("#roomConfig").on('shown.bs.modal', function () {
    realizarValidaciones();
});

// Control de eventos cambio num jugadores
$("#select-number-players").on('change', function () {
    realizarValidaciones();
});

// Control de eventos cambio de recompensa
$("#select-recompensa-bool").on('change', function () {
    realizarValidaciones();
});

$("#btn-enviar").on('click', function () {
    if (realizarValidaciones()) {
        console.log("Formulario enviado con éxito");
    } else {
        console.error("Las validaciones no pasaron. No se puede enviar el formulario.");
    }
});

$("#btn-up-modal-close, #btn-down-modal-close").on('click', function () {
    $("#roomConfig").hide();
});
  


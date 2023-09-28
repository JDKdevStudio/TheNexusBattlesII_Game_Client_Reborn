import $ from "jquery";
import Cookies from "js-cookie";

// Validar nombre de la sala
const palabrasProhibidas = /(hp|shakira|petro)/i; 

export function validarNombreSala(): boolean {
    const nombreSalaInput = $("#room-name");
    const nombreSala = nombreSalaInput.val() as string;

    if (palabrasProhibidas.test(nombreSala)) {
        alert("El nombre de la sala no puede contener palabras obscenas, nombres de celebridades o conocidos.");
        nombreSalaInput.val("");
        return false;
    }

    return true;
}

// Equipos
export function bloquearEquiposSegunJugadores(): void {
    const numeroJugadores = parseInt($("#select-number-players").val() as string);
    const equiposSelect = $("#select-equipos");

    if (numeroJugadores === 2 || numeroJugadores === 3) {
        equiposSelect.val(0);
        equiposSelect.prop("disabled", true);
    } else {
        equiposSelect.prop("disabled", false);
    }
}

// Recompensa
export function gestionarRecompensa(): void {
    const recompensaSelect = $("#select-recompensa-bool");
    const cantidadRecompensaInput = $("#recompensa-cantidad");

    if (recompensaSelect.val() === "0") {
        cantidadRecompensaInput.val(0);
        cantidadRecompensaInput.prop("disabled", true);
    } else {
        cantidadRecompensaInput.prop("disabled", false);
    }

    cantidadRecompensaInput.attr("min", "1");
}

// Cargar el modal con valores iniciales
function cargarModal() {
    bloquearEquiposSegunJugadores();
    gestionarRecompensa();
    $("#roomConfig").show();
}

$("#btn-create-room").on("click", cargarModal);

/*
  Esta función permite enviar los datos que se obtienen del formulario
  al almacenamiento de cookies dentro del navegador del usuario
*/

function enviarDatosFormulario(): void {
    //Obtener los datos del formulario HTML, en caso de que tengan algún error por algún motivo se configurará una sala x defecto
    let form_room_name: string = $("#room-name").val() == undefined || $("#room-name").val() == "" ? "Mi_Sala" : $("#room-name").val()!.toString();
        form_room_name = form_room_name.replace(/\s/g, '_')
    let form_player_count: string = $("#select-number-players").val() == undefined ? "2" : $("#select-number-players").val()!.toString();
    let form_equipos:string = $("#select-equipos").val() == undefined ? "0" : $("#select-equipos").val()!.toString();
    //let form_reward = $("#select-recompensa-bool").val() == undefined ? "0" : $("#select-recompensa-bool").val()!.toString();
    let form_reward_number:string = $("#recompensa-cantidad").val() == undefined || $("#recompensa-cantidad").val() == "" ? "0" : $("#recompensa-cantidad").val()!.toString();
    
    //Limpiar las cookies de juego en caso de que se quiera crear una sala y sigan existiendo
    Cookies.remove('NombreSala');
    Cookies.remove('NumeroJugadores');
    Cookies.remove('SetEquipos');
    Cookies.remove('NumeroRecompensa');

    //Si todo está OK. Puede guardar las cookies de creación.
    //Cookie del nombre de la sala
    Cookies.set('NombreSala', form_room_name, {
        expires: new Date(Date.now() + 3 * 60 * 1000),
        path: '/',
        //domain: 'juego.thenexusbattles2.cloud',
        secure: true,
        sameSite: 'lax'
    });

    //Cookie del número de jugadores
    Cookies.set('NumeroJugadores', form_player_count, {
        expires: new Date(Date.now() + 3 * 60 * 1000),
        path: '/',
        //domain: 'juego.thenexusbattles2.cloud',
        secure: true,
        sameSite: 'lax'
    });

    //Cookie del selector de equipos
    Cookies.set('SetEquipos', form_equipos, {
        expires: new Date(Date.now() + 3 * 60 * 1000),
        path: '/',
        //domain: 'juego.thenexusbattles2.cloud',
        secure: true,
        sameSite: 'lax'
    });

    //Cokie del valor de la recompensa
    Cookies.set('NumeroRecompensa', form_reward_number, {
        expires: new Date(Date.now() + 3 * 60 * 1000),
        path: '/',
        //domain: 'juego.thenexusbattles2.cloud',
        secure: true,
        sameSite: 'lax'
    });
}

// Asociar las funciones de validación a eventos
$("#select-number-players").on('change', function () {
    bloquearEquiposSegunJugadores();
    gestionarRecompensa();
});

$("#select-recompensa-bool").on('change', function () {
    gestionarRecompensa();
});

$("#btn-enviar").on('click', function () {
    if (validarNombreSala()) {
        enviarDatosFormulario();
    } else {
        console.error("Las validaciones no pasaron. No se puede enviar el formulario.");
    }
});

$("#btn-up-modal-close, #btn-down-modal-close").on('click', function () {
    $("#roomConfig").hide();
});



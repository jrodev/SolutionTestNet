$(document).ready(function () {
    "use strict"

    if (typeof tieneCupon != 'undefined' && tieneCupon == '1') {
        var _mostrarPopupCuponGanaste = ((typeof mostrarPopupCuponGanaste != 'undefined') ? mostrarPopupCuponGanaste.toLowerCase() == "true" : false);
        var objInitializer = {
            tieneCupon: tieneCupon,
            paginaOrigenCupon: paginaOrigenCupon,
            esEmailActivo: esEmailActivo,
            baseUrl: baseUrl,
            simboloMoneda: viewBagSimbolo,
            campaniaActual: viewBagCampaniaActual,
            paisISO: paisISO,
            ambiente: viewBagAmbiente,
            correo: correo,
            celular: celular
        };

        cuponModule.ini(objInitializer);
        cuponModule.obtenerCupon();
        if (_mostrarPopupCuponGanaste) {
            cuponModule.mostrarPopupGanaste();
        }
    }


});

function ProcesarActualizacionMostrarContenedorCupon() {
    if (typeof paginaOrigenCupon == "undefined") {
        return false;
    }

    if (paginaOrigenCupon) {
        if (cuponModule) {
            cuponModule.actualizarContenedorCupon();
        }
    }
}
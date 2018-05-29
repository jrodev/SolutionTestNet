
$(document).ready(function () {
    "use strict";
    var clickabrir = 1;

    if (isMobile()) {
        
        $(".preguntas-frecuentes-cont-sus ul.preg-frecuentes li a.abrir-preg-frecuente").click(function () {
            $(".preguntas-frecuentes-cont-sus ul.preg-frecuentes ul").slideToggle();

            if (clickabrir === 1) {
                $(".preguntas-frecuentes-cont-sus .contenedor-mobile-fix span.despliegue").css("display", "none");
                $(".preguntas-frecuentes-cont-sus .contenedor-mobile-fix span.nodespliegue").css("display", "block");
                clickabrir = 0;
            }
            else
            {
                $(".preguntas-frecuentes-cont-sus .contenedor-mobile-fix span.nodespliegue").css("display", "none");
                $(".preguntas-frecuentes-cont-sus .contenedor-mobile-fix span.despliegue").css("display", "block");
                clickabrir = 1;
            }
        });
    }
    else {

        $(".preguntas-frecuentes-cont-sus ul.preg-frecuentes li:has(ul)").click(function () {
            $(this).find("ul").slideToggle();
            if (clickabrir === 1) {
                $(this).find("span.despliegue").css("display", "none");
                $(this).find("span.nodespliegue").css("display", "block");
                clickabrir = 0;
            }
            else
            {
                $(this).find("span.despliegue").css("display", "block");
                $(this).find("span.nodespliegue").css("display", "none");
                clickabrir = 1;
            }
        });
    }
  
});
/*
function onYouTubeIframeAPIReady() {
    if (typeof videoKey != "undefined") {
        player = new YT.Player("player", {
            width: "640",
            height: "390",
            enablejsapi: 1,
            fs: 0,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            videoId: videoKey,
            playerVars: {
                autoplay: 1,
                rel: 0
            },
            events: {
                onReady: onScrollDown,
                onStateChange: onPlayerStateChange
            }
        });
    }
}*/

/*
function onScrollDown(event) {
    $(window).scroll(function () {
        var windowHeight = $(window).scrollTop();
        var contenido2 = ($("#saber-mas-uno").offset() || {}).top || 0;

        if (windowHeight >= contenido2) {
            event.target.pauseVideo();
        }
    });
}*/

// when video ends
/*
function onPlayerStateChange(event) {
    if (typeof estaSuscrita == "undefined")
        return false;

    if (event.data === 0 && estaSuscrita === "False") {
        $("a.btn-suscribete-video").animate({
            bottom: "0%"
        });
        $("#div-suscribite").hide();
    }
    if (event.data == YT.PlayerState.PLAYING && !done) {
        rdAnalyticsModule.CompartirProducto("YTI", player.getVideoUrl(), "");
        done = true;
    }
}*/

function ScrollUser(anchor, alto) {
    var topMenu = ($("#seccion-fixed-menu").position() || {}).top || 0;
    if (topMenu > 0)
        alto = alto + $("#seccion-fixed-menu").height() + 10;

    alto = (jQuery(anchor).offset() || {}).top - alto;
    return alto;
}

function RDPopupMobileCerrar() {

    AbrirLoad();

    rdAnalyticsModule.CerrarPopUp("ConfirmarDatos");

    $.ajax({
        type: "POST",
        url: baseUrl + "RevistaDigital/PopupCerrar",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            CerrarLoad();
            window.location.href = (isMobile() ? "/Mobile" : "") + "/Ofertas";
        },
        error: function (data, error) {
            CerrarLoad();
        }
    });
}

function RDSuscripcion() {

    AbrirLoad();
    rdAnalyticsModule.Inscripcion();

    var rdSuscriocionPromise = RDSuscripcionPromise();
    rdSuscriocionPromise.then(
        function (data) {
            CerrarLoad();
            if (!checkTimeout(data))
                return false;

            if (!data.success) {
                AbrirMensaje(data.message);
                return false;
            }

            $("#PopRDSuscripcion").css("display", "block");

            $(".popup_confirmacion_datos .form-datos input").keyup(); //to update button style

            return false;
        },
        function (xhr, status, error) {
            CerrarLoad();
        }
    );
}

function RDSuscripcionPromise() {
    var d = $.Deferred();

    var promise = $.ajax({
        type: "POST",
        url: baseUrl + "RevistaDigital/Suscripcion",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: true
    });

    promise.done(function(response) {
        d.resolve(response);
    });

    promise.fail(d.reject);

    return d.promise();
}

function RDDesuscripcion() {
    AbrirLoad();
    rdAnalyticsModule.CancelarSuscripcion();
    $.ajax({
        type: "POST",
        url: baseUrl + "RevistaDigital/Desuscripcion",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            CerrarLoad();
            if (!checkTimeout(data))
                return false;

            if (data.success !== true) {
                AbrirMensaje(data.message);
                return false;
            }

            window.location.href = (isMobile() ? "/Mobile" : "") + "/Ofertas";
        },
        error: function (data, error) {
            CerrarLoad();
        }
    });
}

function RDRedireccionarDetalle(event) {
    var obj = EstrategiaObtenerObj(event);
    EstrategiaGuardarTemporal(obj);
    var url = ((isMobile() ? "/Mobile" : "") + "/RevistaDigital/Detalle");
    window.location = url + "?cuv=" + obj.CUV2 + "&campaniaId=" + obj.CampaniaID;
}

function MostrarTerminos() {
    var win = window.open(urlTerminosCondicionesRD, "_blank");
    if (win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //Browser has blocked it
        console.log("Habilitar mostrar popup");
    }
}

function RedireccionarContenedorComprar(origenWeb, codigo) {
    origenWeb = $.trim(origenWeb);
    if (origenWeb !== "")
        rdAnalyticsModule.Access(origenWeb);

    codigo = $.trim(codigo);
    window.location = (isMobile() ? "/Mobile" : "") + "/Ofertas" + (codigo !== "" ? "#" + codigo : "");
}

function RedireccionarContenedorInformativa(origenWeb) {
    origenWeb = $.trim(origenWeb);
    if (origenWeb !== "")
        rdAnalyticsModule.Access(origenWeb);

    window.location = (isMobile() ? "/Mobile" : "") + "/RevistaDigital/Informacion";
}
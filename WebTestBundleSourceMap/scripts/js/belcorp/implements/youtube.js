/**
 * @Description: Implemente el visor de youtube en la pagina.
 * aDataYotube : [{id:'IDELEMENT', height:HEIGHT_VAL, width: WIDTH_VAL, videoId: '4ZXmnz2aEzU'},...]
 */
;(function () {
    
    var firstScriptTag = document.getElementsByTagName('script')[0]
        , scriptTag = document.createElement('script')
        
        //, aDataYotube = []  // Lista de todas las caracteristicas de los videos youtube
        , $allPlayers = $(".yt-video") // Todos los objetos html jQuery contenedores de video youtube
        , oYTPlayers  = {} // Todas las instancias de de los reproductores youtube

        /**
         * Crea las instancias de youtube, para ello YT debe existir. Por ello esta funcion debe
         * ejecutarse dentro de onYouTubeIframeAPIReady
         * @param {object} obj los paramentros de configuracion del video. Tienen la sgte estructura:
                           p.ejm: {id:'player01', height:600, width: 800, videoId: '4ZXmnz2aEzU'}
         * @return {YT.Player} Instancia de YT.Player
         */
        , createPlayer = function (oDataYoutube) {
            var oCopyDY = $.extend({}, oDataYoutube);
            delete oCopyDY["id"]; // No pertenece a la lista de parametros que requiere youtube
            return new YT.Player(oDataYoutube.id, oCopyDY);
        }
    ;

    // Cargando las librerias que nos provee youtube -------------------------------------
    $(function () {
        scriptTag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
    });
    // -----------------------------------------------------------------------------------
    
    // Llenando oYTPlayers con los data-youtube y data-extra de los elementos contenedores del reproductor
    $allPlayers.each(function (i,ele) {
        var sJsonYoutube = $(ele).data('youtube')
            , oDataYoutube = sJsonYoutube ? (new Function("return " + sJsonYoutube + ";"))() : false
        ;
        if (oDataYoutube) {
            oDataYoutube.id = $(ele).attr('id');
            oYTPlayers[oDataYoutube.id] = { params: oDataYoutube };
            if ($(ele).data('extra')) { oYTPlayers[oDataYoutube.id].extra = $(ele).data('extra'); }
        }
    });

     
    // ADICIONARL EVENTOS EXTRAS AQUI --------------------------------------------------------------------------------
    var ytId, ytParams, ytExtra, ytPlayer;
    // Adicionando eventos segun se requiera (Por Pagina, por seccion, ...etc) lo define
    // el ID del elemento contenedor del player youtube

    // ---------------------------------------------------------------------------------------------------------------
    // ID del Reproductor 1
    ytId = "ytRevistaDigitalDetalle";
    // Si existe el ID del elemento 
    if (oYTPlayers.hasOwnProperty(ytId)) {
        ytParams = oYTPlayers[ytId].params; // parametros para YT.Player
        ytExtra  = oYTPlayers[ytId].extra;
        ytPlayer = oYTPlayers[ytId].instance; // instancia de Youtube Player
        ytParams.events = {
            'onStateChange': function (event) {
                if (event.data == YT.PlayerState.PLAYING) {
                    rdAnalyticsModule.CompartirProducto("YTI", ytPlayer.getVideoUrl(), ytExtra.descripcionResumen);
                }
                if (event.data == YT.PlayerState.ENDED) {
                    rdAnalyticsModule.CompartirProducto("YTF", ytPlayer.getVideoUrl(), ytExtra.descripcionResumen);
                }
            }
        };
    }

    // ---------------------------------------------------------------------------------------------------------------
    // ID del Reproductor 2
    $.each([
        "ytBienvenidaIndex",
        "ytMobileBienvenidaIndex"
    ], function (i, ytId) {
        // Si existe el ID del elemento 
        if (oYTPlayers.hasOwnProperty(ytId)) {
            ytParams = oYTPlayers[ytId].params; // parametros para YT.Player
            ytPlayer = oYTPlayers[ytId].instance; // instancia de Youtube Player
        
            // Para ytBienvenidaIndex, el videoId tiene una logica
            ytParams.videoId = isEsika ? "jNoP8OoMmW4" : "djSn0tFcQ0w";

            // la version mobile no tiene evento onStateChange
            if (ytId == "ytMobileBienvenidaIndex") { return; }

            ytParams.events = {
                'onStateChange': function (event) {
                    // track when video ends
                    if (event.data == YT.PlayerState.ENDED) {
                        dataLayer.push({
                            'event': 'virtualEvent',
                            'category': 'Home',
                            'action': 'Video de Bienvenida: Finalizar video',
                            'label': 'SomosBelcorp.com ¡se renueva para ti!'
                        });
                    }
                }
            };
        }
    });


    // ---------------------------------------------------------------------------------------------------------------
    // ID del Reproductor 3
    /*ytId = "ytMobileRevistaDigitalDetalle";
    // Si existe el ID del elemento 
    if (oYTPlayers.hasOwnProperty(ytId)) {
        ytParams = oYTPlayers[ytId].params; // parametros para YT.Player
        ytExtra = oYTPlayers[ytId].extra;
        ytPlayer = oYTPlayers[ytId].instance; // instancia de Youtube Player
        ytParams.events = {
            'onStateChange': function (event) {
                if (event.data == YT.PlayerState.PLAYING) {
                    rdAnalyticsModule.CompartirProducto("YTI", player.getVideoUrl(), ytExtra.descripcionResumen);
                }
                if (event.data == YT.PlayerState.ENDED) {
                    rdAnalyticsModule.CompartirProducto("YTF", player.getVideoUrl(), ytExtra.descripcionResumen);
                }
            }
        };
    }*/

    // ---------------------------------------------------------------------------------------------------------------
    // ID del Reproductor 3   
    // (se repetia este codigo para: Detalle.cshtml, template-informativa.cshtml)
    //ytId = "ytMobileRevistaDigitalDetalle";
    $.each([
        "ytMobileRevistaDigitalDetalle",            // i:0 (videoKey ?) mobile/views/revistadigital/Detalle.cshtml
        "ytMobileRevistaDigitalTemplateInformativa",// i:1  mobile/views/revistadigital/template-informativa.cshtml
        "ytRevistaDigitalTemplateInformativa"
    ], function (i, ytId) {

        // Si existe el ID del elemento 
        if (oYTPlayers.hasOwnProperty(ytId)) {
            ytParams = oYTPlayers[ytId].params; // parametros para YT.Player
            ytExtra = oYTPlayers[ytId].hasOwnProperty("extra") ? oYTPlayers[ytId].extra : false;
            ytPlayer = oYTPlayers[ytId].instance; // instancia de Youtube Player

            // para i=0, videoId depende del @Model.TipoEstrategiaDetalle.UrlVideoMobile del view o de videoKey del JS ??
            if (i > 0 && videoKey) { ytParams.videoId = videoKey; }

            ytParams.events = {
                'onReady': function (event) { //onScrollDown
                    console.log("onReady->event:",event);
                    $(window).scroll(function () {
                        var windowHeight = $(window).scrollTop();
                        var contenido2 = ($("#saber-mas-uno").offset() || {}).top || 0;

                        if (windowHeight >= contenido2) {
                            event.target.pauseVideo();
                        }
                    });
                },
                // when video ends
                'onStateChange': function onPlayerStateChange(event) {
                    if (typeof estaSuscrita == "undefined")
                        return false;

                    if (event.data === 0 && estaSuscrita === "False") {
                        $("a.btn-suscribete-video").animate({
                            bottom: "0%"
                        });
                        $("#div-suscribite").hide();
                    }
                    if (event.data == YT.PlayerState.PLAYING /*&& !done*/) {
                        rdAnalyticsModule.CompartirProducto("YTI", event.target.getVideoUrl(), "");
                        /*done = true;*/
                    }
                }
            };
        }
    });


    // ---------------------------------------------------------------------------------------------------------------

    // Patron Publicador Subscriptor: Definiendo metodo para suscribir metodos
    $.each(oYTPlayers, function (key, oYTP) {
        oYTP.on = function (sEvt, fCallback) {
            oYTP['events'] = oYTP['events'] || {}; // {'ready':[f(){},f(){},...], 'error':[f(){},f(){},...] }
            if (sEvt == 'ready') { // se ejecuta en el ready youtube
                oYTP['events']['ready'] = oYTP['events']['ready'] || []; // lista de funciones load
                oYTP['events']['ready'].push(fCallback);
            }
            // if (sEvt == 'other') { ... }
        }
    });

    // Eso se ejecuta AUTOMATICAMENTE por el API de youtube
    window.onYouTubeIframeAPIReady = function () {
        // Si no hay players
        if (!Object.keys(oYTPlayers).length) return;

        $.each(oYTPlayers, function (key, oYTP) {
            oYTPlayers[key].instance = createPlayer(oYTP.params); // Guardando Instancia
            //oYTPlayers[key].instance.addEventListener("onReady", function () { alert("onReady!!"); });
            // Ejecutando metodos suscritos
            if (oYTPlayers[key].hasOwnProperty('events')) {
                $.each(oYTPlayers[key].events, (function (ytInstance) {
                    return function (sEvtName, aCallBacks) {
                        if ($.isArray(aCallBacks) && aCallBacks.length) {
                            for (var i = 0; i < aCallBacks.length; i++) {
                                // sEvtName: onYotutbeEventName
                                sEvtName = "on" + sEvtName[0].toUpperCase() + sEvtName.slice(1);
                                ytInstance.addEventListener(sEvtName, (function (fnc) {
                                    return function () { fnc(ytInstance); };
                                })(aCallBacks[i]));
                            }
                        }
                    };
                })(oYTPlayers[key].instance));
            }

        });

    }

    // Seteando en el contexto Global
    window["oYTPlayers"] = oYTPlayers;

})();
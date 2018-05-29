var cuponModule = (function () {
    "use strict";

    var CONS_CUPON = {
        NO_MOSTRAR_CUPON: 0,
        MOSTRAR_CUPON: 1,
        CUPON_RESERVADO: 1,
        CUPON_ACTIVO: 2
    };

    var CONS_PAGINA_ORIGEN = {
        DESKTOP_BIENVENIDA: 1,
        MOBILE_BIENVENIDA: 2,
        DESKTOP_PEDIDO: 11,
        MOBILE_PEDIDO: 21,
        MOBILE_PEDIDO_DETALLE: 21
    };

    var REGULAR_EXPRESSION = {
        CORREO: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };

    var elements = {
        PopupCuponGana: '#Cupon1',
        PopupConfirmacion: '#Cupon2',
        PopupGanaste: '#Cupon3',
        ContenedorPadreCupon: 'div.contenedorCupon',
        ContenedorCuponConocelo: 'div.contenedorCuponConocelo',
        ContenedorCuponInfo: 'div.contenedorCuponInfo',
        ContenedorGana: '#',
        LinkVer: '#linkConocerDescuento',
        LinkVer2: '#linkConocerDescuento2',
        Body: 'body',
        BtnConfirmar: '#',
        TxtCelular: '#Cupon1 #txtCelular',
        TxtCorreoIngresado: '#Cupon1 #txtEmailIngresado',
        HdCorreoOriginal: '#Cupon1 #hdEmailOriginal',
        ContenedorTituloGana: '#Cupon1 .monto_gana',
        ContenedorTituloGanaste: '#Cupon3 .titulo_cupon2',
        ContenedorTexto02Ganaste: '#Cupon3 .texto_cupon2',
        ContenedorTextoDetalleCuponCampania: '#Cupon3 #detalleCuponCampania',
        BtnConfirmarDatos: '#Cupon1 #btnConfirmarDatos',
        BtnModificarDatos: '#Cupon2 #btnModificarDatos',
        BtnEnviarNuevamente: '#Cupon2 #btnEnviarNuevamente',
        ContenedorMostrarCorreo: '#Cupon2 div.correo_confirmacion',
        CheckTerminosCondiciones: '#Cupon1 .termino_condiciones_cupon',
        LinkTerminosCondiciones: '#lnkTerminosCondiciones',
        ContenedorMensajeErrorCorreo: '#Cupon1 .seccion-correo .mensaje_alerta_cupon1',
        IconoMensajeErrorCorreo: '#Cupon1 .seccion-correo .icono_alerta_cupon',
        ContenedorMensajeErrorCelular: '#Cupon1 .seccion-celular .mensaje_alerta_cupon1',
        IconoMensajeErrorCelular: '#Cupon1 .seccion-celular .icono_alerta_cupon',
        ContenedorMensajeErrorTerminosCondiciones: '#Cupon1 .seccion-terminos-condiciones .mensaje_alerta_cupon1',
        ContenedorMontoLimitePopupGana: '#Cupon1 .cupon-monto-limite',
        ContenedorMontoLimitePopupGanaste: '#Cupon3 .cupon-monto-limite'
    };

    var setting = {
        MostrarContenedorPadreCupon: false,
        MostrarContenedorInfo: false,
        PaginaOrigen: 0,
        EsEmailActivo: false,
        BaseUrl: '',
        UrlActivarCupon: 'Cupon/ActivarCupon',
        UrlEnviarCorreoGanaste: '',
        UrlEnviarCorreoConfirmacionEmail: 'Cupon/EnviarCorreoConfirmacionEmail',
        UrlObtenerCupon: 'Cupon/ObtenerCupon',
        UrlEnviarCorreoActivacionCupon: 'Cupon/EnviarCorreoActivacionCupon',
        UrlObtenerOfertasPlan20EnPedido: 'Cupon/ObtenerOfertasPlan20EnPedido',
        Cupon: null,
        SimboloMoneda: '',
        CampaniaActual: '',
        PaisISO: '',
        UrlS3: 'https://s3.amazonaws.com',
        Ambiente: '',
        TieneCupon: false,
        CumpleMostrarContenedorCupon: false,
        TieneOfertasPlan20: false
    };

    var userModel = {
        celular: '',
        correo: ''
    };

    var inizializer = function (parameters) {
        setting.TieneCupon = (parameters.tieneCupon == CONS_CUPON.MOSTRAR_CUPON);
        setting.PaginaOrigen = parseInt(parameters.paginaOrigenCupon);
        setting.EsEmailActivo = (parameters.esEmailActivo.toLowerCase() == "true");     
        setting.BaseUrl = parameters.baseUrl;
        setting.SimboloMoneda = parameters.simboloMoneda;
        setting.CampaniaActual = parameters.campaniaActual;
        setting.PaisISO = parameters.paisISO;
        setting.Ambiente = parameters.ambiente;
        userModel.correo = parameters.correo;
        userModel.celular = parameters.celular;
        setDefaultValues();
        mostrarContenedorCuponPorPagina();
        bindEvents();
    }

    var setDefaultValues = function () {
        var urlTerminosCondiciones = setting.UrlS3 + "/" + setting.Ambiente + "/SomosBelcorp/FileConsultoras/" + setting.PaisISO + "/Contrato_Cupon.pdf";
        $(elements.LinkTerminosCondiciones).attr("href", urlTerminosCondiciones);
    }

    var bindEvents = function () {

        $('div#Cupon1').off().on("click", "div#chckTerminosCondiciones", function () {
            $(this).toggleClass('check_intriga');
            if ($(this).hasClass('borde_seleccion_alerta')) {
                ocultarMensajeTerminosCondiciones();
            }
        });

        $(document).keyup(function (e) {
            if (e.keyCode == 27) { // escape key maps to keycode `27`
                cerrarTodosPopupCupones();
            }
        });

        $(document).on("click", elements.LinkVer, function () {
            procesarVerOferta();
        });

        $(document).on("click", elements.LinkVer2, function () {
            procesarVerOferta();
        });

        $(document).on("click", elements.BtnConfirmarDatos, function () {
            var aceptoTerCond = $(elements.CheckTerminosCondiciones).hasClass("check_intriga");
            var correoIngresado = $(elements.TxtCorreoIngresado).val().trim();
            var correoOriginal = $(elements.HdCorreoOriginal).val().trim();
            var celular = $(elements.TxtCelular).val().trim();

            if (confirmarDatosEsValido(correoOriginal, correoIngresado, celular, aceptoTerCond)) {
                if (correoIngresado == correoOriginal) {
                    validarEstadoEmail();
                } else {
                    procesarConfirmacion();
                }
            }
        });

        $(document).on("click", elements.BtnModificarDatos, function () {
            mostrarPopupGana();
        });

        $(document).on("click", elements.BtnEnviarNuevamente, function () {
            var model = {
                eMailNuevo: $(elements.TxtCorreoIngresado).val().trim(),
                celular: $(elements.TxtCelular).val().trim()
            };
            var confirmacionPromise = enviarCorreoConfirmacionEmailPromise(model);

            confirmacionPromise.then(function (response) {
                if (!response.success) {

                    AbrirMensaje(response.message, "MENSAJE DE VALIDACIÓN");
                }
            }, function(xhr, status, error) {
                
            });
        });

        $(document).on("keyup", elements.TxtCorreoIngresado, function () {
            var correo = $(this).val().trim();

            if (!esFormatoCorreoValido(correo)) {
                mostrarMensajeErrorCorreo();
            } else {
                ocultarMensajeErrorCorreo();
            }
        });

        $(document).on("keyup", elements.TxtCelular, function (e) {
            var celular = $(this).val();
            validarCelular(celular);
        });
    }

    var esFormatoCorreoValido = function (correo) {
        var regCorreo = new RegExp(REGULAR_EXPRESSION.CORREO);
        return regCorreo.test(correo);
    };

    var procesarVerOferta = function () {
        if (setting.Cupon) {
            if (setting.Cupon.EstadoCupon == CONS_CUPON.CUPON_RESERVADO) {
                procesarGana();
            }
            else if (setting.Cupon.EstadoCupon == CONS_CUPON.CUPON_ACTIVO) {
                validarEstadoEmail();
            }
        }
    }

    var validarEstadoEmail = function () {
        if (setting.EsEmailActivo) {
            procesarGanaste();
        } else {
            procesarConfirmacion();
        }
    }

    var procesarConfirmacion = function () {
        var model = {
            eMailNuevo: $(elements.TxtCorreoIngresado).val().trim(),
            celular: $(elements.TxtCelular).val().trim()
        };
        var confirmacionPromise = enviarCorreoConfirmacionEmailPromise(model);

        confirmacionPromise.then(function (response) {
            if (response.success) {
                mostrarPopupConfirmacion();
                var model = {
                    celular: $(elements.TxtCelular).val().trim()
                };
                var cuponPromise = activarCuponPromise(model);

                cuponPromise.then(function (response) {
                    if (response.success) {
                        obtenerCupon();
                    }
                }, function (xhr, status, error) { });
            } else {
                AbrirMensaje(response.message, "MENSAJE DE VALIDACIÓN");
            }
        }, function (xhr, status, error) { });
    }

    var procesarGanaste = function () {
        mostrarPopupGanaste();

        if (!setting.Cupon.CorreoGanasteEnviado) {
            var model = {
                celular: $(elements.TxtCelular).val().trim()
            };
            var cuponPromise = activarCuponPromise(model);
            var correoGanastePromise = enviarCorreoActivacionCuponPromise();

            $.when(cuponPromise, correoGanastePromise)
                .then(function (cuponResponse, correoResponse) {
                    if (cuponResponse.success && correoResponse.success) {
                        obtenerCupon();
                    }
                });
        }
    }

    var procesarGana = function () {
        var valor = parseInt(setting.Cupon.FormatoValorAsociado);
        $(elements.TxtCorreoIngresado).val(userModel.correo);
        $(elements.TxtCelular).val(userModel.celular);
        $("div#chckTerminosCondiciones").addClass('check_intriga');
        $(elements.ContenedorTituloGana).empty();
        $(elements.ContenedorTituloGana).append(valor);
        $(elements.ContenedorMontoLimitePopupGana).empty();
        if ($(elements.ContenedorMontoLimitePopupGana).parents('.content_monto_cupon').length > 0) {
            $(elements.ContenedorMontoLimitePopupGana).append('<center>Descuento de hasta ' + setting.SimboloMoneda + ' ' + setting.Cupon.MontoLimiteFormateado + '</center>');
        } else {
            $(elements.ContenedorMontoLimitePopupGana).append('Descuento de hasta ' + setting.SimboloMoneda + ' ' + setting.Cupon.MontoLimiteFormateado);
        }

        ocultarTodosLosMensajesError();
        mostrarPopupGana();
    }

    var mostrarContenedorCuponPorPagina = function () {
        if (setting.PaginaOrigen == CONS_PAGINA_ORIGEN.DESKTOP_BIENVENIDA ||
            setting.PaginaOrigen == CONS_PAGINA_ORIGEN.DESKTOP_PEDIDO ||
            setting.PaginaOrigen == CONS_PAGINA_ORIGEN.MOBILE_BIENVENIDA ||
            setting.PaginaOrigen == CONS_PAGINA_ORIGEN.MOBILE_PEDIDO ||
            setting.PaginaOrigen == CONS_PAGINA_ORIGEN.MOBILE_PEDIDO_DETALLE) {
            if (setting.MostrarContenedorPadreCupon) {
                $(elements.ContenedorPadreCupon).show();

                if (setting.MostrarContenedorInfo) {
                    mostrarContenedorInfo();        
                }
                else {
                    //mostrarContenedorConocelo();      
                    $(elements.ContenedorPadreCupon).hide();        
                }

            } else {
                $(elements.ContenedorPadreCupon).hide();
            }
        }

        $('[data-cupon-info-opt]').hide();          
        //if (setting.PaisISO == "PE") {        
        //    $('[data-cupon-info-opt]').hide();        
        //}     
    }


    

    var obtenerCupon = function () {
        var cuponPromise = obtenerCuponPromise();
        cuponPromise.then(function (response) {
            if (response.success) {
                if (response.data) {
                    setting.Cupon = response.data;
                    if (setting.Cupon) {
                        finishLoadCuponContenedorInfo = true;
                        setting.MostrarContenedorPadreCupon = setting.TieneCupon;
                        //setting.MostrarContenedorInfo = (setting.Cupon.EstadoCupon == CONS_CUPON.CUPON_ACTIVO && setting.EsEmailActivo);          
                        setting.MostrarContenedorInfo = (setting.Cupon.EstadoCupon == CONS_CUPON.CUPON_ACTIVO);         
                        mostrarContenedorCuponPorPagina();
                    }
                }
            }

        }, function (xhr, status, error) { });
    }

    var activarCuponPromise = function (model) {
        var d = $.Deferred();
        var promise = $.ajax({
            type: 'POST',
            url: setting.BaseUrl + setting.UrlActivarCupon,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(model),
            async: true
        });

        promise.done(function (response) {
            d.resolve(response);
        })
        promise.fail(d.reject);

        return d.promise();
    }

    

    var enviarCorreoConfirmacionEmailPromise = function (model) {
        var d = $.Deferred();
        var promise = $.ajax({
            type: 'POST',
            url: setting.BaseUrl + setting.UrlEnviarCorreoConfirmacionEmail,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(model),
            async: true
        });

        promise.done(function (response) {
            d.resolve(response);
        })
        promise.fail(d.reject);

        return d.promise();
    }

    var obtenerCuponPromise = function () {
        var d = $.Deferred();
        var promise = $.ajax({
            type: 'GET',
            url: setting.BaseUrl + setting.UrlObtenerCupon,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            async: true
        });

        promise.done(function (response) {
            d.resolve(response);
        })
        promise.fail(d.reject);

        return d.promise();
    }

    var obtenerOfertasPlan20EnPedidoPormise = function () {
        var d = $.Deferred();
        var promise = $.ajax({
            type: 'GET',
            url: setting.BaseUrl + setting.UrlObtenerOfertasPlan20EnPedido,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            async: true
        });

        promise.done(function (response) {
            d.resolve(response);
        })
        promise.fail(d.reject);

        return d.promise();
    }

    var enviarCorreoActivacionCuponPromise = function () {
        var d = $.Deferred();
        var promise = $.ajax({
            type: 'POST',
            url: setting.BaseUrl + setting.UrlEnviarCorreoActivacionCupon,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            async: true
        });

        promise.done(function (response) {
            d.resolve(response);
        })
        promise.fail(d.reject);

        return d.promise();
    }

    var confirmarDatosEsValido = function (emailOriginal, emailIngresado, celular, aceptoTerCond) {
        var cantidadErrores = 0;

        if (!validarCelular(celular)) {
            cantidadErrores++;
        }

        if (!esFormatoCorreoValido(emailIngresado)) {
            
            mostrarMensajeErrorCorreo();
            cantidadErrores++;
        } else {
            ocultarMensajeErrorCorreo();
        }

        if (!aceptoTerCond) {
            mostrarMensajeErrorTerminosCondiciones();
            cantidadErrores++;
        } else {
            ocultarMensajeTerminosCondiciones();
        }

        return (cantidadErrores == 0);
    }

    var validarCelular = function (celular) {
        if (celular.length > 0) {
            if ($.isNumeric(celular)) {
                if (celular > 0) {
                    ocultarMensajeErrorCelular();
                } else {
                    mostrarMensajeErrorCelular();
                    return false;
                }
            } else {
                mostrarMensajeErrorCelular();
                return false;
            }
        } else {
            ocultarMensajeErrorCelular();
        }

        return true;
    };

    var mostrarPopupGanaste = function () {
        var simbolo = "%";
        var valor = parseInt(setting.Cupon.FormatoValorAsociado);
        var campania = setting.CampaniaActual.substring(4);

        $(elements.ContenedorTituloGanaste).empty();
                            
        $(elements.ContenedorTituloGanaste).append(nombreAlias.toUpperCase() + " ¡TIENES UN CUPÓN DE DSCTO!"); 
        //$(elements.ContenedorTituloGanaste).append(nombreAlias.toUpperCase() + " ¡TIENES UN CUPÓN DE " + valor + simbolo + " DE DSCTO!");             
        //$(elements.ContenedorTituloGanaste).append("¡ACTIVASTE TU CUPÓN DE " + valor + simbolo + " DE DSCTO!");              

        $(elements.ContenedorTexto02Ganaste).empty();
        $(elements.ContenedorTextoDetalleCuponCampania).empty();    
        //$(elements.ContenedorTextoDetalleCuponCampania).append("Válido sólo en C" + campania + " (Dscto. máximo " + setting.SimboloMoneda + " " + setting.Cupon.MontoLimiteFormateado + "). El Dscto. se reflejará en tu facturación");     
        $(elements.ContenedorTextoDetalleCuponCampania).append("Tu descuento lo verás reflejado en tu facturación (dscto. hasta " + setting.SimboloMoneda + " " + setting.Cupon.MontoLimiteFormateado + ")");
        $(elements.ContenedorMontoLimitePopupGanaste).empty();  
        //$(elements.ContenedorMontoLimitePopupGanaste).append("Agrega mínimo 1 oferta Gana+ pasando pedido por el App " + (isEsika ? "Ésika" : "L'bel") + " Conmigo *"); 
        $(elements.ContenedorMontoLimitePopupGanaste).append("Solo válido en la campaña C" + campania + " y pasando pedido por la web o app");

        $(elements.PopupGanaste).show();
        $(elements.PopupCuponGana).hide();
        $(elements.PopupConfirmacion).hide();

        //if (setting.PaisISO == "PE") {            
        //    $('[data-cupon-ganaste-condicion2]').hide();      
        //}     
    }

    var mostrarPopupGana = function () {
        $(elements.PopupCuponGana).show();
        $(elements.PopupGanaste).hide();
        $(elements.PopupConfirmacion).hide();
    }

    var mostrarPopupConfirmacion = function () {
        var correoIngresado = $(elements.TxtCorreoIngresado).val().trim();
        $(elements.ContenedorMostrarCorreo).empty();
        $(elements.ContenedorMostrarCorreo).append(correoIngresado);
        $(elements.PopupCuponGana).hide();
        $(elements.PopupConfirmacion).show();
    }

    var cerrarTodosPopupCupones = function () {
        $(elements.PopupCuponGana).hide();
        $(elements.PopupConfirmacion).hide();
        $(elements.PopupGanaste).hide();
    }

    var mostrarContenedorInfo = function () {
        var mensaje = "";
        var simbolo = (setting.Cupon.TipoCupon == CONS_CUPON.TIPO_CUPON_MONTO ? setting.SimboloMoneda : "%");
        var valor = (setting.Cupon.TipoCupon == CONS_CUPON.TIPO_CUPON_MONTO ? setting.Cupon.FormatoValorAsociado : parseInt(setting.Cupon.FormatoValorAsociado));
        var ofertasPlan20Promise = obtenerOfertasPlan20EnPedidoPormise();

        ofertasPlan20Promise.then(function (response) {
            if (response.success) {
                setting.CumpleMostrarContenedorCupon = true;
                setting.TieneOfertasPlan20 = response.tieneOfertasPlan20;
                if (response.tieneOfertasPlan20) {      
                    if (setting.Cupon.TipoCupon == CONS_CUPON.TIPO_CUPON_MONTO) {       
                        mensaje = "<b style='font-weight: 900'>¡TIENES UN CUPÓN DE DSCTO DE " + simbolo + " " + valor + "!</b><br>MONTO MÁXIMO DE DSCTO DE " + setting.SimboloMoneda + " " + setting.Cupon.MontoLimiteFormateado +" <br>Lo verás reflejado en tu facturación";      
                    } else {
                        mensaje = "<b style='font-weight: 900'>¡TIENES UN CUPÓN DE DSCTO DE " + valor + simbolo + "!</b><br>MONTO MÁXIMO DE DSCTO DE " + setting.SimboloMoneda + " " + setting.Cupon.MontoLimiteFormateado + "<br>Lo verás reflejado en tu facturación";
                    }

                    $("#divCondicionesCupon").hide();       
                }
                else {
                    var marca = isEsika ? "Ésika" : "L'bel";      
                    if (setting.Cupon.TipoCupon == CONS_CUPON.TIPO_CUPON_MONTO) {       
                        mensaje = "Agrega 1 oferta de Gana+ pasando pedido por el app " + marca + " Conmigo para hacer <span><b style='font-weight: 900'>válido tu " + simbolo + " " + valor + " DSCTO *</b></span>";       
                    } else {    
                        mensaje = "Agrega 1 oferta de Gana+ pasando pedido por el app " + marca + " Conmigo para hacer <span><b style='font-weight: 900'>válido tu " + valor + simbolo + " DSCTO *</b></span>";     
                    }   

                    $("#divCondicionesCupon").show();   
                }

                $(elements.ContenedorCuponInfo).each(function (index) {
                    var existeContenedorTextoDesktop = $(this).find('div.texto_cupon_monto').length > 0;
                    var existeContenedorTextoMobile = $(this).find('div.texto_cupon').length > 0;

                    if (existeContenedorTextoDesktop) {
                        $(this).find('div.texto_cupon_monto').empty();
                        $(this).find('div.texto_cupon_monto').append(mensaje);
                        $(this).show();
                    }
                    else if (existeContenedorTextoMobile) {
                        $(this).find('div.texto_cupon').empty();
                        $(this).find('div.texto_cupon').append(mensaje);
                        $(this).show();
                    } else {
                        $(this).empty();
                        $(this).append(mensaje);
                        $(this).show();
                    }
                    if (response.tieneOfertasPlan20) { cambiarImagenPorGif($(this)); }
                    else { cambiarGifPorImagen($(this)); }
                });

                $(elements.ContenedorCuponConocelo).hide();
                if (setting.PaisISO == "PE") {
                    $('[data-cupon-info-opt]').hide();
                    $('#cupon-pedido-mobile').show();
                }
                finishLoadCuponContenedorInfo = true;
            }
        }, function (xhr, status, error) { });
    }


    var cambiarImagenPorGif = function (contenedor) {
        var backImg = "", nuevoBackImg = "";
        
        if ($(contenedor).find('img').length > 0) {
            backImg = $(contenedor).find('img').attr('src');
            nuevoBackImg = backImg.replace('icono_cupon.png', 'cupon_gif_negro.gif');
            $(contenedor).find('img').attr('src', nuevoBackImg);
            return;
        }
        backImg = $(contenedor).css('background-image');
        nuevoBackImg = backImg.replace('icono_cupon.png', 'cupon_gif_negro.gif');
        $(contenedor).css('background-image', nuevoBackImg);
    }

    var cambiarGifPorImagen = function (contenedor) {
        var nuevoBackImg, backImg;
        if ($(contenedor).find('img').length > 0) {
             backImg = $(contenedor).find('img').attr('src');
             nuevoBackImg = backImg.replace('cupon_gif_negro.gif', 'icono_cupon.png');
            $(contenedor).find('img').attr('src', nuevoBackImg);
            return;
        }
         backImg = $(contenedor).css('background-image');
         nuevoBackImg = backImg.replace('cupon_gif_negro.gif', 'icono_cupon.png');
        $(contenedor).css('background-image', nuevoBackImg);
    }

    var mostrarPopupGanasteAlConfirmarCorreo = function () {
        var keepAsking = true;
        var timerId = setInterval(function () {
            if (!keepAsking) {
                clearInterval(timerId);
            } else {
                if (setting.Cupon) {
                    mostrarPopupGanaste();
                    keepAsking = false;
                }
            }
        }, 1000);
    }

    var mostrarPopupGanaDesdeGestorDePopups = function () {
        var keepAsking = true;
        var timerId = setInterval(function () {
            if (!keepAsking) {
                clearInterval(timerId);
            } else {
                if (setting.Cupon) {
                    procesarGana();
                    keepAsking = false;
                }
            }
        }, 2000);
    }

    var mostrarMensajeErrorCorreo = function () {
        $(elements.ContenedorMensajeErrorCorreo).show();
        $(elements.IconoMensajeErrorCorreo).show();
    }

    var ocultarMensajeErrorCorreo = function () {
        $(elements.ContenedorMensajeErrorCorreo).hide();
        $(elements.IconoMensajeErrorCorreo).hide();
    }

    var mostrarMensajeErrorCelular = function () {
        $(elements.ContenedorMensajeErrorCelular).show();
        $(elements.IconoMensajeErrorCelular).show();
    }

    var ocultarMensajeErrorCelular = function () {
        $(elements.ContenedorMensajeErrorCelular).hide();
        $(elements.IconoMensajeErrorCelular).hide();
    }

    var mostrarMensajeErrorTerminosCondiciones = function () {
        $("div#chckTerminosCondiciones").addClass('borde_seleccion_alerta');
        $(elements.ContenedorMensajeErrorTerminosCondiciones).show();
    }

    var ocultarMensajeTerminosCondiciones = function () {
        $("div#chckTerminosCondiciones").removeClass('borde_seleccion_alerta');
        $(elements.ContenedorMensajeErrorTerminosCondiciones).hide();
    }

    var ocultarTodosLosMensajesError = function () {
        ocultarMensajeErrorCorreo();
        ocultarMensajeErrorCelular();
        ocultarMensajeTerminosCondiciones();
    };

    return {
        ini: function (parameters) {
            inizializer(parameters);
        },
        obtenerCupon: obtenerCupon,
        mostrarCupon: function () {
            return setting.Cupon;
        },
        actualizarContenedorCupon: function () {
            mostrarContenedorCuponPorPagina();
        },
        revisarMostrarContenedorCupon: function () {
          
            mostrarContenedorCuponPorPagina();
        },
        mostrarPopupGanaste: mostrarPopupGanasteAlConfirmarCorreo,
        mostrarPopupGana: mostrarPopupGanaDesdeGestorDePopups
    };
})();
/* 
Escritorio  => 1: Index    | 11: Detalle Oferta
Mobile      => 2: Index    | 21: Detalle Oferta
*/
var tipoOrigenPantalla = tipoOrigenPantalla || "";
var origenPedidoWeb = origenPedidoWeb || 0;
var origenPedidoWebTactica = origenPedidoWebTactica || 0;
var origenPedidoWebCarrusel = origenPedidoWebCarrusel || 0;
var showRoomOrigenInsertar = showRoomOrigenInsertar || 0;

$(document).ready(function () {
    if (tipoOrigenPantalla == 11) {
        $(".verDetalleCompraPorCompra").click(function () {
            var padre = $(this).parents("[data-item]")[0];
            var article = $(padre).find("[data-campos]").eq(0);
            var posicion = $(article).find(".posicionEstrategia").val();

            $("#PopDetalleCompra").show();

            EstablecerLazyCarrusel($('.content_carrusel_pop_compra'));
            $('.content_carrusel_pop_compra.slick-initialized').slick('unslick');
            $('.content_carrusel_pop_compra').not('.slick-initialized').slick({
                lazyLoad: 'ondemand',
                dots: false,
                infinite: true,
                vertical: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '<a class="previous_ofertas js-slick-prev" style="display: block;left: 0;margin-left: -13%;"><img src="' + baseUrl + 'Content/Images/Esika/left_compra.png")" alt="" /></a>',
                nextArrow: '<a class="previous_ofertas js-slick-next" style="display: block;right: 0;margin-right: -13%; text-align:right;"><img src="' + baseUrl + 'Content/Images/Esika/right_compra.png")" alt="" /></a>'
            });

            $('.content_carrusel_pop_compra').slick('slickGoTo', parseInt(posicion) - 1);
        });

        EstablecerLazyCarrusel($('.responsive'));

        $('.responsive').not('.slick-initialized').slick({
            lazyLoad: 'ondemand',
            infinite: true,
            vertical: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            speed: 260,
            prevArrow: '<a class="previous_ofertas js-slick-prev" style="display: block;left: 0;margin-left: -5%;"><img src="' + baseUrl + 'Content/Images/Esika/previous_ofertas_home.png")" alt="" /></a>',
            nextArrow: '<a class="previous_ofertas js-slick-next" style="display: block;right: 0;margin-right: -5%;text-align:right"><img src="' + baseUrl + 'Content/Images/Esika/next.png")" alt="" /></a>'
        });

        EstablecerLazyCarrusel($('.content_ficha_compra'));
        $('.content_ficha_compra').slick({
            lazyLoad: 'ondemand',
            dots: true,
            infinite: true,
            vertical: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            pantallaPedido: false,
            prevArrow: '<button type="button" data-role="none" class="slick-next next_compraxcompra"></button>',
            nextArrow: '<button type="button" data-role="none" class="slick-prev previous_compraxcompra"></button>'
        });
        //marca google analytics*******************************
        var divs = $(".content_ficha_compra").find("[data-campos]");
        var array_impresions_tactica_desktop = new Array();

        $(divs).each(function (index, value) {
            var existe = false;
            var id = $(value).find(".valorCuv").val();
            $(array_impresions_tactica_desktop).each(function (ind, val) {
                if (val.id == id)
                    existe = true;
            })

            if (!existe) {
                array_impresions_tactica_desktop.push({
                    name: $(value).find(".DescripcionProd").val(),
                    id: id,
                    price: $(value).find(".clasePrecioUnidad").val(),
                    category: 'NO DISPONIBLE',
                    brand: $(value).find(".DescripcionMarca").val(),
                    position: $(value).find(".posicionEstrategia").val(),
                    list: 'Ofertas Showroom'
                });
            }
        });
        dataLayer.push({
            'event': 'productImpression',
            'ecommerce': {
                'impressions': array_impresions_tactica_desktop
            }
        });
        //***************************************
    }
    else if (tipoOrigenPantalla == 21) { // Mobile Oferta Detalle
        $(".verDetalleCompraPorCompra").click(function () {
            var padre = $(this).parents("[data-item]");
            var article = $(padre).find("[data-campos]").eq(0);
            var posicion = $(article).find(".posicionEstrategia").val();

            $('body').css({ 'overflow-x': 'hidden' });
            $('body').css({ 'overflow-y': 'hidden' });
            $('#PopCompra').show();

            EstablecerLazyCarrusel($('.content_pop_compra'));
            $('.content_pop_compra.slick-initialized').slick('unslick');
            $('.content_pop_compra').slick({
                lazyLoad: 'ondemand',
                dots: false,
                infinite: true,
                vertical: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: '<a class="previous_ofertas js-slick-prev" style="display: block;left: 0;margin-left: -10%; top: 35%;"><img src="' + baseUrl + 'Content/Images/Esika/left_compra.png")" alt="" /></a>',
                nextArrow: '<a class="previous_ofertas js-slick-next" style="display: block;right: 0;margin-right: -10%; text-align:right;  top: 35%;"><img src="' + baseUrl + 'Content/Images/Esika/right_compra.png")" alt="" /></a>'
            });

            $('.content_pop_compra').slick('slickGoTo', parseInt(posicion) - 1);
        });

        $("#CerrarPopCompra").click(function () {
            $('body').css({ 'overflow-y': 'scroll' });
            $('#PopCompra').hide();
        });

        $("footer").hide();
        $("#content").css("margin-top", "63px");

        EstablecerLazyCarrusel($('.variable-width'));

        $('.variable-width').on('init', function (event, slick) {
            setTimeout(function () {
                slick.setPosition();
                slick.slickGoTo(1);
                $("#divEstrategias").find("[data-posicion-set]").find(".orden_listado_numero").find("[data-posicion-current]").html(2);
            }, 500);
        }).slick({
            lazyLoad: 'ondemand',
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            centerPadding: '0px',
            centerMode: true,
            variableWidth: true,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
        }).on('swipe', function (event, slick, direction) {
            var posicion = slick.currentSlide;
            posicion = Math.max(parseInt(posicion), 0);

            if (direction == 'left') { // dedecha a izquierda
                posicion = posicion + 1;
            } else if (direction == 'right') {
                posicion = posicion + 1;
            }

            $("#divEstrategias").find("[data-posicion-set]").find(".orden_listado_numero").find("[data-posicion-current]").html(posicion);
        });

        EstablecerLazyCarrusel($('.content_compra_carrusel'));
        $('.content_compra_carrusel').slick({
            lazyLoad: 'ondemand',
            dots: false,
            infinite: true,
            vertical: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<a class="previous_ofertas js-slick-prev" style="display: block;left: -13%; top:30%;"><img src="' + baseUrl + 'Content/Images/Esika/flecha_compra_left.png")" alt="" /></a>',
            nextArrow: '<a class="previous_ofertas js-slick-next" style="display: block;right: -13%; top:30%; text-align:right;"><img src="' + baseUrl + 'Content/Images/Esika/flecha_compra_right.png")" alt="" /></a>'
        });
        //marca google analytics*******************************
        var divs = $(".content_pop_compra").find("[data-campos]");
        var array_impresions_tactica_desktop = new Array();

        $(divs).each(function (index, value) {
            var existe = false;
            var id = $(value).find(".valorCuv").val();
            $(array_impresions_tactica_desktop).each(function (ind, val) {
                if (val.id == id)
                    existe = true;
            })

            if (!existe) {
                array_impresions_tactica_desktop.push({
                    name: $(value).find(".DescripcionProd").val(),
                    id: id,
                    price: $(value).find(".clasePrecioUnidad").val(),
                    category: 'NO DISPONIBLE',
                    brand: $(value).find(".DescripcionMarca").val(),
                    position: $(value).find(".posicionEstrategia").val(),
                    list: 'Ofertas Showroom'
                });
            }
        });
        dataLayer.push({
            'event': 'productImpression',
            'ecommerce': {
                'impressions': array_impresions_tactica_desktop
            }
        });
        //***************************************
    }
    else if (tipoOrigenPantalla == 2) {
        CargarShowroomMobile(null);
    }

    $("body").on("click", "[data-btn-agregar-sr]", function (e) {
        var padre = $(this).parents("[data-item]");
        var article = $(padre).find("[data-campos]").eq(0);
        var cantidad = $(padre).find("[data-input='cantidad']").val();

        if (cantidad == "" || cantidad == 0) {
            AbrirMensaje("La cantidad ingresada debe ser mayor que 0, verifique.");
            return false;
        }

        AgregarOfertaShowRoom(article, cantidad);
        e.preventDefault();
        (this).blur();
        $(".contenedor_circulos").fadeIn();
        setTimeout(function () {
            $(".contenedor_circulos").fadeOut();
        }, 2700);
    });

    $("body").on("click", "[data-btn-agregar-cpc]", function (e) {
        var padre = $(this).parents("[data-item]");
        var article = $(padre).find("[data-campos]").eq(0);
        var cantidad = $(padre).find("[data-input='cantidad']").val();

        if (cantidad == "" || cantidad == 0) {
            AbrirMensaje("La cantidad ingresada debe ser mayor que 0, verifique.");
            return false;
        }

        AgregarOfertaShowRoomCpc(article, cantidad);
        e.preventDefault();
        (this).blur();
    });
    $("#btn_descubre_mobile").on("click", function () {
        $('body').css({ 'overflow-y': 'hidden' });
        // Set the effect type
        var effect = 'slide';
        // Set the options for the effect type chosen
        //var options = { direction: $('.mySelect').val() };
        var options = { direction: 'down' };
        // Set the duration (default: 400 milliseconds)
        var duration = 500; agregarSetEspecial
        $('.content_display_set_suboferta').toggle(effect, options, duration);
        $('#agregarSetEspecial').slideDown();
        $("div.content_btn_agregar").find("#txtCantidad").val(1);
        ConfigurarSlick();
    });
    $("#btn_cerrar_mobile").on("click", function () {
        var effect = 'slide';
        var options = { direction: 'down' };
        var duration = 500;
        $('.content_display_set_suboferta').toggle(effect, options, duration);
        $('#agregarSetEspecial').slideUp();
        $('body').css({ 'overflow-y': 'auto' });

    });
 
    if ($('.btn_volver_detalle_oferta')[0])
    {
        var urlReefer = $($('.btn_volver_detalle_oferta')[0]).attr('href');

        if (urlReefer)
        {
            if (urlReefer.search('/DetalleOferta') > 0 && urlReefer.search('Mobile') > 0)
            {
                var urlBack = urlReefer.substring(0, urlReefer.search('/DetalleOferta'));
                $($('.btn_volver_detalle_oferta')[0]).attr('href', urlBack);
            }
        }
    }
});

$(document).ready(function () {
    if (isMobile()) {
        $('[data-tono-showroom-change]').click(mostrarListaTonos);
    } else {
        $('body').on('click', '[data-tono-showroom-change]', mostrarListaTonos);
    }  

    function mostrarListaTonos() {
        var accion = $(this).attr("data-tono-showroom-change");

        var hideSelect = $(this).parents("[data-tono]").find('.content_tonos_select').attr("data-visible");
        if (hideSelect == "1") {
            $(this).parents("[data-tono]").find('.content_tonos_select').hide();
            $(this).parents("[data-tono]").find('.content_tonos_select').attr("data-visible", "0");
            $(this).parents("[data-tono]").find("[data-tono-showroom-change='1']").parent().removeClass("tono_por_elegir");
            if (accion == 1)
                return true;
        }

        if (accion == 1) {
            $("[data-tono]").find('.content_tonos_select').hide();
            $("[data-tono]").find('.content_tonos_select').attr("data-visible", "0");
            $("[data-tono]").find("[data-tono-showroom-change='1']").parent().removeClass("tono_por_elegir");

            $(this).parents("[data-tono]").find('.content_tonos_select').attr("data-visible", "1");
            $(this).parents("[data-tono]").find('.content_tonos_select').show();
            $(this).parent().addClass("tono_por_elegir");
            return true;
        }

        var cuv = $.trim($(this).attr("data-tono-cuv"));
        var prod = $(this).parents("[data-tono]");
        var objSet = prod.find("[data-tono-showroom-change='1']");
        objSet.find("img").attr("src", $(this).find("img").attr("src"));
        objSet.find(".tono_seleccionado").show();
        objSet.find(".texto_tono_seleccionado").html($(this).attr("data-tono-nombre"));

        objSet.parent().addClass("tono_escogido");
        prod.find("[data-tono-select-nombrecomercial]").html($(this).attr("data-tono-descripcion"));
        prod.attr("data-tono-select", cuv);

        prod.find("[data-tono-div]").find("[data-tono-cuv]").removeClass("borde_seleccion_tono");
        var estrategia = prod.parents("[data-estrategia='2001']").length;
        if (estrategia > 0) {
            prod.find("[data-tono-div]").find("[data-tono-cuv='" + cuv + "']").addClass("borde_seleccion_tono");
        }

        var objCompartir = prod.find("[data-item]").find("[data-compartir-campos]");
        objCompartir.find(".CUV").val(cuv);
        objCompartir.find(".Nombre").val($(this).attr("data-tono-descripcion"));

        var listaDigitables = prod.parents("[data-item]").find("[data-tono-digitable='1']");
        var btnActivar = true;
        $.each(listaDigitables, function (i, item) {
            var cuv = $.trim($(item).attr("data-tono-select"));
            btnActivar = btnActivar ? !(cuv == "") : btnActivar;
        });

        if (btnActivar) {
            $('#btnAgregalo').removeClass('btn_desactivado_general');
        }
    }
});

function CargarProductosShowRoom(busquedaModel) {
    $.ajaxSetup({ cache: false });

    $('#divProductosShowRoom').html('<div style="text-align: center; min-height:150px;"><br><br><br><br>Cargando Productos ShowRoom<br><img src="' + urlLoad + '" /></div>');
    $("#divProductosShowRoom").show();

    var aplicarFiltrosSubCampanias = (busquedaModel == null);
    var cargarProductosShowRoomPromise = CargarProductosShowRoomPromise(busquedaModel);

    $.when(cargarProductosShowRoomPromise)
        .then(function (response) {
            ResolverCargarProductosShowRoomPromiseDesktop(response, aplicarFiltrosSubCampanias, busquedaModel);
            EstablecerAccionLazyImagen("img[data-lazy-seccion-showroom]");
        })
        .fail(function (response) {
            if (busquedaModel.hidden) {
                var impressions = [];

                if (typeof value != "undefined") {

                    var impression = {
                        name: value.Descripcion,
                        id: value.CUV,
                        price: value.PrecioOferta,
                        category: 'NO DISPONIBLE',
                        brand: value.DescripcionMarca,
                        position: index + 1,
                        list: 'Ofertas Showroom'
                    };

                    impressions.push(impression);
                }

                if (impressions.length > 0) {
                    dataLayer.push({
                        'event': 'productImpression',
                        'ecommerce': { 'impressions': impressions }
                    });
                }

                $("#divProductosShowRoom").hide();
            }
            if (checkTimeout(response)) {
                CerrarLoad();
            }
        });

}

function AgregarOfertaShowRoom(article, cantidad) {
    
    var CUV = $(article).find(".valorCuv").val();
    var MarcaID = $(article).find(".claseMarcaID").val();
    var PrecioUnidad = $(article).find(".clasePrecioUnidad").val();
    var ConfiguracionOfertaID = $(article).find(".claseConfiguracionOfertaID").val();
    var nombreProducto = $(article).find(".DescripcionProd").val();
    var posicion = $(article).find(".posicionEstrategia").val();
    var descripcionMarca = $(article).find(".DescripcionMarca").val();
    var esSubCampania = $(article).parents('.content_set_oferta_especial').length > 0;
    if (!esSubCampania) {
        esSubCampania = $(article).parents('div#contenedor-showroom-subcampanias-mobile').length > 0;
    }
    dataLayer.push({
        'event': 'addToCart',
        'ecommerce': {
            'add': {
                'actionField': { 'list': 'Ofertas Showroom' },
                'products': [{
                    'name': nombreProducto,
                    'id': CUV,
                    'price': PrecioUnidad,
                    'brand': descripcionMarca,
                    'variant': 'Ofertas Showroom',
                    'category': 'NO DISPONIBLE',
                    'quantity': cantidad
                }]
            }
        }
    });



    var origen = $(article).find(".origenPedidoWeb").val() || 0;
    if (origen == 0) {
        if (posicion != "0") {
            if (origenPedidoWebCarrusel != -1)
                origen = origenPedidoWebCarrusel;
            else if (tipoOrigenPantalla == 1) {
                origen = showRoomOrigenInsertar == 0 ? origenPedidoWeb : showRoomOrigenInsertar;
            }
            else
                origen = origenPedidoWeb;
        } else {
            origen = origenPedidoWeb;
        }
    }

    if (esSubCampania) {
        origen = origenPedidoWebSubCampania;
    }
    AbrirLoad();
    $.ajaxSetup({
        cache: false
    });
    $.getJSON(baseUrl + 'ShowRoom/ValidarUnidadesPermitidasPedidoProducto', { CUV: CUV, PrecioUnidad: PrecioUnidad, Cantidad: cantidad }, function (data) {
        
        if (parseInt(data.Saldo) < parseInt(cantidad)) {
            var Saldo = data.Saldo;
            var UnidadesPermitidas = data.UnidadesPermitidas;

            CerrarLoad();

            if (Saldo == UnidadesPermitidas)
                AbrirMensaje("Lamentablemente, la cantidad solicitada sobrepasa las Unidades Permitidas de Venta (" + UnidadesPermitidas + ") del producto.");
            else {
                if (Saldo == "0")
                    AbrirMensaje("Las Unidades Permitidas de Venta son solo (" + UnidadesPermitidas + "), pero Usted ya no puede adicionar más, debido a que ya agregó este producto a su pedido, verifique.");
                else
                    AbrirMensaje("Las Unidades Permitidas de Venta son solo (" + UnidadesPermitidas + "), pero Usted solo puede adicionar (" + Saldo + ") más, debido a que ya agregó este producto a su pedido, verifique.");
            }
        } else {
            var Item = {
                MarcaID: MarcaID,
                Cantidad: cantidad,
                PrecioUnidad: PrecioUnidad,
                CUV: CUV,
                ConfiguracionOfertaID: ConfiguracionOfertaID,
                OrigenPedidoWeb: origen
            };

            $.ajaxSetup({ cache: false });

            jQuery.ajax({
                type: 'POST',
                url: baseUrl + 'ShowRoom/InsertOfertaWebPortal',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(Item),
                async: true,
                success: function (response) {
                    CerrarLoad();
                    if (response.success == true) {

                        if ($.trim(tipoOrigenPantalla)[0] == '1') {
                            CargarResumenCampaniaHeader(true);

                            $(article).parents("[data-item]").find(".product-add").css("display", "block");
                        }

                        if ($.trim(tipoOrigenPantalla)[0] == '2') {
                            CargarCantidadProductosPedidos();
                        }

                        var padre = $(article).parents("[data-item]");
                        $(padre).find("[data-input='cantidad']").val(1);

                        AgregarProductoAlCarrito($(article).parents("[data-item]"));
                    }
                    else {
                        AbrirPopupPedidoReservado(response.message, tipoOrigenPantalla);
                    }
                },
                error: function (response, error) {
                    if (checkTimeout(response)) {
                        CerrarLoad();
                    }
                }
            });
        }
    });
}

function AgregarOfertaShowRoomCpc(article, cantidad) {
    var CUV = $(article).find(".valorCuv").val();
    var MarcaID = $(article).find(".claseMarcaID").val();
    var PrecioUnidad = $(article).find(".clasePrecioUnidad").val();

    AbrirLoad();

    AgregarProductoAlCarrito($(article).parents("[data-item]"));

    $.ajaxSetup({
        cache: false
    });

    var Item = {
        MarcaID: MarcaID,
        Cantidad: cantidad,
        PrecioUnidad: PrecioUnidad,
        CUV: CUV,
        OrigenPedidoWeb: origenPedidoWebTactica
    };

    $.ajaxSetup({ cache: false });

    jQuery.ajax({
        type: 'POST',
        url: baseUrl + 'ShowRoom/InsertOfertaWebPortalCpc',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(Item),
        async: true,
        success: function (response) {
            CerrarLoad();

            if (response.success == true) {
                if ($.trim(tipoOrigenPantalla)[0] == '1') {
                    CargarResumenCampaniaHeader(true);
                    $("#PopDetalleCompra").hide();
                }

                if ($.trim(tipoOrigenPantalla)[0] == '2') {
                    CargarCantidadProductosPedidos();

                    $('#PopCompra').hide();
                    $('body').css({ 'overflow-x': 'auto' });
                    $('body').css({ 'overflow-y': 'auto' });
                }

                var padre = $(article).parents("[data-item]");
                $(padre).find("[data-input='cantidad']").val(1);

            } else messageInfoError(response.message);
        },
        error: function (response, error) {
            if (checkTimeout(response)) {
                CerrarLoad();
            }
        }
    });
}

function AgregarProductoAlCarrito(padre) {
    
    
    if ($.trim(tipoOrigenPantalla)[0] == '1') {
        var contenedorImagen = $(padre).find("[data-img]");
        var imagenProducto = $('.imagen_producto', contenedorImagen);

        if (imagenProducto.length <= 0) {
            return false;
        }

        var carrito = $('.campana.cart_compras');
        if (carrito.length <= 0) {
            return false;
        }

        $("body").prepend('<img src="' + imagenProducto.attr("src") + '" class="transicion">');

        $(".transicion").css({
            'height': imagenProducto.css("height"),
            'width': imagenProducto.css("width"),
            'top': imagenProducto.offset().top,
            'left': imagenProducto.offset().left,
        }).animate({
            'top': carrito.offset().top,
            'left': carrito.offset().left,
            'height': carrito.css("height"),
            'width': carrito.css("width"),
            'opacity': 0.5
        }, 450, 'swing', function () {
            $(this).animate({
                'top': carrito.offset().top,
                'opacity': 0
            }, 150, 'swing', function () {
                $(this).remove();
            });
        });
    }
}

function click_producto_showroow(Descripcion, CUV, PrecioOferta, DescripcionMarca, Posicion) {
    dataLayer.push({
        'event': 'productClick',
        'ecommerce': {
            'click': {
                'actionField': { 'list': 'Ofertas Showroom' },
                'products': [{
                    'name': Descripcion,
                    'id': CUV,
                    'price': PrecioOferta,
                    'brand': DescripcionMarca,
                    'category': 'NO DISPONIBLE',
                    'position': Posicion
                }]
            }
        }
    });
}

function CargarProductosShowRoomPromise(busquedaModel) {
    var d = $.Deferred();
    var promise = $.ajax({
        type: 'POST',
        url: baseUrl + 'ShowRoom/CargarProductosShowRoom',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(busquedaModel),
        async: true
    });
    promise.done(function (response) {
        d.resolve(response);
    })
    promise.fail(d.reject);
    return d.promise();
}

function recortarPalabra(palabra, tamanio) {
    return palabra.length > tamanio ? (palabra.substring(0, tamanio - 3) + '...') : palabra;
}

function ResolverCargarProductosShowRoomPromiseDesktop(response, aplicarFiltrosSubCampanias, busquedaModel) {

    if (response.success) {
        if (aplicarFiltrosSubCampanias) {
            response.listaSubCampania = validarUnidadesPermitidas(response.listaSubCampania);
            $.each(response.listaSubCampania, function (i, v) { v.Descripcion = IfNull(v.Descripcion, '').SubStrToMax(35, true); });

            SetHandlebars("#template-showroom-subcampania", response.listaSubCampania, "#contenedor-showroom-subcampanias");

            EstablecerLazyCarrusel($('#contenedor-showroom-subcampanias'));

        }

        $.each(response.listaNoSubCampania, function (index, value) {
            value.Descripcion = IfNull(value.Descripcion, '').SubStrToMax($.trim(tipoOrigenPantalla)[0] == '1' ? 40 : 30, true);
            value.Posicion = index + 1;
            value.UrlDetalle = urlDetalleShowRoom + '/' + value.OfertaShowRoomID;
        });


        SetHandlebars("#template-showroom", response.listaNoSubCampania, '#divProductosShowRoom');
        $("#spnCantidadFiltro").html(response.listaNoSubCampania.length);
        $("#spnCantidadTotal").html(response.totalNoSubCampania);
    }
    else {
        messageInfoError(response.message);
        if (busquedaModel && busquedaModel.hidden) { $("#divProductosShowRoom").hide(); }
    }
}

function CargarShowroomMobile(busquedaModel) {
    var cargarProductosShowRoomPromise = CargarProductosShowRoomPromise(busquedaModel);

    $.when(cargarProductosShowRoomPromise)
        .then(function (response) {
            ResolverCargarProductosShowRoomPromiseMobile(response, busquedaModel);
        })
        .fail(function (response) {
            if (busquedaModel && busquedaModel.hidden) {
                $("#divProductosShowRoom").hide();
            }
            if (checkTimeout(response)) {
                CerrarLoad();
            }
        });
}

function ResolverCargarProductosShowRoomPromiseMobile(response, busquedaModel) {

    if (response.success) {
        if (response.listaSubCampania.length < 1 && tieneCompraXCompra == 'False') {
            OcultarDivOfertaShowroomMobile();
            return false;
        }

        var data = new Object();
        data.CantidadProductos = response.listaSubCampania.length;
        data.Lista = AsignarPosicionAListaOfertas(response.listaSubCampania);
        $.each(response.listaSubCampania, function (i, v) { v.Descripcion = IfNull(v.Descripcion, '').SubStrToMax(30, true); });

        SetHandlebars("#template-showroom-subcampanias-mobile", data, "#contenedor-showroom-subcampanias-mobile");
        EstablecerLazyCarrusel($('#contenedor-showroom-subcampanias-mobile'));
    }
    else {
        messageInfoError(response.message);
        if (busquedaModel && busquedaModel.hidden) { $("#divProductosShowRoom").hide(); }
    }
}

function ConfigurarSlick() {
    $('#contenedor-showroom-subcampanias-mobile.slick-initialized').slick('unslick');
    $('#contenedor-showroom-subcampanias-mobile').slick({
        lazyLoad: 'ondemand',
        dots: false,
        infinite: true,
        vertical: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 260,
        prevArrow: '<a style="width: auto; display: block; left:  0; margin-left:  9%; top: 24%;"><img src="' + baseUrl + 'Content/Images/Esika/left_compra.png")" alt="" /></a>',
        nextArrow: '<a style="width: auto; display: block; right: 0; margin-right: 9%; text-align:right;  top: 24%;"><img src="' + baseUrl + 'Content/Images/Esika/right_compra.png")" alt="" /></a>'
    });
    $('#contenedor-showroom-subcampanias-mobile').slick('slickGoTo', 0);
}

function AsignarPosicionAListaOfertas(listaOfertas) {
    var posicion = 0;
    var nuevaListaOfertas = [];

    $.each(listaOfertas, function (index, value) {
        posicion++;
        value.Posicion = posicion;
        value.Contenido = ConstruirDescripcionOferta(value.ProductoTonos);
        nuevaListaOfertas.push(value);
    });

    return nuevaListaOfertas;
}

function ConstruirDescripcionOferta(arrDescripcion) {
    var descripcion = "";
    if (arrDescripcion != null) {
        $.each(arrDescripcion, function (index, value) {
            descripcion += value.NombreComercial + "<br />";
        });
    }
    return descripcion;
}

function OcultarDivOfertaShowroomMobile() {
    $("#content_sub_oferta_showroom").hide();
    $(".content_promocion").hide();
}

$("body").on("click", ".content_display_set_suboferta [data-odd-accion]", function (e) {
    var accion = $(this).attr("data-odd-accion").toUpperCase();
    if (accion == "AGREGAR") {
        var padre = $(this).parents("div.content_btn_agregar").siblings("#contenedor-showroom-subcampanias-mobile").find(".slick-active");
        var article = $(padre).find("[data-item]");
        var valorCantidad = $(this).parents("div.content_btn_agregar").find("#txtCantidad").val().trim();
        var cantidad = parseInt(valorCantidad == '' ? 0 : valorCantidad);

        if (cantidad == "" || cantidad == 0) {
            AbrirMensaje("La cantidad ingresada debe ser mayor que 0, verifique.");
            return false;
        }

        AgregarOfertaShowRoom(article, cantidad);
        $(this).parents("div.content_btn_agregar").find("#txtCantidad").val(1);
        e.preventDefault();
        (this).blur();
    }
});

function validarUnidadesPermitidas(listaShowRoomOferta) {
    var lista = [];
    if (listaShowRoomOferta != null) {
        if (listaShowRoomOferta.length > 0) {
            $.each(listaShowRoomOferta,
                function (index, value) {
                    lista.push(value);
                });
        }
    }
    return lista;
}

function compraxcompra_promotion_click(cuv, descripcion) {
    var name = 'Showroom – ' + descripcion;
    dataLayer.push({
        'event': 'promotionClick',
        'ecommerce': {
            'promoClick': {
                'promotions': [
                {
                    'id': cuv,
                    'name': name,
                    'position': 'Showroom Footer',
                    'creative': 'Promocion Showroom'
                }]
            }
        }
    });
}

function compraxcompra_promotion_click(cuv, descripcion) {
    var name = 'Showroom – ' + descripcion;
    dataLayer.push({
        'event': 'promotionClick',
        'ecommerce': {
            'promoClick': {
                'promotions': [
                    {
                        'id': cuv,
                        'name': name,
                        'position': 'Showroom Footer',
                        'creative': 'Promocion Showroom'
                    }]
            }
        }
    });
}

function EstrategiaAgregarShowRoom(event, popup) {
     
    var padre = $('#btnAgregalo').parents("[data-item]");
    var article = $(padre).find("[data-campos]").eq(0);
    var cantidad = $(padre).find("[data-input='cantidad']").val();
    var estrategia = EstrategiaObtenerObjShowRoom(event);
    var objInput = $('.detailItem');
    var origenPedidoWebEstrategia = "";
    var campania = estrategia.CampaniaID;
    var posicion = $(article).find(".posicionEstrategia").val();
    var esSubCampania = $(article).parents('.content_set_oferta_especial').length > 0;
    var CUV = $(article).find(".valorCuv").val();
    var PrecioUnidad = $(article).find(".clasePrecioUnidad").val();
    var cuvs = "";
    var origen = '';

    if (EstrategiaValidarSeleccionTonoShowRoom(objInput)) {
        return false;
    }

    if (!ValidacionesPreOperacion()) {
        return false;
    }


    if (!esSubCampania) {
        esSubCampania = $(article).parents('div#contenedor-showroom-subcampanias-mobile').length > 0;
    }

    AbrirLoad();

    estrategia.Cantidad = cantidad;

    cuvs = GenerarCadenaCuvs(objInput);

    origen = ObtenerCodigoPedidoWeb(article, posicion);


    $.ajaxSetup({
        cache: false
    });

    $.getJSON(baseUrl + 'ShowRoom/ValidarUnidadesPermitidasPedidoProducto', { CUV: CUV, PrecioUnidad: PrecioUnidad, Cantidad: cantidad }, function (data) {
       

        if (ValidarUnidadesPermitidas(data, cantidad)) {

            var params = ({
                CuvTonos: $.trim(cuvs),
                EstrategiaID: $.trim(estrategia.EstrategiaId),
                FlagNueva: "0",
                Cantidad: $.trim(cantidad),
                OrigenPedidoWeb: $.trim(origen),
                ClienteID_: '-1',
                TipoEstrategiaImagen: "0" 
            });
            $.ajaxSetup({ cache: false });


            jQuery.ajax({
                type: 'POST',
                url: baseUrl + 'Pedido/PedidoAgregarProducto',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(params),
                async: true,
                success: function (data) {
                    

                    CerrarLoad();
                    response = data;
                    if (response.success == true) {

                        if ($.trim(tipoOrigenPantalla)[0] == '1') {
                            CargarResumenCampaniaHeader(true);

                            $(article).parents("[data-item]").find(".product-add").css("display", "block");
                        }

                        if ($.trim(tipoOrigenPantalla)[0] == '2') {
                            CargarCantidadProductosPedidos();
                        }

                        var padre = $(article).parents("[data-item]");
                        $(padre).find("[data-input='cantidad']").val(1);

                        AgregarProductoAlCarrito($(article).parents("[data-item]"));
                    }
                    else {

                        AbrirPopupPedidoReservado(response.message, tipoOrigenPantalla);
                    } 

                },
                error: function (data, error) {
                    console.log(data, error);
                    CerrarLoad();
                }
            });
        }
        else
            CerrarLoad();


    });


}

function EstrategiaObtenerObjShowRoom(e) {

    var objHtmlEvent = $(e.target);
    if (objHtmlEvent.length == 0) objHtmlEvent = $(e);
    var objHtml = $('.detailItem').parents("[data-item]");
    var objAux = $.trim($(objHtml).find("[data-estrategiaJson]").attr("data-estrategiaJson"));
    var estrategia = (objAux != "") ? JSON.parse(objAux) : {};
    return estrategia;
}

function ValidacionesPreOperacion() {
    var padre = $('#btnAgregalo').parents("[data-item]");
    var cantidad = $(padre).find("[data-input='cantidad']").val();


    if ($('#btnAgregalo').hasClass('btn_desactivado_general')) {
        return false;
    }
    if (cantidad == "" || cantidad == 0) {
        AbrirMensaje("La cantidad ingresada debe ser mayor que 0, verifique.");
        return false;
    }

    if (!$.isNumeric(cantidad)) {
        AbrirMensaje("Ingrese un valor numérico.");
        $('#txtCantidad').val(1);
        return false;
    }
    if (parseInt(cantidad) <= 0) {
        AbrirMensaje("La cantidad debe ser mayor a cero.");
        $('#txtCantidad').val(1);
        return false;
    }

    return true;
}

function GenerarCadenaCuvs(objInput) {

    var cuvs = '';
    if ((CodigoVariante == "2001" || CodigoVariante == "2003")) {
        var listaCuvs = $(objInput).parents("[data-item]").find("[data-tono][data-tono-select]");
        if (listaCuvs.length > 0) {
            $.each(listaCuvs, function (i, item) {
                var cuv = $(item).attr("data-tono-select");
                if (cuv != "") {
                    cuvs = cuvs + (cuvs == "" ? "" : "|") + cuv;
                    if (CodigoVariante == "2003") {
                        cuvs = cuvs + ";" + $(item).find("#Estrategia_hd_MarcaID").val();
                        cuvs = cuvs + ";" + $(item).find("#Estrategia_hd_PrecioCatalogo").val();
                    }
                }
            });
        }
    }

    return cuvs;
}

function ObtenerCodigoPedidoWeb(article, posicion) {
    var origen = $(article).find(".origenPedidoWeb").val() || 0;
    if (origen == 0) {
        if (posicion != "0") {
            if (origenPedidoWebCarrusel != -1)
                origen = origenPedidoWebCarrusel;
            else if (tipoOrigenPantalla == 1) {
                origen = showRoomOrigenInsertar == 0 ? origenPedidoWeb : showRoomOrigenInsertar;
            }
            else
                origen = origenPedidoWeb;
        } else {
            origen = origenPedidoWeb;
        }
    }

    return origen;

}

function ValidarUnidadesPermitidas(data, cantidad) {


    if (parseInt(data.Saldo) < parseInt(cantidad)) {
        var Saldo = data.Saldo;
        var UnidadesPermitidas = data.UnidadesPermitidas;

        CerrarLoad();

        if (Saldo == UnidadesPermitidas)
            AbrirMensaje("Lamentablemente, la cantidad solicitada sobrepasa las Unidades Permitidas de Venta (" + UnidadesPermitidas + ") del producto.");
        else {
            if (Saldo == "0")
                AbrirMensaje("Las Unidades Permitidas de Venta son solo (" + UnidadesPermitidas + "), pero Usted ya no puede adicionar más, debido a que ya agregó este producto a su pedido, verifique.");
            else
                AbrirMensaje("Las Unidades Permitidas de Venta son solo (" + UnidadesPermitidas + "), pero Usted solo puede adicionar (" + Saldo + ") más, debido a que ya agregó este producto a su pedido, verifique.");
        }

        return false;
    }
    else
        return true;

}

function EstrategiaValidarSeleccionTonoShowRoom(objInput) {

    if (!$('.tono_select_opt')[0])
        return false;
  
    var attrClass = $.trim($('#btnAgregalo').attr("class"));
    if ((" " + attrClass + " ").indexOf(" btn_desactivado_general ") >= 0) {
        $(objInput).parents("[data-item]").find("[data-tono-select='']").find("[data-tono-showroom-change='1']").parent().addClass("tono_no_seleccionado");
        setTimeout(function () {
            $(objInput).parents("[data-item]").find("[data-tono-showroom-change='1']").parent().removeClass("tono_no_seleccionado");
        }, 500);
        return true;
    }

    return false;
}

/*
 * SECCION DE MARCACIONES DE ANALYTICS PARA REVISTA DIGITAL 
 * 
 */

// Primer Dígito -- Plataforma
// 1: Desktop                   2: Mobile
// Segundo Dígito -- Pantalla
// 1: Home                      2: Pedido
// 3: Liquidacion               4: Catalogo Personalizado
// 5: ShowRoom                  9: General
// 6: OfertaParaTi
// 7: RevistaDigital

// Tercer Dígito -- Sección dentro de la Pantalla
// 1: Banners                   2: Ofertas para ti
// 3: Catalogo Personalizado    4: Liquidacion
// 5: Producto Sugerido         6: Oferta Final
// 7: ShowRoom                  8: Consultora Online
// 9: Oferta del dia            0: Revista Digital
// 1: index
// 2: OfertaParaTi Detalle

// Cuarto Dígito
// 1. Sin popUp                 2. Con popUp

var rdAnalyticsModule = (function () {
    var _event = {
        virtual: "virtualEvent",
        promotionClick: "promotionClick",
        promotionView: "promotionView",
        addToCart: "addToCart",
        productClick: "productClick",
        socialEvent: "socialEvent"
    },
    _origenWeb = {
        home: "1101",
        homeLan: "1103",
        catalogo: "1401",
        pedido: "1201",
        homeMobile: "2101",
        homeLanMobile: "2103",
        catalogoMobile: "2401",
        pedidoMobile: "2201",
        homeVerMobile: "2104",
        homeVerMasMobile: "2105",
        rdLan: "1721",
        rdOferas: "1711",
        rdDetalle: "1731",
        rdLanMobile: "2721",
        rdOferasMobile: "2711",
        rdDetalleMobile: "2731"
    },
    _seccionWeb = {
        home: "Home",
        catalogo: "Catálogos y revistas",
        pedido: "Pedido",
        homeMobile: "Mobile Home",
        catalogoMobile: "Mobile Catálogos y revistas",
        pedidoMobile: "Mobile Pedido",
        enterate: "Enterate",
        confirmarDatos: "ConfirmarDatos"
    },
    _text = {
        noDisponible: "NO DISPONIBLE",
        estandar: "Estándar",
        epm: "Ésika para mí",
        exception: "Exception on analytics RD",
        comprarCampania: "Comprar campaña ",
        verCampania: "Ver campaña ",
        saberMas: "Conoce todo sobre Club Gana+",
        rdBannerPrincipal: "Oferta para ti - RO Banner Principal",
        rdBannerDetPrincipal: "Oferta para ti - RO Detalle Banner Principal",
        rdMisOfertas: "Oferta para ti - RO Mis Ofertas",
        rdDetalleMisOfertas: "Oferta para ti - RO Detalle Mis Ofertas",
        rdDetalleProducto: "Oferta para ti - RO Detalle Producto",
        rdHome: "Ofertas para ti – Home",
        rdAgregarBannerPrincipal: "Agregar producto - Banner Principal",
        rdAgregarBannerDetPrincipal: "Agregar producto - Detalle Banner Principal",
        rdAgregarMisOfertas: "Agregar producto - Mis Ofertas",
        rdAgregarDetalleMisOfertas: "Agregar producto - Detalle Mis Ofertas",
        rdAgregarDetalleProducto: "Agregar producto - Detalle Producto",
        rdAgregarHome: "Agregar producto – Home",
        facebook: "Facebook",
        ro: "Revista Online",
        roInscribirme: "Revista Online - Inscribirme a Ésika para mí",
        banner: "Banner",
        popup: "Home pop-up - 1",
        notAvailable: "(not available)",
        contenedor: "Contenedor",
        enterate: "Click en botón - Entérate aquí",
        cerrarPopup: "Cerrar popup",
        suscribete: "Suscríbete gratis aquí",
        guardarDatos: "Click en botón - Guardar datos",
        siguiente: "Ver siguiente",
        anterior: "Ver anterior"
    },
    _action = {
        clickBanner: "Click banner Ver todas mis ofertas",
        clickTab: "Click tab",
        verLan: "Ver más lanzamientos",
        verMas: "Ver más ofertas",
        verTodas: "Ver todas mis ofertas",
        clickBoton: "Click Botón",
        clickCancelar: "Click Link Cancelar Suscripción",
        cancelarInscripcion: "Cancelar inscripción",
        suscripcionExitosa: "Suscripción Exitosa",
        whatsapp: "Enviar por Whatsapp",
        inicioVideo: "Iniciar video",
        finVideo: "Finalizar video",
        facebook: "Share",
        ordenar: "Ordenar",
        filtrar: "Filtrar por marca",
        borrar: "Borrar Filtros",
        popupEnterate: "Popup Entérate aquí",
        popupSuscripcion: "Popup Suscripción",
        clickFlechas: "Lo nuevo - Click Flechas"
    },
    _tabCode = {
        comprar: "1",
        ver: "2",
        saberMas: "3"
    },
    _socialCode = {
        facebook: "FB",
        whatsapp: "WA",
        youtubeStart: "YTI",
        youtubeEnd: "YTF"
    },
    _filterCode = {
        precio: "precio",
        marca: "marca"
    },
    _category = {
        ganaMas: "Gana Más"
    }

    var _getDirection = function (direction) {
        switch (direction) {
        case 1:
            return _text.siguiente;
        case 2:
            return _text.anterior;
        }
    }
    var _virtualEventPush = function(category, action, label) {
        dataLayer.push({
            "event": _event.virtual,
            "category": category,
            "action": action,
            "label": label
        });
    };

    var _promotionClickPush = function (name, position, creative) {
        dataLayer.push({
            "event": _event.promotionClick,
            "ecommerce": {
                "promoView": {
                    "promotions": [
                        {
                            "id": "1",
                            "name": name.trim(),
                            "position": position,
                            "creative": creative
                        }]
                }
            }
        });
    }

    var _promotionViewPush = function (name, position, creative) {
        dataLayer.push({
            "event": _event.promotionView,
            "ecommerce": {
                "promoView": {
                    "promotions": [
                        {
                            "id": "1",
                            "name": name.trim(),
                            "position": position,
                            "creative": creative
                        }]
                }
            }
        });
    }

    var _addToCartPush = function (list, estrategia) {
        dataLayer.push({
            "event": _event.addToCart,
            "ecommerce": {
                "currencyCode": "PEN",
                "add": {
                    "actionField": { "list": list },
                    "products": [
                        {
                            "name": (estrategia.DescripcionResumen + " " + estrategia.DescripcionCortada).trim(),
                            "price": estrategia.Precio2.toString(),
                            "brand": estrategia.DescripcionMarca,
                            "id": estrategia.CUV2,
                            "category": _text.noDisponible,
                            "variant": (estrategia.DescripcionEstrategia === undefined) ? _text.estandar : estrategia.DescripcionEstrategia,
                            "quantity": parseInt(estrategia.Cantidad)
                        }
                    ]
                }
            }
        });
    }

    var _productClickPush = function (list, estrategia) {
        dataLayer.push({
            "event": _event.productClick,
            "ecommerce": {
                "currencyCode": "PEN",
                "click": {
                    "actionField": { "list": list },
                    "products": [{
                        "name": (estrategia.DescripcionResumen + " " + estrategia.DescripcionCortada).trim(),
                        "id": estrategia.CUV2,
                        "price": estrategia.Precio2.toString(),
                        "brand": estrategia.DescripcionMarca,
                        "category": _text.noDisponible,
                        "variant": (estrategia.DescripcionEstrategia === undefined) ? _text.estandar : estrategia.DescripcionEstrategia,
                        "position": parseInt(estrategia.posicionItem === undefined ? estrategia.Posicion : estrategia.posicionItem)
                    }]
                }
            }
        });
    }

    var _socialEventPush = function (socialNetwork, socialAction, socialUrl) {
        dataLayer.push({
            'event': _event.socialEvent,
            'socialNetwork': socialNetwork,
            'socialAction': socialAction,
            'socialUrl': socialUrl
        });
    }
    
    var _capitalizeFirstLetter = function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function Access(origenWeb) {
        try {
            var origenWebString = origenWeb.toString();
            switch (origenWebString) {
                case _origenWeb.home: //Home
                    _virtualEventPush(_seccionWeb.home, _text.epm, _action.clickBanner);
                    break;
                case _origenWeb.catalogo: //Catalogos
                    _virtualEventPush(_seccionWeb.catalogo, _text.epm, _action.clickBanner);
                    break;
                case _origenWeb.pedido: //Pedido
                    _virtualEventPush(_seccionWeb.pedido, _text.epm, _action.clickBanner);
                    break;
                case _origenWeb.homeLan: //Lanzamiento
                    _virtualEventPush(_seccionWeb.home, _text.epm, _action.verLan);
                    break;
                case _origenWeb.homeLanMobile: //Lanzamiento mobile
                    _virtualEventPush(_seccionWeb.homeMobile, _text.epm, _action.verLan);
                    break;
                case _origenWeb.homeMobile: //Home
                    _virtualEventPush(_seccionWeb.homeMobile, _text.epm, _action.clickBanner);
                    break;
                case _origenWeb.catalogoMobile: //Catalogos
                    _virtualEventPush(_seccionWeb.catalogoMobile, _text.epm, _action.clickBanner);
                    break;
                case _origenWeb.pedidoMobile: //Pedido
                    _virtualEventPush(_seccionWeb.pedidoMobile, _text.epm, _action.clickBanner);
                    break;
                case _origenWeb.homeVerMobile: //Home
                    _virtualEventPush(_seccionWeb.homeMobile, _text.epm, _action.verTodas);
                    break;
                case _origenWeb.homeVerMasMobile: //Home
                    _virtualEventPush(_seccionWeb.homeMobile, _text.epm, _action.verMas);
                    break;
            }
        } catch (e) {
            console.log(_text.exception + e);
        }
    }

    function Tabs(codigo, campaniaId, pantalla) {
        try {
            switch (codigo.toString()) {
                case _tabCode.comprar:
                    _virtualEventPush(_text.contenedor + " - " + pantalla, _action.clickTab, _text.comprarCampania + campaniaId);
                    break;
                case _tabCode.ver:
                    _virtualEventPush(_text.contenedor + " - " + pantalla, _action.clickTab, _text.verCampania + campaniaId);
                    break;
                case _tabCode.saberMas:
                    _virtualEventPush(_text.contenedor + " - " + pantalla, _action.clickTab, _text.saberMas);
                    break;
            }
        } catch (e) {
            console.log(_text.exception + e);
        }
    }

    function FiltrarProducto(tipo, label) {
        try {
            tipo = $.trim(tipo);
            label = $.trim(label);
            switch (tipo) {
                case _filterCode.marca:
                    _virtualEventPush(_text.epm, _action.filtrar, label);
                    break;
                case _filterCode.precio:
                    _virtualEventPush(_text.epm, _action.ordenar, label);
                    break;
                default:
                    _virtualEventPush(_text.epm, _action.borrar, _text.notAvailable);
                    break;
            }
        } catch (e) {
            console.log(_text.exception + e);
        }
    }

    function AgregarProducto(origenWeb, estrategia, popup) {
        if (!popup) {
            popup = false;
        }
        try {
            var origenWebString = origenWeb.toString();
            switch (origenWebString) {
                case _origenWeb.rdLan://Lan desktop
                    if (popup) _addToCartPush(_text.rdBannerDetPrincipal, estrategia);
                    else _addToCartPush(_text.rdBannerPrincipal, estrategia);
                    break;
                case _origenWeb.rdLanMobile://Lan Mobile
                    if (popup) _addToCartPush(_text.rdBannerDetPrincipal, estrategia);
                    else _addToCartPush(_text.rdBannerPrincipal, estrategia);
                    break;
                case _origenWeb.rdOferas: //Mis Ofertas
                    if (!popup) _addToCartPush(_text.rdMisOfertas, estrategia);
                    else _addToCartPush(_text.rdDetalleMisOfertas, estrategia);
                    break;
                case _origenWeb.rdOferasMobile: //Mis Ofertas Mobile
                    if (!popup) _addToCartPush(_text.rdMisOfertas, estrategia);
                    else _addToCartPush(_text.rdDetalleMisOfertas, estrategia);
                    break;
                case _origenWeb.rdDetalle: //Mis Ofertas Mobile
                    _addToCartPush(_text.rdDetalleProducto, estrategia);
                    break;
                case _origenWeb.rdDetalleMobile: //Mis Ofertas Mobile
                    _addToCartPush(_text.rdDetalleProducto, estrategia);
                    break;
                default:
                    _addToCartPush(_text.rdHome, estrategia);
            }
        } catch (e) {
            console.log(_text.exception + e);
        }
    }

    function VerDetalleComprar(origenWeb, estrategia) {
        try {
            var origenWebString = origenWeb.toString();
            switch (origenWebString) {
                case _origenWeb.rdLan:
                    _productClickPush(_text.rdBannerPrincipal, estrategia);
                    break;
                case _origenWeb.rdLanMobile:
                    _productClickPush(_text.rdBannerPrincipal, estrategia);
                    break;
                case _origenWeb.rdOferas:
                    _productClickPush(_text.rdMisOfertas, estrategia);
                    break;
                case _origenWeb.rdOferasMobile:
                    _productClickPush(_text.rdMisOfertas, estrategia);
                    break;
                case _origenWeb.rdDetalle: //Mis Ofertas 
                    _productClickPush(_text.rdDetalleProducto, estrategia);
                    break;
                case _origenWeb.rdDetalleMobile: //Mis Ofertas Mobile
                    _productClickPush(_text.rdDetalleProducto, estrategia);
                    break;
            }
        } catch (e) {
            console.log(_text.exception + e);
        }
    }

    function AgregarProductoDeshabilitado(origenWeb, campania, name, popup) {
        try {
            var category = _text.epm;
            var label = campania + " - " + name;
            var origenWebString = origenWeb.toString();
            switch (origenWebString) {
                case _origenWeb.rdLan:
                    if (popup) _virtualEventPush(category, _text.rdAgregarBannerDetPrincipal, label);
                    else _virtualEventPush(category, _text.rdAgregarBannerPrincipal, label);
                    break;
                case _origenWeb.rdLanMobile:
                    if (popup) _virtualEventPush(category, _text.rdAgregarBannerDetPrincipal, label);
                    else _virtualEventPush(category, _text.rdAgregarBannerPrincipal, label);
                    break;
                case _origenWeb.rdOferas: //Mis Ofertas
                    if (popup) _virtualEventPush(category, _text.rdAgregarDetalleMisOfertas, label);
                    _virtualEventPush(category, _text.rdAgregarMisOfertas, label);
                    break;
                case _origenWeb.rdOferasMobile: //Mis Ofertas Mobile
                    if (popup) _virtualEventPush(category, _text.rdAgregarDetalleMisOfertas, label);
                    _virtualEventPush(category, _text.rdAgregarMisOfertas, label);
                    break;
                case _origenWeb.rdDetalle: //Mis Ofertas Mobile
                    _virtualEventPush(category, _text.rdAgregarDetalleProducto, label);
                    break;
                case _origenWeb.rdDetalleMobile: //Mis Ofertas Mobile
                    _virtualEventPush(category, _text.rdAgregarDetalleProducto, label);
                    break;
            }
        } catch (e) {
            console.log(_text.exception + e);
        }
    }

    function VerDetalleBloqueada(campania, name) {
        try {
            var label = campania + " - " + name;
            _virtualEventPush(_text.epm, "Ver producto", label);
        } catch (e) {
            console.log(_text.exception + e);
        }
    }

    function VerDetalleLan(estrategia) {
        try {
            _productClickPush(_text.rdDetalleMisOfertas, estrategia);
        } catch (e) {
            console.log(_text.exception + e);
        }
    }

    function CompartirProducto(tipo, url, name) {
        try {
            var label = url;
            if(name !== "")
                label = name + " - " + url;
            tipo = tipo.toString();
            switch (tipo) {
                case _socialCode.facebook:
                    _socialEventPush(_text.facebook, _action.facebook, url);
                    break;
                case _socialCode.whatsapp:
                    _virtualEventPush(_category.ganaMas, _action.whatsapp, label);
                    break;
                case _socialCode.youtubeStart:
                    _virtualEventPush(_category.ganaMas, _action.inicioVideo, label);
                    break;
                case _socialCode.youtubeEnd:
                    _virtualEventPush(_category.ganaMas, _action.finVideo, label);
                    break;
            }
        } catch (e) {
            console.log(_text.exception + e);
        }
    }

    function SuscripcionExistosa() {
        _virtualEventPush(_category.ganaMas, _action.suscripcionExitosa, _text.notAvailable);
    }

    function MostrarPopup() {
        _promotionViewPush(_text.roInscribirme, _text.popup, _text.banner);
    }

    function Inscripcion() {
        _virtualEventPush(_category.ganaMas, _action.clickBoton, _text.suscribete);

    }

    function CerrarPopUp(tipo) {
        try {
            var action = "";
            switch (tipo) {
                case _seccionWeb.enterate:
                    action = _action.popupEnterate;
                    break;
                case _seccionWeb.confirmarDatos:
                    action = _action.popupSuscripcion;
                    break;
            }
            _virtualEventPush(_category.ganaMas, action, _text.cerrarPopup);
        } catch (e) {
            console.log(_text.exception + e);
        }
    }
    
    function GuardarDatos() {
        _virtualEventPush(_category.ganaMas, _action.popupSuscripcion, _text.guardarDatos);
    }

    function IrCancelarSuscripcion() {
        _virtualEventPush(_text.ro, _action.clickCancelar, _text.banner);
    }

    function CancelarSuscripcion() {
        _virtualEventPush(_text.epm, _action.cancelarInscripcion, _text.notAvailable);
    }

    function ContendorSection(titulo) {
        _virtualEventPush(_text.contenedor + " - Home", _capitalizeFirstLetter(titulo.toLowerCase()) + " - Click Botón", _action.verMas);
    }
    
    function IrEnterate() {
        _virtualEventPush(_category.ganaMas, _action.popupEnterate, _text.enterate);
    }
    function ClickArrowLan(direction) {
        _virtualEventPush(_text.contenedor + " - Home", _action.clickFlechas, _getDirection(direction));
    }
    
    return { //rdAnalyticsModule
        CancelarSuscripcion: CancelarSuscripcion,
        IrCancelarSuscripcion: IrCancelarSuscripcion,
        CerrarPopUp: CerrarPopUp,
        SuscripcionExistosa: SuscripcionExistosa,
        Inscripcion: Inscripcion,
        MostrarPopup: MostrarPopup,
        CompartirProducto: CompartirProducto,
        VerDetalleLan: VerDetalleLan,
        VerDetalleBloqueada: VerDetalleBloqueada,
        AgregarProductoDeshabilitado: AgregarProductoDeshabilitado,
        VerDetalleComprar: VerDetalleComprar,
        AgregarProducto: AgregarProducto,
        FiltrarProducto: FiltrarProducto,
        Tabs: Tabs,
        Access: Access,
        ContendorSection: ContendorSection,
        IrEnterate: IrEnterate,
        GuardarDatos: GuardarDatos,
        ClickArrowLan: ClickArrowLan
        
    };
})();


var pagina = "";

function TagManagerCarruselInicio(arrayItems) {
    arrayItems = arrayItems || new Array();
    pagina = isHome() ? "Home" : "Pedido";
    var cantidadRecomendados = $('#divListadoEstrategia').find(".slick-active").length;
    var arrayEstrategia = [];
    for (var i = 0; i < cantidadRecomendados; i++) {
        var recomendado = arrayItems[i];
        var impresionRecomendado = {
            'name': recomendado.DescripcionCompleta,
            'id': recomendado.CUV2,
            'price': $.trim(recomendado.Precio2),
            'brand': recomendado.DescripcionMarca,
            'category': 'NO DISPONIBLE',
            'variant': recomendado.DescripcionEstrategia,
            'list': 'Ofertas para ti – ' + pagina,
            'position': recomendado.Posicion
        };

        arrayEstrategia.push(impresionRecomendado);
    }
    var add = false;

    if (arrayEstrategia.length > 0) {
        add = true;
        if (!isMobile()) {
            add = false;
            var sentListEstrategia = false;
            if (typeof (Storage) !== 'undefined') {
                var nunX = isHome() ? "1" : "2";
                var sle = localStorage.getItem('sentListEstrategia' + nunX);
                if (sle !== null && sle === '1') {
                    sentListEstrategia = true;
                }
                else {
                    localStorage.setItem('sentListEstrategia' + nunX, '1');
                }
            }

            if (!sentListEstrategia) {
                add = true;
            }
        }
    }

    if (add) {
        dataLayer.push({
            'event': 'productImpression',
            'ecommerce': {
                'impressions': arrayEstrategia
            }
        });
    }
}

function TagManagerClickAgregarProducto() {
    pagina = isHome() ? "Home" : "Pedido";
    dataLayer.push({
        'event': 'addToCart',
        'ecommerce': {
            'add': {
                'actionField': { 'list': 'Ofertas para ti – ' + pagina },
                'products': [
                    {
                        'name': $("#txtCantidadZE").attr("est-descripcion"),
                        'price': $("#txtCantidadZE").attr("est-precio2"),
                        'brand': $("#txtCantidadZE").attr("est-descripcionMarca"),
                        'id': $("#txtCantidadZE").attr("est-cuv2"),
                        'category': 'NO DISPONIBLE',
                        'variant': $("#txtCantidadZE").attr("est-descripcionEstrategia") == "" ? 'Estándar' : $("#txtCantidadZE").attr("est-descripcionEstrategia"),
                        'quantity': parseInt($("#txtCantidadZE").val()),
                        'position': parseInt($("#txtCantidadZE").attr("est-posicion"))
                    }
                ]
            }
        }
    });
}

function TagManagerClickAgregarProductoOfertaParaTI(item) {
    dataLayer.push({
        'event': 'addToCart',
        'ecommerce': {
            'add': {
                'actionField': { 'list': 'Ofertas para ti – Home' },
                'products': [
                    {
                        'name': (item.DescripcionResumen + " " + item.DescripcionCortada).trim(),
                        'price': item.Precio2.toString(),
                        'brand': item.DescripcionMarca,
                        'id': item.CUV2,
                        'category': 'NO DISPONIBLE',
                        'variant': (item.DescripcionEstrategia === undefined) ? "Estándar" : item.DescripcionEstrategia,
                        'quantity': parseInt(item.Cantidad),
                        'position': parseInt(item.posicionItem)

                    }
                ]
            }
        }
    });
}

function TagManagerCarruselPrevia() {
    pagina = isHome() ? "Home" : "Pedido";
    var posicionPrimerActivo = $($('#divListadoEstrategia').find(".slick-active")[0]).find('.PosicionEstrategia').val();
    var posicionEstrategia = posicionPrimerActivo == 1 ? arrayOfertasParaTi.length - 1 : posicionPrimerActivo - 2;
    var recomendado = arrayOfertasParaTi[posicionEstrategia];
    var arrayEstrategia = new Array();

    var impresionRecomendado = {
        'name': recomendado.DescripcionCompleta,
        'id': recomendado.CUV2,
        'price': $.trim(recomendado.Precio2),
        'brand': recomendado.DescripcionMarca,
        'category': 'NO DISPONIBLE',
        'variant': recomendado.DescripcionEstrategia,
        'list': 'Ofertas para ti – ' + pagina,
        'position': recomendado.Posicion
    };

    arrayEstrategia.push(impresionRecomendado);

    dataLayer.push({
        'event': 'productImpression',
        'ecommerce': {
            'impressions': arrayEstrategia
        }
    });
    dataLayer.push({
        'event': 'virtualEvent',
        'category': pagina,
        'action': 'Ofertas para ti',
        'label': 'Ver anterior'
    });

}

function TagManagerCarruselSiguiente() {
    var posicionUltimoActivo = $($('#divListadoEstrategia').find(".slick-active").slice(-1)[0]).find('.PosicionEstrategia').val();
    var posicionEstrategia = arrayOfertasParaTi.length == posicionUltimoActivo ? 0 : posicionUltimoActivo;
    var recomendado = arrayOfertasParaTi[posicionEstrategia];
    var arrayEstrategia = new Array();
    pagina = isHome() ? "Home" : "Pedido";
    var impresionRecomendado = {
        'name': recomendado.DescripcionCompleta,
        'id': recomendado.CUV2,
        'price': $.trim(recomendado.Precio2),
        'brand': recomendado.DescripcionMarca,
        'category': 'NO DISPONIBLE',
        'variant': recomendado.DescripcionEstrategia,
        'list': 'Ofertas para ti – ' + pagina,
        'position': recomendado.Posicion
    };

    arrayEstrategia.push(impresionRecomendado);

    dataLayer.push({
        'event': 'productImpression',
        'ecommerce': {
            'impressions': arrayEstrategia
        }
    });
    dataLayer.push({
        'event': 'virtualEvent',
        'category': pagina,
        'action': 'Ofertas para ti',
        'label': 'Ver siguiente'
    });

}

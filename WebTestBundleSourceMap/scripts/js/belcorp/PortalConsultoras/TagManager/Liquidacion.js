
var pagina = "";

function TagManagerCarruselLiquidacionesInicio(arrayItems) {
    var cantidadRecomendados = $('#divCarruselLiquidaciones').find(".slick-active").length;

    var arrayEstrategia = [];
    for (var i = 0; i < cantidadRecomendados; i++) {
        var recomendado = arrayItems[i];
        var impresionRecomendado = {
            'name': recomendado.DescripcionCompleta,
            'id': recomendado.CUV,
            'price': recomendado.PrecioOferta.toString(),
            'brand': recomendado.DescripcionMarca,
            'category': 'NO DISPONIBLE',
            'variant': recomendado.DescripcionEstrategia,
            'list': 'Liquidación Web – Home',
            'position': recomendado.Posicion
        };

        arrayEstrategia.push(impresionRecomendado);
    }

    if (arrayEstrategia.length > 0) {
        dataLayer.push({
            'event': 'productImpression',
            'ecommerce': {
                'impressions': arrayEstrategia
            }
        });
    }
}

function TagManagerClickAgregarProductoLiquidacion(item) {
    dataLayer.push({
        'event': 'addToCart',
        'ecommerce': {
            'add': {
                'actionField': { 'list': 'Liquidación Web – Home' },
                'products': [
                    {
                        'name': item.descripcionProd,
                        'price': item.PrecioUnidad,
                        'brand': item.descripcionMarca,
                        'id': item.CUV,
                        'category': 'NO DISPONIBLE',
                        'variant': item.descripcionEstrategia,
                        'quantity': parseInt(item.Cantidad),
                        'position': parseInt(item.Posicion)
                    }
                ]
            }
        }
    });
}
function TagManagerCarruselLiquidacionesPrevia() {
    var posicionEstrategia = $($('#divCarruselLiquidaciones').find(".slick-active")).find('#Posicion').val() - 2;
    var recomendado = arrayLiquidaciones[posicionEstrategia];
    var arrayEstrategia = new Array();

    if (recomendado.PrecioOferta != null || recomendado.PrecioOferta != undefined) {
        var impresionRecomendado = {
            'name': recomendado.DescripcionCompleta,
            'id': recomendado.CUV,
            'price': recomendado.PrecioOferta.toString(),
            'brand': recomendado.DescripcionMarca,
            'category': 'NO DISPONIBLE',
            'variant': recomendado.DescripcionEstrategia,
            'list': 'Liquidacion Web – Home',
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
            'category': 'Home',
            'action': 'Liquidacion Web',
            'label': 'Ver anterior'
        });
    }   
}
function TagManagerCarruselLiquidacionesSiguiente() {
    var posicionEstrategia = $($('#divCarruselLiquidaciones').find(".slick-active")).find('#Posicion').val();

    if (posicionEstrategia != arrayLiquidaciones.length) {
        var recomendado = arrayLiquidaciones[posicionEstrategia];
        var arrayEstrategia = new Array();

        if (recomendado.PrecioOferta != null || recomendado.PrecioOferta != undefined) {
            var impresionRecomendado = {
                'name': recomendado.DescripcionCompleta,
                'id': recomendado.CUV,
                'price': recomendado.PrecioOferta.toString(),
                'brand': recomendado.DescripcionMarca,
                'category': 'NO DISPONIBLE',
                'variant': recomendado.DescripcionEstrategia,
                'list': 'Liquidacion Web – Home',
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
                'category': 'Home',
                'action': 'Liquidacion Web',
                'label': 'Ver siguiente'
            });
        }        
    } else {
        dataLayer.push({
            'event': 'virtualEvent',
            'category': 'Home',
            'action': 'Liquidacion Web',
            'label': 'Ver más'
        });
    }
}
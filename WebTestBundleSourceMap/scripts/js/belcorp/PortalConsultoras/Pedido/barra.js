var listaEscalaDescuento = listaEscalaDescuento || new Array();
var listaMensajeMeta = listaMensajeMeta || new Array();
var dataBarra = dataBarra || new Object();
var belcorp = belcorp || {};
belcorp.barra = belcorp.barra || {};
belcorp.barra.settings = belcorp.barra.settings || {};
belcorp.barra.settings = {
    isMobile: isMobile()
}

function GetWidthTotalBase() {
    return $("[data-barra-width]").outerWidth();
}

function MostrarBarra(datax, destino) {
    $("#divBarra").hide();
    destino = destino || "2"; // 1: bienvenido  2: pedido
    $("#divBarra #divLimite").html("");
    datax = datax || new Object();
    var data = datax.dataBarra || datax.DataBarra || dataBarra || new Object();
    dataBarra = data;

    ActualizarGanancia(dataBarra);

    dataBarra.ListaEscalaDescuento = dataBarra.ListaEscalaDescuento || new Array();
    if (dataBarra.ListaEscalaDescuento.length > 0) {
        listaEscalaDescuento = dataBarra.ListaEscalaDescuento;
        if (dataBarra.redondeo == undefined) {
            $.each(listaEscalaDescuento, function (i, item) {
                if (IsDecimalExist(item.MontoHasta)) {
                    listaEscalaDescuento[i].MontoHasta = Math.ceil(item.MontoHasta)
                } else {
                    listaEscalaDescuento[i].MontoHasta = Math.ceil(item.MontoHasta) + 1;
                }
                listaEscalaDescuento[i].MontoHastaStr = DecimalToStringFormat(listaEscalaDescuento[i].MontoHasta, true);
            });
            dataBarra.redondeo = true;
        }
    }

    dataBarra.ListaMensajeMeta = dataBarra.ListaMensajeMeta || new Array();
    if (dataBarra.ListaMensajeMeta.length > 0) {
        listaMensajeMeta = dataBarra.ListaMensajeMeta;
    }

    dataBarra.MontoMinimo = Math.ceil(dataBarra.MontoMinimo);
    dataBarra.MontoMinimoStr = DecimalToStringFormat(dataBarra.MontoMinimo, true);
    dataBarra.MontoMaximo = Math.ceil(dataBarra.MontoMaximo);
    dataBarra.MontoMaximoStr = DecimalToStringFormat(dataBarra.MontoMaximo, true);
    dataBarra.TippingPoint = Math.ceil(dataBarra.TippingPoint);
    dataBarra.TippingPointStr = DecimalToStringFormat(dataBarra.TippingPoint, true);

    var me = data.MontoEscala;
    var md = data.MontoDescuento;
    var mx = data.MontoMaximo;
    var mn = data.MontoMinimo;
    var tp = data.TippingPoint;
    var mt = data.TotalPedido;
    
    var listaLimite = new Array();

    var widthTotal = GetWidthTotalBase();
    if (widthTotal <= 0)
        return false;

    var wPrimer = 0;
    var vLogro = 0;
    var wMsgFin = 0;
    var wmin = 45;

    if (!(mn == "0,00" || mn == "0.00" || mn == "0")) {
        wPrimer = wmin;
    }
    var textoPunto = '<div style="font-weight: bold;">{titulo}</div><div style="font-size: 11px;">{detalle}</div>';
    if (mx > 0 && destino == '2') {
        vLogro = mt - md;

        listaLimite.push({
            nombre: textoPunto.replace("{titulo}", "M. mínimo").replace("{detalle}", vbSimbolo + " " + data.MontoMinimoStr),
            tipoMensaje: 'MontoMinimo',
            width: wPrimer,
            valor: data.MontoMinimo,
            valorStr: data.MontoMinimoStr
        });

        if (tp > 0) {
            listaLimite.push({
                nombre: "",
                tipoMensaje: 'TippingPoint',
                valor: data.TippingPoint,
                valorStr: data.TippingPointStr
            });
        }
        
        listaLimite.push({
            nombre: textoPunto.replace("{titulo}", "L. crédito").replace("{detalle}", vbSimbolo + " " + data.MontoMaximoStr),
            tipoMensaje: 'MontoMaximo',
            widthR: wmin,
            valor: data.MontoMaximo,
            valorStr: data.MontoMaximoStr
        });
    }
    else {
        if ((mt - md) < mn)
            vLogro = mt - md;
        else
            vLogro = me < mn ? mn : me;

        listaLimite = new Array();
        listaEscalaDescuento = listaEscalaDescuento || new Array();
        var listaEscala = new Array();
        var indDesde = -1;
        $.each(listaEscalaDescuento, function (ind, monto) {
            if (mx > 0 && destino == "1") {
                var desde = indDesde == -1 ? mx : listaEscalaDescuento[indDesde].MontoHasta
                if (mn < monto.MontoHasta && mx >= desde) {
                    monto.MontoDesde = indDesde == -1 ? mn : listaEscalaDescuento[indDesde].MontoHasta;
                    monto.MontoDesdeStr = indDesde == -1 ? data.MontoMinimoStr : listaEscalaDescuento[indDesde].MontoHastaStr;
                    listaEscala.push(monto);
                    indDesde = ind;
                }
            }
            else if (mn < monto.MontoHasta) {
                monto.MontoDesde = indDesde == -1 ? mn : listaEscalaDescuento[indDesde].MontoHasta;
                monto.MontoDesdeStr = indDesde == -1 ? data.MontoMinimoStr : listaEscalaDescuento[indDesde].MontoHastaStr;
                listaEscala.push(monto);
                indDesde = ind;
            }
        });

        if (mx > 0 && destino == "1" && listaEscala.length > 0) {
            listaEscala[listaEscala.length - 1].MontoHasta = mx;
            listaEscala[listaEscala.length - 1].MontoHastaStr = data.MontoMaximoStr;
        }

        var textoPunto2 = '<div style="font-weight: bold;">{titulo}</div><div style="font-size: 11px;">{detalle}</div>';
        var textoApp = '<div>{titulo}</div><div>{detalle}</div>';
        $.each(listaEscala, function (ind, monto) {
            var montox = ind == 0 ? monto : listaEscala[ind - 1];
            listaLimite.push({
                nombre: textoPunto
                    .replace("{titulo}", monto.PorDescuento + "% DSCTO")
                    .replace("{detalle}", (ind == 0 ? "M. mínimo: " : "") + vbSimbolo + " " + (ind == 0 ? data.MontoMinimoStr : montox.MontoHastaStr)),
                nombre2: textoPunto2.replace("{titulo}", monto.PorDescuento + "% {DSCTO}"),
                nombreApp: textoApp
                    .replace("{titulo}", "<span>" + monto.PorDescuento + "</span>" + "% DSCTO")
                    .replace("{detalle}", vbSimbolo + " " + (ind === 0 ? data.MontoMinimoStr : montox.MontoHastaStr)),
                width: ind == 0 ? wPrimer : null,
                widthR: ind == listaEscala.length - 1 ? wmin : null,
                tipoMensaje: 'EscalaDescuento',
                valPor: monto.PorDescuento,
                valor: ind == 0 ? data.MontoMinimo : montox.MontoHasta,
                valorStr: ind == 0 ? data.MontoMinimoStr : montox.MontoHastaStr,
                tipo: ind == 0 ? 'min' : ind == listaEscala.length - 1 ? 'max' : 'int',
                MontoDesde: monto.MontoDesde,
                MontoDesdeStr: monto.MontoDesdeStr,
                MontoHasta: monto.MontoHasta,
                MontoHastaStr: monto.MontoHastaStr
            });
        });

        if (listaLimite.length == 0 && mn > 0 && destino == '2') {
            listaLimite.push({
                nombre: textoPunto.replace("{titulo}", "M. mínimo").replace("{detalle}", vbSimbolo + " " + data.MontoMinimoStr),
                tipoMensaje: 'MontoMinimo',
                width: wPrimer,
                valor: data.MontoMinimo,
                valorStr: data.MontoMinimoStr,
                MontoDesde: 0,
                MontoDesdeStr: DecimalToStringFormat(0, true),
                MontoHasta: data.MontoMinimo,
                MontoHastaStr: data.MontoMinimoStr
            });
        }
    }

    listaLimite = listaLimite || new Array();
    if (listaLimite.length == 0)
        return false;

    var indPuntoLimite = 0;

    listaLimite = listaLimite || new Array();
    $.each(listaLimite, function (ind, limite) {
        if (ind > 0) {
            var valBack = listaLimite[ind - 1].valor;
            if (valBack < vLogro && vLogro < limite.valor) {
                indPuntoLimite = ind;
            }
            else if (vLogro >= limite.valor) {
                indPuntoLimite = ind;
            }
            else if (valBack == vLogro && vLogro > 0) {
                indPuntoLimite = ind;
            }
        }
    });

    var wTotal = widthTotal;
    var vLimite = listaLimite[indPuntoLimite].valor;

    $("#divBarra").show();
    if (!belcorp.barra.settings.isMobile) {
        $("#divBarra #divBarraPosicion").css("width", wTotal);
        $("#divBarra").css("width", wTotal);
    }

    var styleMin = 'style="margin-left: 6px;"';
    var htmlPunto = '<div id="punto_{punto}" data-punto="{select}">'
                + '<div class="monto_minimo_barra" style="width:{wText}px">'
                    + '<div style="width:{wText}px;position: absolute;" data-texto>{texto}</div>'
                    + '<div class="linea_indicador_barra" {style}></div>'
                + '</div>'
            + '</div>';
    var htmlTippintPoint = '<div id="punto_{punto}" data-punto="{select}">'
                + '<div class="monto_minimo_barra">'
                    + '<div style="width:{wText}px;position: absolute;" data-texto><div class="tippingPoint {estado}"></div></div>'
                    + '<div class="linea_indicador_barra"></div>'
                + '</div>'
            + '</div>';
    var htmlPuntoLimite = '<div id="punto_{punto}" data-punto="{select}">'
                + '<div class="monto_minimo_barra">'
                    + '<div class="bandera_marcador" style="margin-top: -6px;"></div>'
                    + '<div style="margin-left: {marl}px;width: {wText}px;position: absolute;" data-texto>{texto}</div>'
                + '</div>'
            + '</div>';

    if (mx > 0 || destino == '1')
        htmlPuntoLimite = htmlPunto;

    var wTotalPunto = 0;
    $("#divBarra #divBarraLimite").html("");

    $.each(listaLimite, function (ind, limite) {
        var htmlSet = indPuntoLimite == ind && ind > 0 ? vLogro < vLimite ? htmlPuntoLimite : htmlPunto : htmlPunto;
        htmlSet = ind == 1 && indPuntoLimite == 0 && mn == 0 ? htmlPuntoLimite : htmlSet;
        htmlSet = limite.tipoMensaje == 'TippingPoint' ? htmlTippintPoint : htmlSet;

        var selectPunto = "0";
        var wText = ind == 0 ? "130" : "90";
        if (destino == '1') {
            if (vLogro < vLimite) {
                wText = indPuntoLimite - 1 != ind || indPuntoLimite == 0 ? "55" : "130";
                selectPunto = indPuntoLimite - 1 != ind || indPuntoLimite == 0 ? "0" : "1";
            }
            else {
                wText = indPuntoLimite != ind || indPuntoLimite == 0 ? "55" : "130";
                selectPunto = indPuntoLimite != ind || indPuntoLimite == 0 ? "0" : "1";
            }

        }
        var marl = indPuntoLimite == listaLimite.length - 1 ? "-80" : "21";
        if (destino == '1' && indPuntoLimite == 0) {
            wText = wTotal / listaLimite.length
            marl = "0";
        }
        var activo = limite.tipoMensaje == 'TippingPoint' && indPuntoLimite == 1 ? "activo" : "";
        var styleMinx = mn == 0 && ind == 0 ? styleMin : "";
        var nombrePunto = limite.nombre;
        if (destino == '1') {
            if (selectPunto == "0" && indPuntoLimite == 0 && mn == 0) {
                styleMinx = "";
            }
            var txtDscto = "";
            var txtDetalle = "";
            if (vLogro <= vLimite) {
                if (indPuntoLimite == 0) {
                    txtDscto = "";
                    txtDetalle = "DSCTO";
                }
                else {
                    txtDscto = "DSCTO";
                    txtDetalle = indPuntoLimite - 1 != ind ? "" :
                    (vbSimbolo + "" + limite.MontoDesdeStr + " a " + vbSimbolo + "" + limite.MontoHastaStr);
                }
            }
            else {
                txtDscto = "DSCTO";
                txtDetalle = indPuntoLimite != ind ? "" :
                (vbSimbolo + "" + limite.MontoDesdeStr + " a más");
                if (mx > 0 && destino == "1") {
                    txtDetalle = indPuntoLimite != ind ? "" :
                    (vbSimbolo + "" + limite.MontoDesdeStr + " a " + vbSimbolo + "" + limite.MontoHastaStr);
                }
            }

            nombrePunto = limite.nombre2
            .replace("{DSCTO}", txtDscto)
            .replace("{detalle}", txtDetalle);
        }

        htmlSet = htmlSet
            .ReplaceAll("{punto}", ind)
            .ReplaceAll("{texto}", nombrePunto)
            .ReplaceAll("{wText}", wText)
            .ReplaceAll("{marl}", marl)
            .ReplaceAll("{estado}", activo)
            .ReplaceAll("{style}", styleMinx)
            .ReplaceAll("{select}", selectPunto);

        var objH = $(htmlSet).css("float", 'left');
        $("#divBarra #divBarraLimite").append(objH);

        var wPunto = wText;
        if (!(destino == '1' && indPuntoLimite == 0)) {
            wPunto = $("#punto_" + ind + " [data-texto]").width();
            wPunto += $("#punto_" + ind + " .bandera_marcador").width() || 0;

            if (indPuntoLimite == listaLimite.length - 1 && indPuntoLimite == ind) {
                if (destino == '2' && vLogro < vLimite && mx <= 0) {
                    wPunto = wmin;
                }

                $("#punto_" + ind).css("width", wPunto);
                if (ind == 0 && mn == 0) {
                    $("#punto_" + ind + " .linea_indicador_barra").css("margin-left", "0px;");
                }
            }
        }
        wTotalPunto += wPunto;

    });
    $("#divBarra #divBarraLimite").append("<div class='clear'></div>");

    if (destino == '1') {
        $("#divBarraLimite [data-punto='0']").find("[data-texto]").css("color", "#979797");
        $("#divBarraLimite [data-punto='1']").find("[data-texto]").css("color", "#000000");
        $("#divBarraLimite [data-punto='1']").find("[data-texto]").css("font-weight", "bold");
    }

    if (wTotalPunto > wTotal) {
        var indAux = indPuntoLimite;
        while (indAux > 1) {
            if (indAux - 1 < indPuntoLimite - 1) {
                var wwx = $("#punto_" + (indAux - 1) + " [data-texto]").width();
                wTotalPunto -= wwx;
                $("#punto_" + (indAux - 1)).remove();
                listaLimite.splice(indAux - 1, 1);
                if (wTotalPunto < wTotal) {
                    indAux = 0;
                }
            }
            indAux--;
        }
        if (wTotalPunto > wTotal) {
            indAux = listaLimite.length;
            while (indAux > indPuntoLimite + 1) {
                var wwx = $("#punto_" + (indAux) + " [data-texto]").width();
                wTotalPunto -= wwx;
                $("#punto_" + indAux).remove();
                listaLimite.splice(indAux, 1);
                indAux--;
                if (wTotalPunto < wTotal) {
                    indAux = 0;
                }
            }
        }
    }

    var wAreaMover = widthTotal - wTotalPunto;
    if (destino == "1" && indPuntoLimite == 0) {
        wAreaMover = 0;
    }
    if (indPuntoLimite > 0) {
        if (vLogro >= vLimite) {
            $("#punto_" + (indPuntoLimite)).css("margin-right", wAreaMover);
        }
        else {
            $("#punto_" + (indPuntoLimite - 1)).css("margin-right", wAreaMover);
        }
    }
    else {
        if (mn > 0) {
            $("#punto_" + indPuntoLimite).css("margin-left", wAreaMover);
        }
        else {
            $("#punto_" + indPuntoLimite).css("margin-right", wAreaMover);
        }
    }

    var wPuntosAnterior = 0;
    indAux = indPuntoLimite;
    while (indAux > 0) {
        if (indAux == 1 && mn == 0 && indPuntoLimite == 1) {
            wPuntosAnterior += 0;
        }
        else {
            wPuntosAnterior += $("#punto_" + (indAux - 1)).width();
        }
        indAux--;
    }
    if (mn > 0) {
        if (vLogro >= vLimite) {
            if (indPuntoLimite > 0) {
                wPuntosAnterior += $("#punto_" + indPuntoLimite).width();
            }
        }
    }
    else {
        if (indPuntoLimite == 1) {
            wPuntosAnterior += $("#punto_" + (indPuntoLimite - 1)).width();
        }
    }

    var wLimite = wAreaMover + wPuntosAnterior;
    var wLimiteAnterior = wPuntosAnterior;
    if (indPuntoLimite > 0) {
        if (vLogro >= vLimite) {
            wLimite = widthTotal;
            wLimiteAnterior -= parseInt($("#punto_" + (indPuntoLimite) + " >  div").width() / 2, 10);
        }
        else {
            wLimiteAnterior -= wLimiteAnterior <= 0 ? 0 : $("#punto_" + (indPuntoLimite - 1)).width() - parseInt($("#punto_" + (indPuntoLimite - 1) + " >  div").width() / 2, 10);
            if ($("#punto_" + indPuntoLimite).find(".bandera_marcador").length == 0) {
                wLimite += parseInt($("#punto_" + (indPuntoLimite) + " >  div").width() / 2, 10);
            }
        }
    }
    else {
        var indxx = indPuntoLimite == 0 && mn == 0 ? (indPuntoLimite + 1) : indPuntoLimite;
        if ($("#punto_" + indxx).find(".bandera_marcador").length == 0) {
            wLimite += parseInt($("#punto_" + (indxx) + " >  div").width() / 2, 10);
        }
        if (indPuntoLimite == 0 && mn == 0) {
            wLimite += parseInt($("#punto_" + (0)).width(), 10);
        }
    }
    wLimiteAnterior = wLimiteAnterior < 0 ? 0 : wLimiteAnterior;
    wAreaMover = wLimite - wLimiteAnterior;

    listaLimite = listaLimite || new Array();
    $.each(listaLimite, function (ind, limite) {
        if (ind > 0) {
            var valBack = listaLimite[ind - 1].valor;
            if (valBack < vLogro && vLogro < limite.valor) {
                indPuntoLimite = ind;
            }
            else if (vLogro >= limite.valor) {
                indPuntoLimite = ind;
            }
            else if (valBack == vLogro && vLogro > 0) {
                indPuntoLimite = ind;
            }
        }
    });

    var vLimiteAnterior = indPuntoLimite > 0 ? listaLimite[indPuntoLimite - 1].valor : 0;
    var vMover = vLogro - vLimiteAnterior;
    var vDiferencia = listaLimite[indPuntoLimite].valor - vLimiteAnterior;
    var wLogro = wLimiteAnterior;
    wLogro += vDiferencia > 0 ? (vMover * wAreaMover) / vDiferencia : 0;

    if (wLimite == widthTotal) {
        if (vLogro > vLimite) {
            wLogro = widthTotal - 20;
        }
        else if (vLogro == vLimite) {
            wLogro = wLimiteAnterior;
        }
    }

    if (destino == "1") {
        if (indPuntoLimite <= 0 && mn > 0) {
            wLimite = 0;
            wLogro = 0;
        }
    }

    if (listaLimite.length == 1) {
        if (vLogro > vLimite) {
            wLimite = widthTotal;
            wLogro = widthTotal - 20;
        }
    }

    $("#divBarra #divBarraEspacioLimite").css("width", wLimite);
    $("#divBarra #divBarraEspacioLogrado").css("width", wLogro);

    if (destino == "1") {
        return true;
    }

    if (mn == 0 && vLogro == 0 && !belcorp.barra.settings.isMobile) {
        $("#divBarra #divBarraMensajeLogrado").hide();
        return false;
    }
    var tipoMensaje = listaLimite[indPuntoLimite].tipoMensaje;
    tipoMensaje += vLogro >= vLimite ? "Supero" : "";
    if (vLogro < mn) {
        tipoMensaje = "MontoMinimo";
    }

    listaMensajeMeta = listaMensajeMeta || new Array();
    var objMsg = listaMensajeMeta.Find("TipoMensaje", tipoMensaje)[0] || new Object();
    objMsg.Titulo = $.trim(objMsg.Titulo);
    objMsg.Mensaje = $.trim(objMsg.Mensaje);
    if (objMsg.Titulo == "" && objMsg.Mensaje == "") {
        $("#divBarra #divBarraMensajeLogrado").hide();
        return false;
    }
    var valPor = listaLimite[indPuntoLimite].valPor || "";
    var valorMonto = vbSimbolo + " " + DecimalToStringFormat(parseFloat(vLimite - vLogro));
    var valorMontoEsacalaDescuento = vbSimbolo + " " + DecimalToStringFormat(parseFloat(listaLimite[indPuntoLimite].valor - me));
    $("#divBarra #divBarraMensajeLogrado").show();
    $("#divBarra #divBarraMensajeLogrado .mensaje_barra").html(objMsg.Titulo.replace("#porcentaje", valPor).replace("#valor", valorMonto));
    $("#divBarra #divBarraMensajeLogrado .agrega_barra").html(objMsg.Mensaje.replace("#porcentaje", valPor).replace("#valor", (mt < mn ? valorMonto : valorMontoEsacalaDescuento)));
    if (belcorp.barra.settings.isMobile) {
        $("#divBarra #divBarraMensajeLogrado .descuento_pedido").html(listaLimite[indPuntoLimite].nombreApp || listaLimite[indPuntoLimite].nombre);
    }

    $("#divBarraMensajeLogrado").css("width", "");
    var wMsgTexto = $("#divBarra #divBarraMensajeLogrado > div").width() + 1;
    wMsgTexto = wLogro + wMsgTexto >= wTotal ? wTotal : (wLogro + wMsgTexto);
    if (!belcorp.barra.settings.isMobile) {
        $("#divBarra #divBarraMensajeLogrado").css("width", wMsgTexto);
    }

    return true;
}


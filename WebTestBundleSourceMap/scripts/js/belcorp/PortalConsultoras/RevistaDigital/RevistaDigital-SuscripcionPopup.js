var rdPopup = (function () {
    "use strict";

    var _elements = {
        PopupSuscripcion: "PopRDSuscripcion",
        PopupSuscripcionId: "#PopRDSuscripcion",
        PopupSuscripcionTemplate: "#RDPopup-template"
    }

    var _url = {
        urlPopupDatos: baseUrl + "RevistaDigital/PopupDatos",
        urlPopupCerrar: baseUrl + "RevistaDigital/PopupCerrar",
        urlPopupNoMostrar: baseUrl + "RevistaDigital/PopupNoVolverMostrar",
        urlInformacion: "/RevistaDigital/Informacion"
    };

    var _setting = {
        NoVolverMostrar: false
    };

    var _popupCrear = function (modelo) {
        SetHandlebars(_elements.PopupSuscripcionTemplate, modelo, _elements.PopupSuscripcionId);
    };

    var _PopupCerrar = function (tipo) {

        AbrirLoad();
        _setting.NoVolverMostrar = true;
        var urlAjax = "";
        switch (tipo) {
            case 1:
                rdAnalyticsModule.CerrarPopUp("Enterate");
                urlAjax = _url.urlPopupCerrar;
                break;
            case 2:
                urlAjax = _url.urlPopupNoMostrar;
                break;
            case 3:
                urlAjax = _url.urlPopupCerrar;
                break;
        }

        if (urlAjax === "") {
            CerrarLoad();
            return false;
        }

        $.ajax({
            type: "POST",
            url: urlAjax,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                CerrarLoad();
                CerrarPopup(_elements.PopupSuscripcionId);
            },
            error: function (data, error) {
                CerrarLoad();
            }
        });
    };

    var MostrarPopup = function () {

        if ((typeof PopupMostrar === "undefined" && typeof AbrirPopupFade == "undefined") || _setting.NoVolverMostrar) {
            return false;
        }

        AbrirLoad();
        $.ajax({
            type: "POST",
            url: _url.urlPopupDatos,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                CerrarLoad();
                if (data.success === false || data.modelo === undefined) {
                    return false;
                }
                _setting.NoVolverMostrar = true;
                _popupCrear(data.modelo);
                if (isMobile()) {
                    AbrirPopupFade(_elements.PopupSuscripcionId);
                }
                else {
                    PopupMostrar(_elements.PopupSuscripcion);
                }
                if (rdAnalyticsModule) {
                    rdAnalyticsModule.MostrarPopup();
                }
            },
            error: function (data, error) {
                CerrarLoad();
            }
        });
    };
    
    var RedireccionarInformacion = function (tipo) {
        _PopupCerrar(3);
        tipo = tipo || 0;
        rdAnalyticsModule.IrEnterate();

        var url = (isMobile() ? "/Mobile" : "") + _url.urlInformacion;
        if (tipo === 2) url += "?tipo=" + tipo;
        var urlLocal = $.trim(window.location).toLowerCase() + "/";
        window.location = url;
        if (urlLocal.indexOf(_url.urlInformacion.toLowerCase() + "/") >= 0) {
            window.location.reload();
        }
    };

    return {
        Mostrar: MostrarPopup,
        Cerrar: function () { _PopupCerrar(1); },
        NoMostrar: function () { _PopupCerrar(2); },
        RedireccionarInformacion: RedireccionarInformacion
    };

})();
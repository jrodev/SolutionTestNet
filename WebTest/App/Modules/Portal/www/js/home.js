// home scripts
var wsUrl = 'http://localhost:50245/App/Services/WSTest.asmx/listarReglaValidacionExcluir';
$(function () {

    $.ajax({
        url: wsUrl,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ sQuery: 'sdds' }),
        beforeSend: function () {
            // setting a timeout
            //console.log("Enviando....");
            //$(placeholder).addClass('loading');
        },
        success: function (response) {
            console.log("succes del method")
            console.log(response)
        },
        complete: function () {
            //console.log("procesado!");
            //$(placeholder).removeClass('loading');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var error = eval("(" + xhr.responseText + ")");
            console.log("WebService:" + wsUrl + ": " + error.Message);
        }
    });

});

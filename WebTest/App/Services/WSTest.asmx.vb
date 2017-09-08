Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports System.ComponentModel
Imports System.Web.Script.Services

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Public Class WSTest
    Inherits System.Web.Services.WebService

    'WebMethod Test -----------------------------------------------------------------------------------------------------
    <WebMethod()>
    Public Function HelloWorld() As String
        Return "Hello World"
    End Function

    ' -------------------------------------------------------------------------------------------------------------------
    <WebMethod(EnableSession:=True)>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json, UseHttpGet:=False, XmlSerializeString:=False)>
    Public Function listarReglaValidacionExcluir(ByVal sQuery As String) As ResponseJson(Of BEReglaValidacionExcluir)

        Dim responseJson As New ResponseJson(Of BEReglaValidacionExcluir)

        Try
            Dim da As New App.DataAccess.Encuesta.DAReglaValidacionExcluir
            Dim lista As New List(Of BEReglaValidacionExcluir)
            lista = da.listar(sQuery)

            If (lista.Count > 0) Then
                'listadoEncuestas.items = resultado
                responseJson.success = True
                responseJson.message = "Operación exitosa"
                responseJson.data = lista
            End If
        Catch ex As Exception
            responseJson.message = ex.Message
            Throw ex
        End Try

        Return responseJson

    End Function

End Class
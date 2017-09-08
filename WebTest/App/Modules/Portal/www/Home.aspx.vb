
Imports WebTest.App.libraries
Imports Newtonsoft.Json
'Imports WebTest.WSTest ' ambiguos


'Imports System.Data.SqlClient

Public Class Home
    Inherits System.Web.UI.Page

    Public sqlRes As String

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim sp As String = "pa_InsertarRegistroTablaExcluir_ANT"
        Dim DB As New DB(Me.GetSetting("encuesta"))

        Dim oSDA As Object = DB.dtSqlResult(sp, "sp", "Reader", New Dictionary(Of String, Object) From {
            {"Encuesta_ID", 1532},
            {"Regla", "R5646"},
            {"Comentario", "coment coment coment"},
            {"isTest", 1}
        })

        ' Ejecutando WS estilo proxy
        'Dim ws As New WSTest
        'ws.listarReglaValidacionExcluir("")


        ' Devolviendo todos los registro de la consulta
        'Dim oSDA As Object = DB.dtSqlResult("SELECT * FROM ReglaValidacionExcluir", "sql", "Reader|Scalar|NonQuery")

        sqlRes = JsonConvert.SerializeObject(oSDA, Formatting.Indented)

    End Sub

    Function GetSetting(key As String) As String
        Dim sValue As String = ""
        Try
            Dim appSettings = ConfigurationManager.AppSettings
            Dim sResult As String = appSettings(key)
            If Not IsNothing(sResult) Then
                sValue = sResult
            End If
            Console.WriteLine(sResult)
        Catch e As ConfigurationErrorsException
            Console.WriteLine("Error reading app settings")
        End Try
        Return sValue
    End Function

End Class
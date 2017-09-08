
Imports WebTest.App.libraries

Namespace App.DataAccess.Encuesta

    Public Class DAReglaValidacionExcluir
        Inherits DABase

        Public Function listar(sQuery As String) As List(Of BEReglaValidacionExcluir)

            Dim DB As New DB(Me.GetSetting("encuesta"))
            Dim Lista As New List(Of BEReglaValidacionExcluir)

            Dim dt As DataTable = DB.dtSqlResult("ReglaValidacionExcluir", "table", "Reader")

            For Each row As DataRow In dt.Rows

                Dim Item As New BEReglaValidacionExcluir

                Item.encuestaID = CInt(row("Encuesta_ID"))
                Item.regla = If(IsDBNull(row("Regla")), "", row("Regla"))
                Item.comentario = If(IsDBNull(row("Comentario")), "", row("Comentario"))
                Item.fechaRegistro = If(IsDBNull(row("FechaRegistro")), "", row("FechaRegistro"))

                Lista.Add(Item)

            Next

            Return Lista

        End Function



    End Class

End Namespace

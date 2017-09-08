Imports Microsoft.VisualBasic
Imports System.Data.SqlClient
Imports System.Collections.Generic

Namespace App.libraries

    Public Class DB

        'Private _connectionString As String
        Private _cn As SqlConnection

        Private Shared ReadOnly dics As New Dictionary(Of String, String()) From {
        {"sizes", New String() {"small", "medium", "large"}},
        {"colors", New String() {"black", "red", "brown"}},
        {"shapes", New String() {"circle", "square"}}
    }

        Public Sub New(connectionString As String)
            '_connectionString = connectionString
            _cn = New SqlConnection(connectionString)
        End Sub


        ' Ejecutando sql o SP retornando DataTable o Objeto
        ' sCmdType = sp|table|sql
        ' sExecType = Reader|Scalar|NonQuery
        ' dParams (para sp) = { {key, value}, { }, ... }
        Public Function dtSqlResult(
        sCmdSql As String,
        Optional sCmdType As String = "sql",
        Optional sExecType As String = "NonQuery",
        Optional dParams As Dictionary(Of String, Object) = Nothing
    ) As Object

            _cn.Open()

            ' Tipos de Comandos (sp=StoredProcedured, table=TableDirect, sql=Text)
            Dim dCmdType As New Dictionary(Of String, Integer) From {{"sp", 4}, {"table", 1}, {"sql", 1}} '{"table", 512} error!

            Using cmd As SqlCommand = _cn.CreateCommand()
                cmd.CommandType = dCmdType(sCmdType)
                cmd.CommandText = If(sCmdType = "table", "SELECT * FROM ", "") + sCmdSql

                ' Aunq se defina sCmdType como 'sp' no garantiza que tendra parametros
                If Not dParams Is Nothing Then
                    AddParameters(cmd, dParams)
                End If

                ' Tipo de Ejecucion
                Select Case sExecType
                    Case "Reader"
                        ' Retornando un DataTable
                        Dim dt As New DataTable
                        Dim dr As SqlDataReader = cmd.ExecuteReader()
                        dt.Load(dr)
                        _cn.Close()
                        Return dt
                    Case "Scalar"
                        ' Retornando un valor tipo Object
                        Dim resScalar As Object = cmd.ExecuteScalar()
                        _cn.Close()
                        Return resScalar
                    Case Else
                        'Case "NonQuery"
                        ' Retorna un valor numerico (Numero de row afectados)
                        Dim resNonQuery As Integer = cmd.ExecuteNonQuery()
                        _cn.Close()
                        Return resNonQuery
                End Select

            End Using

        End Function


        ' Ejecuta un SP y lo Retorna en un DataTable
        Public Function dtSpResult(sCmdText As String, dParams As Dictionary(Of String, Object)) As DataTable

            'Este método está optimizado para cargar un DataTable con datos de SOLO LECTURA
            Dim dt As DataTable = New DataTable
            Try
                _cn.Open()
                Dim cmd As SqlCommand = Me.BuildCommand(sCmdText, dParams)
                Dim da As SqlDataAdapter = New SqlDataAdapter(cmd)
                da.Fill(dt)
                _cn.Close()
            Catch
            End Try

            Return dt

        End Function


        ' DEPRECATE ----------------------------------------------------------------------------------------------------------
        Private Function BuildCommand(cmdTxt As String, params As Dictionary(Of String, Object)) As SqlCommand
            Using cmd As SqlCommand = _cn.CreateCommand()
                cmd.CommandType = CommandType.StoredProcedure
                cmd.CommandText = cmdTxt
                AddParameters(cmd, params)
                'con.Open() 'working on the assumption this command will be run as soon as it's retuned; so this open is left as late as possible but here to avoid duplicate code
                Return cmd
            End Using
        End Function

        Private Sub AddParameters(ByRef cmd As SqlCommand, params As Dictionary(Of String, Object))
            If Not params Is Nothing Then
                For Each kvp As KeyValuePair(Of String, Object) In params
                    cmd.Parameters.AddWithValue(kvp.Key, kvp.Value)
                Next
            End If
        End Sub

    End Class

End Namespace
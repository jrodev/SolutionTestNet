
Namespace App.DataAccess

    Public Class DABase

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

End Namespace

Public Class ResponseJson(Of T As New)

    Private _success As Boolean = False
    Public Property success As Boolean
        Get
            Return _success
        End Get
        Set(value As Boolean)
            _success = value
        End Set
    End Property

    Private _data As New List(Of T)()
    Public Property data As List(Of T)
        Get
            Return _data
        End Get
        Set(value As List(Of T))
            _data = value
        End Set
    End Property

    Private _message As String = ""
    Public Property message As String
        Get
            Return _message
        End Get
        Set(value As String)
            _message = value
        End Set
    End Property

End Class
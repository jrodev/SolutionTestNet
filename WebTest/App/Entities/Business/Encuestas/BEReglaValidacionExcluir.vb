Public Class BEReglaValidacionExcluir

    ' ID es autoincrement

    Private _encuestaID As Integer
    Public Property encuestaID As Integer
        Get
            Return _encuestaID
        End Get
        Set(value As Integer)
            _encuestaID = value
        End Set
    End Property

    Private _regla As String
    Public Property regla As String
        Get
            Return _regla
        End Get
        Set(value As String)
            _regla = value
        End Set
    End Property

    Private _comentario As String
    Public Property comentario As String
        Get
            Return _comentario
        End Get
        Set(value As String)
            _comentario = value
        End Set
    End Property

    Private _fechaRegistro As String
    Public Property fechaRegistro As String
        Get
            Return _fechaRegistro
        End Get
        Set(value As String)
            _fechaRegistro = value
        End Set
    End Property

    ' _fechaRegistro se setea desde SQL

End Class

<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/App/Layouts/Portal.Master" CodeBehind="Home.aspx.vb" Inherits="WebTest.Home" %>
        
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="js/home.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentMain" runat="server">
    <h3>Content Home!!</h3>
    <%=sqlRes %>
    <asp:Repeater ID="testRepeater" runat="server">
        <HeaderTemplate>
            <table>
                <tr>
                    <th><b>ColA</b></th>
                    <th><b>ColB</b></th>
                    <th><b>ColC</b></th>
                </tr>
        </HeaderTemplate>
        <ItemTemplate>
            <tr>
                <td>><%# Eval("ColA")%></td> 
                <td>><%# Eval("ColB")%></td> 
                <td>><%# Eval("ColC")%></td> 
        </ItemTemplate>
        <FooterTemplate>
            </table>
            </tr>
        </FooterTemplate>
    </asp:Repeater>
</asp:Content>
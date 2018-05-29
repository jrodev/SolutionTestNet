using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WebTestSharp.App.Libraries;

namespace WebTestSharp.App
{
    public partial class run : System.Web.UI.Page
    {
        protected string salt = "";
        protected string textNormal = "Holashsh";
        protected string textEncrip = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            salt = Guid.NewGuid().ToString();
            textEncrip = RijndaelManagedEncryption.EncryptRijndael(textNormal, salt);
            textNormal = RijndaelManagedEncryption.DecryptRijndael(textEncrip, salt);
        }
    }
}
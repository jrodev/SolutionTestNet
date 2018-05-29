using DataAccess;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebTestSharp.App.www
{

    public partial class Index : System.Web.UI.Page
    {

        public string sqlRes = "";

        protected void Page_Load(object sender, System.EventArgs e)
        {
            string table = "documento";
            DASql DB = new DASql(this.GetSetting("sisget"));
            object oSDA = DB.objSqlResult(table, "table", "Reader");
            sqlRes = JsonConvert.SerializeObject(oSDA, Formatting.Indented);
        }

        private string GetSetting(string key)
        {
            string sValue = "";
            try
            {
                var appSettings = ConfigurationManager.AppSettings;
                string sResult = appSettings[key];
                if (!(sResult==null))
                {
                    sValue = sResult;
                }

                Console.WriteLine(sResult);
            }
            catch (ConfigurationErrorsException e)
            {
                Console.WriteLine("Error reading app settings");
            }

            return sValue;
        }
    }

}

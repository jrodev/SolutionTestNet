using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleTestSharp.Testing
{
    class HttpPost
    {
        static public void send ()
        {
            var data = new
            {
                Aplicacion = "PORTALCONSULTORAS",
                Pais = "PE",
                Usuario = "logError.CodigoUsuario",
                Mensaje = "exceptionMessage",
                StackTrace = "exceptionStackTrace",

                CurrentUrl = "urlRequest",
                ControllerName = "ctrl.ToLower()",
                ActionName = "acti.ToLower()",

                Extra = new Dictionary<string, string>() {
                    { "Origen", "logError.Origen" },
                    //{ "Url", urlRequest },
                    { "Browser", "browserRequest" },
                    { "TipoTrace", "LogManager" },
                    { "Server", "Environment.MachineName" }
                }
            };

            var dataString = JsonConvert.SerializeObject(data);

            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri("http://localhost:34840");//http://api.somos-belcorp.local
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpContent contentPost = new StringContent(dataString, Encoding.UTF8, "application/json");

                HttpResponseMessage response = httpClient.PostAsync("Api/LogError", contentPost).GetAwaiter().GetResult();

                var result = response.IsSuccessStatusCode;

                Console.WriteLine(result);
                    Console.Read();
            }


        }
    }
}

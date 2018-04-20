using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebTestSharp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            RazorViewEngine razorEngine = ViewEngines.Engines.OfType<RazorViewEngine>().FirstOrDefault();
            if (razorEngine != null)
            {
                var newPartialViewFormats = new[] {
                    "~/Views/{1}/Partials/{0}.cshtml",
                    "~/Views/Shared/Partials/{0}.cshtml"
                };
                razorEngine.PartialViewLocationFormats = razorEngine.PartialViewLocationFormats.Union(newPartialViewFormats).ToArray();
            }

        }
    }
}

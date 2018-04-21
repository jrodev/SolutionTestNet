using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebTestSharp.Engine
{
    public class ThemeViewEngine : RazorViewEngine
    {
        public ThemeViewEngine(string tema)
        {

            ViewLocationFormats = new[]
            {
                "~/Views/Themes/"+tema + "/{1}/{0}.cshtml",
                "~/Views/Themes/"+tema + "/Shared/{0}.cshtml"
            };

            PartialViewLocationFormats = new[]
            {
                "~/Views/Themes/"+tema + "/{1}/{0}.cshtml",
                "~/Views/Themes/"+tema + "/Shared/{0}.cshtml"
            };

            AreaViewLocationFormats = new[]
            {
                "~/Areas/{2}/Views/Themes/"+tema + "/{1}/{0}.cshtml",
                "~/Areas/{2}/Views/Themes/"+tema + "/Shared/{0}.cshtml"
            };

            AreaPartialViewLocationFormats = new[]
            {
                "~/Areas/{2}/Views/Themes/"+tema + "/{1}/{0}.cshtml",
                "~/Areas/{2}/Views/Themes/"+tema + "/Shared/{0}.cshtml"
            };
        }
    }
}
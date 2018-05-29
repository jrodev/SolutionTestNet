using System;
using System.Collections.Generic;
using System.Web.Mvc;

using System.Web;
using System.Web.Optimization;
using AspNetBundling;

namespace WebTestBundleSourceMap
{
    public class BundleConfig
    {

        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(/*
                new ScriptBundle("~/js/alljs").Include(
                    //"~/Scripts/jquery-2.1.1.*", "~/Scripts/jquery.validate.*",
                    //"~/Scripts/jquery-ui-1.11.1.js"
                    "~/scripts/js/extra.js",
                    "~/scripts/js/main.js"
                )*/
                new ScriptBundle("~/js/alljs").Include(
                    "~/scripts/js/belcorp/youtube.js",
                    "~/scripts/js/extra.js",
                    "~/scripts/js/main.js"
                )
            );

            bundles.Add(new StyleBundle("~/css/allcss").Include(
                //"~/Content/themes/base/jquery.ui.accordion.css",
                //"~/Content/themes/base/jquery.ui.all.css",
                "~/scripts/css/reset.css",
                "~/scripts/css/main.css"
            ));

            #if DEBUG
            BundleTable.EnableOptimizations = true; // Habilitar o no, la minificacion y union
            #else
            BundleTable.EnableOptimizations = true;
            #endif
        }
    }
}

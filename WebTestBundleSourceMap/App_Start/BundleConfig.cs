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

            bundles.Add(new ScriptWithSourceMapBundle("~/bundles/JsSB2-Bienvenida").Include(
                "~/scripts/js/belcorp/implements/youtube.js",
                "~/scripts/js/belcorp/PortalConsultoras/Bienvenida/Index.js",
                "~/scripts/js/belcorp/PortalConsultoras/Pedido/barra.js",
                "~/scripts/js/belcorp/PortalConsultoras/CatalogoPersonalizado/CatalogoPersonalizado.js",
                "~/scripts/js/belcorp/PortalConsultoras/Bienvenida/Estrategia.js",
                "~/scripts/js/belcorp/PortalConsultoras/ShowRoom/ShowRoom.js",
                "~/scripts/js/belcorp/PortalConsultoras/RevistaDigital/RevistaDigital-DataLayer.js",
                "~/scripts/js/belcorp/PortalConsultoras/RevistaDigital/RevistaDigital-Suscripcion.js",
                "~/scripts/js/belcorp/PortalConsultoras/RevistaDigital/RevistaDigital-SuscripcionPopup.js",
                "~/scripts/js/belcorp/PortalConsultoras/Cupon/CuponModule.js",
                "~/scripts/js/belcorp/PortalConsultoras/Cupon/Cupon.js",
                "~/scripts/js/belcorp/PortalConsultoras/EstrategiaPersonalizada/EstrategiaAccion.js",
                "~/scripts/js/belcorp/PortalConsultoras/EstrategiaPersonalizada/LocalStorage.js",
                "~/scripts/js/belcorp/PortalConsultoras/TagManager/Home-Pedido.js",
                "~/scripts/js/belcorp/PortalConsultoras/TagManager/Liquidacion.js",
                "~/scripts/js/belcorp/PortalConsultoras/EstrategiaProducto/DetalleProducto.js",
                "~/scripts/js/belcorp/jquery.flexslider.js",
                "~/scripts/js/belcorp/jquery.rateyo.js",
                "~/scripts/js/belcorp/jquery.easy-pie-chart.js",
                "~/scripts/js/belcorp/PortalConsultoras/Mobile/CatalogoPersonalizado/bootstrap-slider.min.js"
            ));

            #if DEBUG
            BundleTable.EnableOptimizations = true; // Habilitar o no, la minificacion y union
            #else
            BundleTable.EnableOptimizations = true;
            #endif
        }
    }
}

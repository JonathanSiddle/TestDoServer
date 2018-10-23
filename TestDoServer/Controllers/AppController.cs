using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace TestDoServer.Controllers
{
    public class AppController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public AppController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public IActionResult Index()
        {
            var httpType = Request.HttpContext.Request.Scheme;
            var baseUrl = Request.HttpContext.Request.Host;

            // pass variables to page here...
            var apiUrl = httpType + "://" + baseUrl + "/api/";

            var jsonConfigString = "{" +
                " &quot;baseUrl&quot; : &quot;" + System.Web.HttpUtility.HtmlEncode(apiUrl) + "&quot;" +
                "}";

            var jsPath = _hostingEnvironment.WebRootPath + "\\TestDo"; // TODO: make platform independent
            var jsFiles = Directory.GetFiles(jsPath).Where(f => f.EndsWith(".js")).ToList();

            var justFiles = jsFiles
                .Select(f => f.Substring(f.LastIndexOf("\\"), (f.Length - f.LastIndexOf("\\"))).Replace("\\", ""))
                .Select(f => "/TestDo/" + f)
                .ToList();

            ViewBag.jsIncludes = justFiles;
            ViewBag.jsonConfig = jsonConfigString;
            return View("Index");
        }
    }
}
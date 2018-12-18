using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using TestDoServer.Util;

namespace TestDoServer.Controllers
{
    public class AppController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public AppController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [Authorize]
        public IActionResult Index()
        {
            var httpType = Request.HttpContext.Request.Scheme;
            var baseUrl = Request.HttpContext.Request.Host;

            // pass variables to page here...
            var apiUrl = httpType + "://" + baseUrl + "/api/";

            var jsonConfigString = "{" +
                " &quot;baseUrl&quot; : &quot;" + System.Web.HttpUtility.HtmlEncode(apiUrl) + "&quot;" +
                "}";

            var localPath = _hostingEnvironment.WebRootPath + "\\TestDo"; // TODO: make platform independent
            var jsFiles = LoadStaticLocalFiles(localPath, "js");
            var cssFiles = LoadStaticLocalFiles(localPath, "css");

            jsFiles.Sort(AngularImportsSorter.CompareImports);

            ViewBag.cssIncludes = cssFiles;
            ViewBag.jsIncludes = jsFiles;
            ViewBag.jsonConfig = jsonConfigString;
            return View("Index");
        }
        
        public List<string> LoadStaticLocalFiles(string localPath, string extension)
        {
            var localFiles = new List<string>();

            foreach (string file in Directory.EnumerateFiles(localPath, $@"*.{extension}", SearchOption.AllDirectories))
            {
                localFiles.Add(file);
            }

            // TODO: Make this more efficient...
            return localFiles
            .Select(f => f.Substring(f.LastIndexOf("\\wwwroot"), (f.Length - f.LastIndexOf("\\wwwroot"))))
            .Select(f => f.Replace("\\wwwroot", ""))
            .ToList();
        }

    }
}
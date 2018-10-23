using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TestDoServer.Controllers
{
    public class AppController : Controller
    {
        public IActionResult Index()
        {
            // pass variables to page here...

            return View();
        }
    }
}
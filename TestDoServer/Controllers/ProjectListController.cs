using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestDoServer.DAL;
using TestDoServer.DAL.Models;

namespace TestDoServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectListController : ControllerBase
    {
        private readonly TestDoContext _context;

        public ProjectListController(TestDoContext context)
        {
            _context = context;
        }

        // GET: api/ProjectList
        [HttpGet]
        public ActionResult<List<ProjectList>> Get()
        {
            var projectList = _context.ProjectList
                .Include(pl => pl.Items).ToList();
            Console.WriteLine("Got projectList");

            return projectList;
        }

        // GET: api/ProjectList/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<ProjectList> Get(int id)
        {
            var list = _context.ProjectList
                .Include(pl => pl.Items).SingleOrDefault(pl => pl.Id == id);
            return list;
        }

        // POST: api/ProjectList
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ProjectList/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

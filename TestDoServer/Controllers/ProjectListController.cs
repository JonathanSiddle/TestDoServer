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
        public ActionResult<List<ToDoList>> Get()
        {
            var projectList = _context.ToDoList
                .Include(pl => pl.Items).ToList();
                //.ThenInclude(pl => )
            Console.WriteLine("Got projectList");

            return projectList;
        }

        // GET: api/ProjectList/5
        [HttpGet("{id}", Name = "GetToDoList")]
        public ActionResult<ToDoList> Get(int id)
        {
            var list = _context.ToDoList
                .Include(pl => pl.Items)
                .SingleOrDefault(pl => pl.Id == id);

            if (list == null) return NotFound();

            return list;
        }

        // POST: api/ProjectList
        [HttpPost]
        public IActionResult Post(ToDoList list)
        {
            //do validation here...
            _context.ToDoList.Add(list);
            _context.SaveChanges();

            return CreatedAtRoute("GetToDoList", new { id = list.Id }, list);
        }

        // PUT: api/ProjectList/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, ToDoList list)
        {
            //some validation here...
            var li = _context.ToDoList.Find(id);
            if (li == null) return NotFound();

            li.Name = list.Name;
            li.Owner = list.Owner;

            _context.SaveChanges();

            return CreatedAtRoute("GetToDoList", new { id = list.Id }, list);
        }

        // DELETE: api/ListItem/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var li = _context.ToDoList.Find(id);
            if (li == null) return NotFound();
            
            _context.ToDoList.Remove(li);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestDoServer.DAL;
using TestDoServer.DAL.Models;

namespace TestDoServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListItemController : Controller
    {
        private readonly TestDoContext _context;

        public ListItemController(TestDoContext context)
        {
            _context = context;
        }

        // GET: api/ListItem
        [HttpGet]
        public ActionResult<List<ToDoItem>> Get()
        {
            var projectList = _context.ToDoItem.ToList();
            //.ThenInclude(pl => )
            // Console.WriteLine("Got projectList");

            return projectList;
        }

        // GET: api/ListItem/5
        [HttpGet("{id}", Name = "GetToDoItem")]
        public ActionResult<ToDoItem> Get(int id)
        {
            var list = _context.ToDoItem
                .SingleOrDefault(item => item.Id == id);

            if (list == null) return NotFound();

            return list;
        }

        // POST: api/ListItem
        [HttpPost]
        public IActionResult Post(ToDoItem item)
        {
            //do validation here...
            _context.ToDoItem.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetToDoItem", new { id = item.Id }, item);
        }

        // PUT: api/ListItem/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, ToDoItem item)
        {
            //some validation here...
            var i = _context.ToDoItem.Find(id);
            if (i == null) return NotFound();

            i.Name = item.Name;
            i.Complete = item.Complete;

            _context.SaveChanges();

            return CreatedAtRoute("GetToDoItem", new { id = item.Id }, item);
        }

        // DELETE: api/ListItem/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = _context.ToDoItem.Find(id);
            if (item == null) return NotFound();

            _context.ToDoItem.Remove(item);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
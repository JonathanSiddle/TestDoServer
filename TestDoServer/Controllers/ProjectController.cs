using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestDoServer.DAL;
using TestDoServer.Models;
using TestDoServer.Repository;

namespace TestDoServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly TestDoContext _context;

        public ProjectController(TestDoContext context)
        {
            _context = context;
        }

        // GET: api/Project
        [HttpGet]
        public ActionResult<List<ToDoProject>> Get()
        {
            var toDoProjects = _context.ToDoProject
                .Include(p => p.ToDoLists)
                .ToList();
            Console.WriteLine("Got projects");
            return toDoProjects;
        }

        // GET: api/Project/5
        [HttpGet("{id}", Name = "GetToDoProject")]
        public ActionResult<ToDoProject> Get(int id)
        {
            var proj = _context.ToDoProject
                       .Include(p => p.ToDoLists)
                       .SingleOrDefault(p => p.Id == id);

            if (proj == null) return NotFound();

            return proj;
        }

        // POST: api/Project
        [HttpPost]
        public IActionResult Post(ToDoProject proj)
        {
            _context.ToDoProject.Add(proj);
            _context.SaveChanges();

            return CreatedAtRoute("GetToDoProject", new { id = proj.Id }, proj);
        }

        // PUT: api/Project/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, ToDoProject project)
        {
            var proj = _context.ToDoProject.Find(id);
            if (proj == null) return NotFound();

            proj.Name = project.Name;
            proj.Owner = project.Owner;

            _context.SaveChanges();
            //return the newly updated project
            return CreatedAtRoute("GetToDoProject", new { id = proj.Id }, proj); ;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var proj = _context.ToDoProject.Find(id);
            if (proj == null) return NotFound();

            _context.ToDoProject.Remove(proj);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

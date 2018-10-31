using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestDoServer.DAL.Models;
using TestDoServer.Models;

namespace TestDoServer.DAL
{
    public class TestDoContext : DbContext
    {
        public TestDoContext(DbContextOptions<TestDoContext> options) : base(options)
        {
        }

        public DbSet<ToDoProject> ToDoProject { get; set; }
        public DbSet<ToDoList> ToDoList { get; set; }
        public DbSet<ToDoItem> ToDoItem { get; set; }
    }
}

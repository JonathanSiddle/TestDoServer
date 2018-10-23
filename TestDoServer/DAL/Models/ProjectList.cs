using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestDoServer.Models;

namespace TestDoServer.DAL.Models
{
    public class ProjectList
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ToDoProject Project { get; set; }
        public List<ListItem> Items { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestDoServer.Models;

namespace TestDoServer.DAL.Models
{
    public class ToDoList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Owner { get; set; }

        public ToDoProject Project { get; set; }
        public List<ToDoItem> Items { get; set; }
    }
}

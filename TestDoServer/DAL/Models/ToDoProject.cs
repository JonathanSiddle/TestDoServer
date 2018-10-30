using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestDoServer.DAL.Models;

namespace TestDoServer.Models
{
    public class ToDoProject
    {
        public string Name { get; set; }
        public string Owner { get; set; }
        public int Id { get; set; }

        public List<ToDoList> ToDoLists { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestDoServer.DAL.Models
{
    public class ToDoItem

    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Compelte { get; set; }
        
        public ToDoList ToDoList { get; set;}
    }
}
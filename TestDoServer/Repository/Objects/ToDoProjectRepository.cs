using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestDoServer.DAL;
using TestDoServer.Models;
using TestDoServer.Repository.Objects;

namespace TestDoServer.Repository
{
    public class ToDoProjectRepository : Repository<ToDoProject>, IToDoProjectRepository
    {
        public ToDoProjectRepository(TestDoContext context) : base(context)
        {

        }
    }
}

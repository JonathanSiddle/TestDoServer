using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestDoServer.DAL;
using TestDoServer.Repository.Objects;

namespace TestDoServer.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TestDoContext _context;

        public IToDoProjectRepository ToDoProject { get; }

        /// <summary>
        /// Default constructor, takes actual db context.
        /// </summary>
        /// <param name="context">db context</param>
        public UnitOfWork(TestDoContext context)
        {
            _context = context;
            ToDoProject = new ToDoProjectRepository(_context);
            Console.WriteLine("Finished constructing unitOfWork!!");
        }

        /// <summary>
        /// Will save changes to the db.
        /// </summary>
        public void Complete()
        {
            _context.SaveChanges();
        }
    }
}

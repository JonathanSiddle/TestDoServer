using TestDoServer.Repository.Objects;

namespace TestDoServer.Repository
{
    public interface IUnitOfWork
    {
        IToDoProjectRepository ToDoProject { get; }

        /// <summary>
        /// Will save changes to the db.
        /// </summary>
        void Complete();
    }
}

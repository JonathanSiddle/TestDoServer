using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace TestDoServer.Repository
{
    /// <summary>
    /// Generic implimentation of repository, specific repositories with custom
    /// data access logic can derive.
    /// </summary>
    /// <typeparam name="TEntity">Entity</typeparam>
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// Context can be used by class that derives from this.
        /// </summary>
        protected readonly DbContext Context;

        /// <summary>
        /// Default constructor passed a DbContext. 
        /// </summary>
        /// <param name="context"></param>
        public Repository(DbContext context)
        {
            Context = context;
        }

        /// <summary>
        /// Return a specific instance of an entity by Id.
        /// </summary>
        /// <param name="id">Look-up Id</param>
        /// <returns>Entity, if found</returns>
        public TEntity Get(int id)
        {
            return Context.Set<TEntity>().Find(id);
        }

        public TEntity Get(string id)
        {
            return Context.Set<TEntity>().Find(id);
        }

        /// <summary>
        /// Return all entities.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<TEntity> GetAll()
        {
            return Context.Set<TEntity>().ToList();
        }

        /// <summary>
        /// Return a set of entities that match a given predicate.
        /// </summary>
        /// <param name="predicate">Predicate</param>
        /// <returns>List of entities</returns>
        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return Context.Set<TEntity>().Where(predicate);
        }

        /// <summary>
        /// Add a given entity.
        /// </summary>
        /// <param name="entity">Entity to add</param>
        public void Add(TEntity entity)
        {
            Context.Set<TEntity>().Add(entity);
        }

        /// <summary>
        /// Add multiple entites at once.
        /// </summary>
        /// <param name="entities">Entities to add</param>
        public void AddRange(IEnumerable<TEntity> entities)
        {
            Context.Set<TEntity>().AddRange(entities);
        }

        /// <summary>
        /// Remove an entity.
        /// </summary>
        /// <param name="entity">Entity to remove</param>
        public void Remove(TEntity entity)
        {
            Context.Set<TEntity>().Remove(entity);
        }

        /// <summary>
        /// Remove multiple entities.
        /// </summary>
        /// <param name="entities">Entities to remove</param>
        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            Context.Set<TEntity>().RemoveRange(entities);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Repositories.Contract;

namespace TwinBackend.Repository.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TwinDbContext _context;
        private Hashtable Repositories = new Hashtable();
        public UnitOfWork(TwinDbContext context)
        {
            _context = context;
        }
        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async ValueTask DisposeAsync()
        {
            await _context.DisposeAsync();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            var key = typeof(TEntity).Name;
            if(!Repositories.ContainsKey(key))
            {
                var Repo = new GenericRespository<TEntity>(_context);
                Repositories.Add(key, Repo);
            }
            return Repositories[key] as IGenericRepository<TEntity>;
        }
    }
}

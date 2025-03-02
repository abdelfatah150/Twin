using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Repositories.Contract;
using TwinBackend.Core.Specifications;

namespace TwinBackend.Repository.Data.Repositories
{
    public class GenericRespository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly TwinDbContext _twinDbContext;

        public GenericRespository(TwinDbContext twinDbContext)
        {
            _twinDbContext = twinDbContext;
        }

        public async Task Add(T entity)
        {
            await _twinDbContext.Set<T>().AddAsync(entity);
        }

        public void Delete(T entity)
        {
            _twinDbContext.Set<T>().Remove(entity);
        }

        public async Task<IReadOnlyList<T>> GetAll()
        {
            return await _twinDbContext.Set<T>().ToListAsync();
        }

        public  async Task<IReadOnlyList<T>> GetAllSpecAsync(ISpecifications<T> spec)
        {
            return await SpecificationEvaluator<T>.GetSpecItems(_twinDbContext.Set<T>(), spec).ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _twinDbContext.Set<T>().FindAsync(id);
        }

        public void Update(T entity)
        {
            _twinDbContext.Set<T>().Update(entity);
        }
    }
}

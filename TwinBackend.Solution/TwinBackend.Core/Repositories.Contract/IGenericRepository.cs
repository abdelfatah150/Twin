using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Specifications;

namespace TwinBackend.Core.Repositories.Contract
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IReadOnlyList<T>> GetAll();
        Task Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        IEnumerable<T> GetAllSpecAsync(ISpecifications<T> spec);
        Task<T> GetById(int id);
        int SaveChanges();
    }
}

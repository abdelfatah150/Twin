using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;

namespace TwinBackend.Core.Repositories.Contract
{
    public interface IClientRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Repositories.Contract;

namespace TwinBackend.Repository.Data.Repositories
{
    public class ClientRepository: GenericRespository<Client>, IClientRepository<Client>
    {
        public ClientRepository(TwinDbContext dbContext) : base(dbContext) { }
    }
}

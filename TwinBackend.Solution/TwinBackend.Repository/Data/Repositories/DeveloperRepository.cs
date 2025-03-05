using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;

namespace TwinBackend.Repository.Data.Repositories
{
    public class DevelperRepository : GenericRespository<Question>
    {
        public DevelperRepository(TwinDbContext context) : base(context) { }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Repositories.Contract;

namespace TwinBackend.Repository.Data.Repositories
{
    public class QuestionRepository : GenericRespository<Question>, IGenericRepository<Question>
    {
        public QuestionRepository(TwinDbContext context) : base(context) { }
    }
}

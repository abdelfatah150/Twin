using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;

namespace TwinBackend.Repository.Data.Repositories
{
    public class QuestionRepository : GenericRespository<Question>
    {
        public QuestionRepository(TwinDbContext context) : base(context) { }
    }
}

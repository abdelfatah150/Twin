using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;

namespace TwinBackend.Repository.Data
{
    public class TwinDbContext :DbContext
    {
        public TwinDbContext(DbContextOptions<TwinDbContext> options) : base(options) { }

        public DbSet<Question> Questions { get; set; }
        public DbSet<QuestionChoices> QuestionChoices { get; set; }
        public DbSet<Developer> Developers { get; set; }
    }
}

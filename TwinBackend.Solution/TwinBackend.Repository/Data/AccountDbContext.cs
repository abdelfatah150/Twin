using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core;
using TwinBackend.Core.Entities;

namespace TwinBackend.Repository.Data
{
    public class AccountDbContext : IdentityDbContext<AppUser>
    {
        public AccountDbContext(DbContextOptions<AccountDbContext> dbContextOptions) : base(dbContextOptions) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>().ToTable("Users");
        }
    }
}

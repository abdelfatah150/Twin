using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;

namespace TwinBackend.Core.Services.Contract
{
    public interface IJwtService
    {
        Task<(string, string)> CreateTokenAsync(AppUser user, UserManager<AppUser> userManager, int Id);
        Task<string> RefreshTokenAsync(string token, string refreshToken, UserManager<AppUser> userManager);
    }
}

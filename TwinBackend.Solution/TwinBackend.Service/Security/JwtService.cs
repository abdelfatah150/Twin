using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Services.Contract;

namespace TwinBackend.Service.Security
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;
        private readonly ICacheService _cacheService;

        public JwtService(IConfiguration configuration, ICacheService cacheService)
        {
            _configuration = configuration;
            _cacheService = cacheService;
        }
        public async Task<(string, string)> CreateTokenAsync(AppUser user, UserManager<AppUser> userManager)
        {
            //Private Claims[User Information]
            var authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, user.Email),

            };

            var userRoles = await userManager.GetRolesAsync(user);

            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var authKey = _configuration["Jwt:Key"];
            var keyBytes = Encoding.UTF8.GetBytes(authKey);
            var securityKey = new SymmetricSecurityKey(keyBytes);

            var token = new JwtSecurityToken
                (
                audience: _configuration["Jwt:Audience"],
                issuer: _configuration["Jwt:Issuer"],
                expires: DateTime.Now.AddDays(double.Parse(_configuration["Jwt:ExpiryDays"])),
                claims: authClaims,
                signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
                );
            string writtenToken = new JwtSecurityTokenHandler().WriteToken(token);
            string refreshToken = GenerateRefreshToken();

            return (writtenToken, refreshToken);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32]; // 32 bytes = 256-bit token
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
            }
            return Convert.ToBase64String(randomNumber);
        }


        public async Task<(string, string)> RefreshTokenAsync(string token, string refreshToken, UserManager<AppUser> userManager, string email)
        {
            var result = _cacheService.GetCachedData(email);
            if (result == null)
            {
                throw new Exception();
            }
            else
            {
                var RemainingTime = await _cacheService.CheckLifeTime(email);
                if (RemainingTime.HasValue)
                {
                    //StringBuilder newRefereshed = new StringBuilder("");
                    if (RemainingTime.Value < TimeSpan.FromDays(1))
                    {
                        refreshToken = GenerateRefreshToken();
                        await _cacheService.CacheData(email, refreshToken, TimeSpan.FromDays(7));
                    }
                    var newToken = RenewToken(token);
                    return (newToken, refreshToken);
                }
                else
                {
                    throw new Exception();
                }
            }
        }

        public string RenewToken(string expiredToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            // Read the expired token (without validating expiration)
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false // Ignore expiration for now
            };

            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(expiredToken, tokenValidationParameters, out securityToken);

            // Extract claims from the expired token
            var claims = principal.Claims.ToList();

            // Generate a new token with a fresh expiration time
            var newTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(30), // New expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var newToken = tokenHandler.CreateToken(newTokenDescriptor);
            return tokenHandler.WriteToken(newToken);
        }
    }
}

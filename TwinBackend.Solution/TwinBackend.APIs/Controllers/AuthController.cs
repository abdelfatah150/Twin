using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TwinBackend.APIs.DTOs;
using TwinBackend.Core.Entities;
using TwinBackend.Service.Security;

namespace TwinBackend.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtService _jwtService;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> SignUp([FromBody]SignUpDTO signUpDTO)
        {
            if (!new[] { "Developer", "Client", "Admin" }.Contains(signUpDTO.SignUpFor))
            {
                return BadRequest(new { message = "Invalid role. Allowed roles: Developer, Client, Admin" });
            }

            var existingUser = await _userManager.FindByEmailAsync(signUpDTO.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "User already exists" });
            }

            var user = new AppUser
            {
                UserName = signUpDTO.Username,
                Email = signUpDTO.Email
            };

            var result = await _userManager.CreateAsync(user, signUpDTO.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(user, signUpDTO.SignUpFor);

            var token = await _jwtService.GenerateJwtToken(user);
            return Ok(new { token });
        }
    }
}

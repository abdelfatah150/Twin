using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TwinBackend.APIs.DTOs;
using TwinBackend.Core.Entities;

namespace TwinBackend.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> SignUp(SignUpDTO signUpDTO)
        {
            var user = await _userManager.FindByEmailAsync(signUpDTO.Email);
            if (user == null)
            {
                
            }
            return BadRequest("This Email Already Resistered!");
        }
    }
}

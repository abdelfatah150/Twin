using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace TwinBackend.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtService _jwtService;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
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
                UserName = signUpDTO.FullName,
                Email = signUpDTO.Email
            };

            var result = await _userManager.CreateAsync(user, signUpDTO.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(user, signUpDTO.SignUpFor);

            //var token = await _jwtService.CreateTokenAsync(user,_userManager,2);
            return Ok("Account Created");
        }

        [HttpPost("LogIn")]
        public async Task<ActionResult> LogIn(LogInDTO model)
        {
            var check = await _userManager.FindByEmailAsync(model.Email);
            if (check == null)
            {
                return BadRequest("No Account With This Email");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(check,model.Password,false);

            if (result.Succeeded is false)
            {
                return Unauthorized();
            }

            if(check.EmailConfirmed == false)
            {
                return Unauthorized("Email Not Confirmed");
            }

            return Ok(
            {
                userName = check.UserName,
                token = await _jwtService.CreateTokenAsync(check, _userManager, 2)
            });
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Text;
using TwinBackend.Core.Entities;
using TwinBackend.Service.MainServices;

namespace TwinBackend.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtService _jwtService;
        private readonly MailService _mailService;
        private readonly IUnitOfWork unitOfWork;
        private readonly LinkGenerator _linkGenerator;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtService jwtService, MailService mailService, IUnitOfWork unitOfWork, LinkGenerator linkGenerator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _mailService = mailService;
            this.unitOfWork = unitOfWork;
            _linkGenerator = linkGenerator;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> SignUp([FromBody] SignUpDTO signUpDTO)
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

            //Create Developer/Client/Admin Instance
            if (signUpDTO.SignUpFor == "Developer")
            {
                var dev = new Developer()
                {
                    Email = signUpDTO.Email,
                    FullName = signUpDTO.FullName,
                    //BirthDate = signUpDTO.BirthDate,
                };

                foreach(var track in signUpDTO.Tracks)
                {
                    var newTrack = new DeveloperTitle()
                    {
                        Title = track
                    };

                    dev.Titles.Add(newTrack);
                }

                foreach (var skill in signUpDTO.DeveloperSkills)
                {
                    var newSkill = new DeveloperSkill()
                    {
                        Skill = skill
                    };

                    dev.Skills.Add(newSkill);
                }
                var devRepo = unitOfWork.Repository<Developer>();
                await devRepo.Add(dev);
            }
            else if(signUpDTO.SignUpFor == "Client")
            {
                var customer = new Client()
                {
                    FullName = signUpDTO.FullName,
                    //BirthDate= signUpDTO.BirthDate,
                    Email = signUpDTO.Email,
                    BussinesField = signUpDTO.Field,
                };
                var clientRepo = unitOfWork.Repository<Client>();
                await clientRepo.Add(customer);
                

            }
            else
            {
                
            }
            await unitOfWork.CompleteAsync();

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = WebUtility.UrlEncode(token);
            string subject = "Please verify your Twin email";
            //var verificationUrl = _linkGenerator.GetUriByAction(
            //    httpContext: HttpContext,  // Pass HttpContext
            //    action: "verify",          // Action Name
            //    controller: "Auth",        // Controller Name
            //    values: new { userId = user.Id, token = encodedToken },
            //    scheme: Request.Scheme,
            //    host: Request.Host
            //);
            string verificationUrl = $"{Request.Scheme}://{Request.Host}/api/Auth/verify?userId={user.Id}&token={encodedToken}";

            string body = "Click the following link to verify:" + verificationUrl;
            _mailService.sendEmail(signUpDTO.Email, subject, body);
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

            string originalToken = await _jwtService.CreateTokenAsync(check, _userManager, 2);

            Response.Headers.Append("Authorization", $"Bearer {originalToken}");

            return Ok(new
            {
                    userName = check.UserName
                    //token = Base64UrlEncoder.Encode(originalToken)
            });
        }

        [HttpGet("verify")]
        public async Task<ActionResult> verify(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("User not found");

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
                return Ok("Email confirmed successfully!");

            return BadRequest("Invalid token");
        }

        [HttpPost("SignOut")]
        public async Task<ActionResult> SignOut()
        {
            Response.Headers.Append("Authorization", "");
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}

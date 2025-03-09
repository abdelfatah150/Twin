using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TwinBackend.Core.DTOs
{
    public class SignUpDTO
    {
        [Required]
        public string SignUpFor { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [PasswordPropertyText]
        public string Password { get; set; }
        [Required]
        [PasswordPropertyText]
        [Compare("Password",ErrorMessage = "Confirm Password not Same As Password")]
        public string ConfirmPassword { get; set; }
        [Required]
        public string FullName { get; set; }
        public string? Field { get; set; }
        public List<string>? Tracks { get; set; }
        public List<string> DeveloperSkills { get; set; }
        //[Required]
        //public DateOnly BirthDate { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace TwinBackend.Core.DTOs
{
    public class ForgetPasswordDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
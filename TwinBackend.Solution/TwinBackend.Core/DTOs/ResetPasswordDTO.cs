using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TwinBackend.Core.DTOs
{
    public class ResetPasswordDTO
    {
        [Required]
        public String UserId { get; set; }

        [Required]
        public String Token { get; set; }

        [Required]
        [PasswordPropertyText]
        public string NewPassword { get; set; }
    }
}
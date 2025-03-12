using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TwinBackend.Core.DTOs
{
    public class VerifyResetTokenDTO
    {
        [Required]
        public String UserId { get; set; }

        [Required]
        public String Token { get; set; }
    }
}
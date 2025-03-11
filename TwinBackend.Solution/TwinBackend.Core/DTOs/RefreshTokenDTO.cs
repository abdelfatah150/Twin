using System.ComponentModel.DataAnnotations;

namespace TwinBackend.APIs.Controllers
{
    public class RefreshTokenDTO
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public string RefreshToken { get; set; }
    }
}
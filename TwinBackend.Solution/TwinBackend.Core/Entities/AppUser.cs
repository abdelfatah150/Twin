using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwinBackend.Core.Entities
{
    public class AppUser : IdentityUser
    {
        public string OTP {  get; set; }
        public DateTime OTPCreationTime { get; set; }
    }
}

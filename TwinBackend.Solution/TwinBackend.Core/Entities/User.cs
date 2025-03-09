using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace TwinBackend.Core.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        public string FullName { get; set; }
        public double? Rating { get; set; }
        public DateOnly? BirthDate { get; set; }

    }
}

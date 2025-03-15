using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwinBackend.Core.Entities
{
    public class DeveloperTitle
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int DeveloperId { get; set; }
        public Developer Developer { get; set; }
    }
}

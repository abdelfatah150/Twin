using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwinBackend.Core.Entities
{
    public class DeveloperSkill
    {
        public int Id { get; set; }
        public string Skill { get; set; }
        public int DeveloperId { get; set; }
        public Developer Developer { get; set; }
    }
}

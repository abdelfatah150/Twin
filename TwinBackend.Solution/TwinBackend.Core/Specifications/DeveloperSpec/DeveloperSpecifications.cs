using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Specifications.QuestionSpec;

namespace TwinBackend.Core.Specifications.DeveloperSpec
{
    public class DeveloperSpecifications : BaseSpecifications<Developer>
    {
        public DeveloperSpecifications(DeveloperSpecParams developerParams) : base(d =>
        (!string.IsNullOrEmpty(developerParams.Email)) || (d.Email == developerParams.Email)
        )
        {
            
        }
    }
}

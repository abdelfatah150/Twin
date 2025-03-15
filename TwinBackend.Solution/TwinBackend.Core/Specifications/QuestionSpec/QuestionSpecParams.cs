using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwinBackend.Core.Specifications.QuestionSpec
{
    public class QuestionSpecParams
    {
        public int? Search { get; set; }
        public string QuestionDifficulity { get; set; }
        public string QuestionCategory { get; set; }
        //public string? Include {  get; set; }
    }
}

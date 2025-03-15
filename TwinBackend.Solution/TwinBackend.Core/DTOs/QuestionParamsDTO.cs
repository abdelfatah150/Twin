using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwinBackend.Core.DTOs
{
    public class QuestionParamsDTO
    {
        public string Title { get; set; }
        public string Level { get; set; }
        public string Category { get; set; }
        public string Correct_Answer { get; set; }
        public string Choice_1 { get; set; }
        public string Choice_2 { get; set; }
        public string Choice_3 { get; set; }
        public string Choice_4 { get; set; }
    }
}

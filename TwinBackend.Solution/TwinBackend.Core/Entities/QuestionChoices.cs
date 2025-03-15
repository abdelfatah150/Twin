using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwinBackend.Core.Entities
{
    public class QuestionChoices : BaseEntity
    {
        public Question Question { get; set; }
        public string Answer { get; set; }
        public bool IsCorrect { get; set; }
    }
}

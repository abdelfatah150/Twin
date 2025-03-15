using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;

namespace TwinBackend.Core.DTOs
{
    public class QuestionChoicesDTO
    {
        //public Question Question { get; set; }
        public string Answer { get; set; }
        public bool IsCorrect { get; set; }
    }
}

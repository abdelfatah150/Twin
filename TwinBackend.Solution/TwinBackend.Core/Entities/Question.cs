using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwinBackend.Core.Entities
{
    public class Question : BaseEntity
    {
        //public int QuestionId { get; set; }
        [Required]
        public string Stem {  get; set; }
        [Required]
        public List<QuestionChoices> Answers { get; set; } = new List<QuestionChoices>();
        //[Required]
        //public string CorrectAnswer { get; set; }
        [Required]
        public double QuestionWeigth { get; set; }
        [Required]
        public string QuestionDifficulity { get; set; }
        [Required]
        public string QuestionCategory { get; set; }
    }
}

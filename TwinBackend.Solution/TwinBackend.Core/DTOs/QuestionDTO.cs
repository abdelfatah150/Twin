using System.ComponentModel.DataAnnotations;

namespace TwinBackend.Core.DTOs
{
    public class QuestionDTO
    {
        //public int QuestionId { get; set; }
        [Required]
        public string Stem {  get; set; }
        [Required]
        public List<QuestionChoicesDTO> Answers { get; set; } = new List<QuestionChoicesDTO>();
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
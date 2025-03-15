namespace TwinBackend.Core.DTOs
{
    public class UserAnswerDTO
    {
        public QuestionDTO question { get; set; }
        public string? answer { get; set; }
    }
}
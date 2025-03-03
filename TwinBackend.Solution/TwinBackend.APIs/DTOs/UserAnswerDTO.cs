namespace TwinBackend.APIs.DTOs
{
    public class UserAnswerDTO
    {
        public QuestionDTO Question { get; set; }
        public string? Answer { get; set; }
    }
}
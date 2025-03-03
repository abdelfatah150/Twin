using Microsoft.AspNetCore.Http;

namespace TwinBackend.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase{

        private readonly TechnicalTestService _TechnicalTestService;

        TestController(TechnicalTestService TechnicalTestService){
            TechnicalTestService = _TechnicalTestService;
        }

        [HttpPost("CreateSkillTest")]
        public async Task<ActionResult> CreateTest(List<string> skills){
            
            result = await _TechnicalTestService.GenerateSkillTest(List<string> skills);

            var quations = new UserDTO()
            {
                Stem = result.Stem,
                Answers = result.Answers,
                QuestionWeigth = result.QuestionWeigth,
                QuestionDifficulity = result.QuestionDifficulity,
                QuestionCategory = result.QuestionCategory
            }

            return ok(quations);
        }

        [HttpPost("CalculateScoreTest")]
        public async Task<ActionResult> CreateTest(List<UserAnswerDTO> Answers){
            
            var TestSubmition = new TestSubmitionDTO();
            TestSubmition.UsersAnswers = Answers;

            UserScore = await _TechnicalTestService.CalculateScoretest(TestSubmitionDTO TestSubmition);

            return ok(UserScore);
        }

    }
}

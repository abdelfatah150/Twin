using Microsoft.AspNetCore.Http;
using TwinBackend.Service.Services;

namespace TwinBackend.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase{

        private readonly TechnicalTestService _TechnicalTestService;

        public TestController(TechnicalTestService TechnicalTestService){
            _TechnicalTestService = TechnicalTestService;
        }

        [HttpGet("CreateSkillTest")]
        public async Task<ActionResult<List<QuestionDTO>>> CreateTest(SkillTestDTO skillTest)
        {
            var result = await _TechnicalTestService.GenerateSkillTest(skillTest.Skills);

            return Ok(result);
        }

        [HttpPost("CalculateScoreTest")]
        public async Task<ActionResult> CreateTest(TestSubmitionDTO Answers)
        {

            var UserScore = await _TechnicalTestService.CalculateScoretest(Answers);

            return Ok(new {userScore = UserScore});
        }

    }
}

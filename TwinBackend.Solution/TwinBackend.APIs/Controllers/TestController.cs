using Microsoft.AspNetCore.Http;
using TwinBackend.Core.Specifications.DeveloperSpec;
using TwinBackend.Service.Services;

namespace TwinBackend.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase{

        private readonly TechnicalTestService _TechnicalTestService;
        private readonly IGenericRepository<Developer> _developerRepository;

        public TestController(TechnicalTestService TechnicalTestService, IGenericRepository<Developer> developerRepository)
        {
            _TechnicalTestService = TechnicalTestService;
            _developerRepository = developerRepository;
        }

        [HttpGet("CreateSkillTest")]
        public ActionResult<List<QuestionDTO>> CreateTest(SkillTestDTO skillTest)
        {
            var result = _TechnicalTestService.GenerateSkillTest(skillTest.Skills).ToList();

            return Ok(result);
        }

        [HttpPost("CalculateScoreTest")]
        public async Task<ActionResult> CreateTest(TestSubmitionDTO Answers)
        {

            var UserScore = await _TechnicalTestService.CalculateScoretest(Answers);

            var param = new DeveloperSpecParams()
            {
                Email = Answers.developerEmail
            };
            var spec = new DeveloperSpecifications(param);
            var check = _developerRepository.GetAllSpecAsync(spec);

            if (check != null)
            {
                foreach (var dev in check)
                {
                    dev.SkillTestScore = UserScore;
                }
                var count = _developerRepository.SaveChanges();
                if (count > 0)
                {
                    return Ok(new { userScore = UserScore });
                }
                else
                {
                    return BadRequest("Somthing wrong at DB");
                }
            }
            else
            {
                return BadRequest("No Developer with this email");
            }

        }

    }
}

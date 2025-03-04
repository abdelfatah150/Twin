using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Repositories.Contract;
using TwinBackend.Core.Specifications.QuestionSpec;
using TwinBackend.Repository.Data.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using TwinBackend.Core.DTOs;
using AutoMapper;

namespace TwinBackend.Service.Services
{
    public class TechnicalTestService
    {
        private readonly IGenericRepository<Question> _questionRepository;
        private readonly IMapper _mapper;

        public TechnicalTestService(IGenericRepository<Question> questionRepository, IMapper mapper)
        {
            _questionRepository = questionRepository;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<QuestionDTO>> GenerateSkillTest(List<string> skills)
        {
            var testQuestions = new List<Question>();
            var QuestionsPerSkill = (6 / skills.Count) + (6 % skills.Count);
            var QuestionsPerLevel = (QuestionsPerSkill / 2) + ( QuestionsPerSkill % 2);
            foreach (var skill in skills)
            {
                var specs = new QuestionSpecParams() 
                {
                    QuestionCategory = skill
                };

                var spec = new QuestionSpecification(specs);

                var tempResult = await _questionRepository.GetAllSpecAsync(spec);

                var existingLevels = new List<string>()
                {
                    "Easy","Medium"
                };

                foreach(var item in existingLevels)
                {
                    testQuestions.AddRange(tempResult.Where(q=>q.QuestionDifficulity == item).OrderBy(q=> Guid.NewGuid()).Take(QuestionsPerLevel));
                }
            }

            var temp =  testQuestions.Take(6).ToList();
            var result = _mapper.Map<List<QuestionDTO>>(temp);

            return result;
        }
        
        public async Task<double> CalculateScoretest(TestSubmitionDTO TestSubmition){
            double UserScore = 0;

            foreach (var UserAns in TestSubmition.userAnswers)
            {            
                if (UserAns.answer != null)
                {
                    foreach (var ans in UserAns.question.Answers)
                    {
                        if (ans.Answer == UserAns.answer && ans.IsCorrect) UserScore += UserAns.question.QuestionWeigth;
                    }
                }
            }

            // Store the user score test in database

            return UserScore;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Repositories.Contract;
using TwinBackend.Core.Specifications.QuestionSpec;
using TwinBackend.Repository.Data.Repositories;

namespace TwinBackend.Service.Services
{
    public class TechnicalTestService
    {
        private readonly QuestionRepository _questionRepository;

        public TechnicalTestService(QuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public async Task<IReadOnlyList<Question>> GenerateSkillTest(List<string> skills)
        {
            var testQuestions = new List<Question>();
            var QuestionsPerSkill = 45 / skills.Count;
            var QuestionsPerLevel = QuestionsPerSkill / 3;
            foreach (var skill in skills)
            {
                var specs = new QuestionSpecParams() { QuestionCategory = skill };

                var spec = new QuestionSpecification(specs);

                var result = await _questionRepository.GetAllSpecAsync(spec);

                for (int i = 0; i < 3; i++)
                {
                    testQuestions.AddRange(result.Where(q=>q.QuestionWeigth == (i+1)).OrderBy(q=> Guid.NewGuid()).Skip(new Random().Next(0, result.Count-(QuestionsPerLevel+1))).Take(QuestionsPerLevel));
                }
            }

            return testQuestions.Take(45).ToList();
        }
    }
}

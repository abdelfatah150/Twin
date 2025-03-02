using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;

namespace TwinBackend.Core.Specifications.QuestionSpec
{
    public class QuestionSpecification : BaseSpecifications<Question>
    {
        public QuestionSpecification(QuestionSpecParams questionParams) : base(q=>
        (questionParams.Search.HasValue) || (q.Id == questionParams.Search.Value) && 
        (string.IsNullOrEmpty(questionParams.QuestionCategory)) || (q.QuestionCategory == questionParams.QuestionCategory) &&
        (string.IsNullOrEmpty(questionParams.QuestionDifficulity)) || (q.QuestionDifficulity == questionParams.QuestionDifficulity)
        ) 
        {
        }
    }
}

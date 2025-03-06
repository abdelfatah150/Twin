using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwinBackend.Core.Entities;
using TwinBackend.Core.Specifications;

namespace TwinBackend.Repository
{
    public static class SpecificationEvaluator<T> where T : BaseEntity
    {
        public static IEnumerable<T> GetSpecItems(IQueryable<T> innerQuery, ISpecifications<T> specifications)
        {
            var query = innerQuery;

            if (specifications.Criteria != null)
            {
                query = query.Where(specifications.Criteria);
            }

            if(specifications.OrderBy != null)
            {
                query = query.OrderBy(specifications.OrderBy);
            }

            if (specifications.OrderByDescending != null)
            {
                query = query.OrderByDescending(specifications.OrderByDescending);
            }

            if (specifications.IsPaginationEnabled == true)
            {
                query = query.Skip(specifications.Skip).Take(specifications.Take);
            }

            query = specifications.Includes.Aggregate(query, (current, next) => current.Include(next));

            return query;
        }
    }
}

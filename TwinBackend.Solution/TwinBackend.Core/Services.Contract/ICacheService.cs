using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwinBackend.Core.Services.Contract
{
    public interface ICacheService
    {
        Task CacheData(string CacheKey,  object CacheValue, TimeSpan ExpirationTime);
        Task<string> GetCachedData(string CacheKey);
        Task<bool> DeleteCacheData(string CacheKey);
        Task<TimeSpan?> CheckLifeTime(string CacheKey);
    }
}

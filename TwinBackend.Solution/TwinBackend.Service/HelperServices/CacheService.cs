using Org.BouncyCastle.Bcpg.OpenPgp;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TwinBackend.Core.Services.Contract;

namespace TwinBackend.Service.HelperServices
{
    public class CacheService : ICacheService
    {
        private readonly IDatabase _database;
        public CacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }
        public async Task CacheData(string CacheKey, object CacheValue, TimeSpan ExpirationTime)
        {
            if (CacheValue == null) return;

            var serializedData = JsonSerializer.Serialize(CacheValue);
            await _database.StringSetAsync(CacheKey, serializedData, ExpirationTime);

        }

        public async Task<TimeSpan?> CheckLifeTime(string CacheKey)
        {
            return await _database.KeyTimeToLiveAsync(CacheKey);
        }

        public async Task<bool> DeleteCacheData(string CacheKey)
        {
            var result = await _database.KeyDeleteAsync(CacheKey);
            if (result == false) return false;
            return true;
        }

        public async Task<string> GetCachedData(string CacheKey)
        {
            return await _database.StringGetAsync(CacheKey);
        }

        
    }
}

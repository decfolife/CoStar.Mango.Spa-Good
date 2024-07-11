using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.Json.Serialization;
using MangoSPA.Extensions;

namespace MangoSPA.Services;

public interface ICacheService
{
    Task<T> GetOrCreateAsync<T>(
        string key,
        Func<Task<T>> factory,
        bool hasNoExpiration = false,
        TimeSpan? absExpiration = null,
        TimeSpan? slideExpiration = null);
    Task<byte[]> GetAsync(string key);
    Task SetAsync(string cacheKey, byte[] data, DistributedCacheEntryOptions options);
    Task<bool> RemoveAsync(string key, CancellationToken token = default);
    Task<T> GetDataAsync<T>(string key);
    Task SetDataAsync<T>(
        string key,
        T data,
        TimeSpan? absExpiration = null,
        bool hasNoExpiration = false,
        TimeSpan? slideExpiration = null);
}

public class CacheService : ICacheService
{
    const string ReachWarning = "Cannot reach the cache.";

    readonly IDistributedCache _cache;
    readonly ILogger<CacheService> _logger;
    readonly bool _isCacheEnabled;

    readonly JsonSerializerOptions _jsonOptions = new()
    {
        ReferenceHandler = ReferenceHandler.IgnoreCycles
    };

    public CacheService(IDistributedCache cache, IConfiguration config, ILogger<CacheService> logger)
    {
        _cache = cache;
        _logger = logger;
        _isCacheEnabled = config.EnableCaching();
    }

    public async Task<T> GetOrCreateAsync<T>(
        string key, 
        Func<Task<T>> factory,
        bool hasNoExpiration = false,
        TimeSpan? absExpiration = null,
        TimeSpan? slideExpiration = null)
    {
        if (!_isCacheEnabled) return default;

        try
        {
            var cachedData = await _cache.GetStringAsync(key);
            if (!string.IsNullOrWhiteSpace(cachedData))
                return JsonSerializer.Deserialize<T>(cachedData);

            var data = await factory();

            var cacheOptions = new DistributedCacheEntryOptions
            {
                // Remove item from cache after duration
                AbsoluteExpirationRelativeToNow = absExpiration is null && hasNoExpiration ? null : TimeSpan.FromDays(1),

                // Remove item from cache if unsued for the duration
                SlidingExpiration = slideExpiration
            };

            var settings = new JsonSerializerOptions().UseDefaultSettings();
            string jsonData = JsonSerializer.Serialize(data, settings);

            await _cache.SetStringAsync(key, jsonData, cacheOptions);

            return data;
        }
        catch (Exception)
        {
            _logger.LogWarning(ReachWarning);
            return default;
        }
    }

    public async Task<T> GetDataAsync<T>(string key)
    {
        if (!_isCacheEnabled) return default;

        try
        {
            string data = await _cache.GetStringAsync(key);
            return string.IsNullOrWhiteSpace(data) ? default : JsonSerializer.Deserialize<T>(data);
        }
        catch (Exception)
        {
            _logger.LogWarning(ReachWarning);
            return default;
        }
    }

    public async Task SetDataAsync<T>(
        string key, 
        T data,
        TimeSpan? absExpiration = null,
        bool hasNoExpiration = false,
        TimeSpan? slideExpiration = null)
    {
        if (!_isCacheEnabled) return;

        try
        {
            var options = new DistributedCacheEntryOptions
            {
                // Remove item from cache after duration
                AbsoluteExpirationRelativeToNow = absExpiration is null && hasNoExpiration ? null : TimeSpan.FromDays(1),

                // Remove item from cache if unsued for the duration
                SlidingExpiration = slideExpiration
            };

            string jsonData = JsonSerializer.Serialize(data, _jsonOptions);

            await _cache.RemoveAsync(key);
            await _cache.SetStringAsync(key, jsonData, options);
        }
        catch (Exception)
        {
            _logger.LogWarning(ReachWarning);
        }
    }

    public async Task<string> GetStringAsync(string key, CancellationToken token = default)
    {
        if (!_isCacheEnabled) return default;

        try
        {
            return await _cache.GetStringAsync(key, token: token);
        }
        catch (Exception)
        {
            _logger.LogWarning(ReachWarning);
            return default;
        }
    }

    public async Task SetCacheStringAsync(
        string key, 
        string data,
        TimeSpan? absExpiration = null,
        bool hasNoExpiration = false,
        TimeSpan? slideExpiration = null)
    {
        if (!_isCacheEnabled) return;


        try
        {
            var options = new DistributedCacheEntryOptions
            {
                // Remove item from cache after duration
                AbsoluteExpirationRelativeToNow = absExpiration is null && hasNoExpiration ? null : TimeSpan.FromDays(1),

                // Remove item from cache if unsued for the duration
                SlidingExpiration = slideExpiration
            };

            await _cache.RemoveAsync(key);
            await _cache.SetStringAsync(key, data, options);
        }
        catch (Exception)
        {
            _logger.LogWarning(ReachWarning);
        }
    }

    public async Task<byte[]> GetAsync(string key)
    {
        if (!_isCacheEnabled) return default;

        try
        {
            var data = await _cache.GetAsync(key);
            return data;
        }
        catch (Exception)
        {
            _logger.LogWarning(ReachWarning);
            return default;
        }
    }

    public async Task SetAsync(string key, byte[] data, DistributedCacheEntryOptions options)
    {
        if (!_isCacheEnabled) return;

        try
        {
            await _cache.RemoveAsync(key);
            await _cache.SetAsync(key, data, options);
        }
        catch (Exception)
        {
            _logger.LogWarning(ReachWarning);
        }
    }

    public async Task<bool> RemoveAsync(string key, CancellationToken token = default)
    {
        if (!_isCacheEnabled) return false;

        try
        {
            await _cache.RemoveAsync(key, token);
            return true;
        }
        catch (Exception)
        {
            _logger.LogWarning(ReachWarning);
            return false;
        }
    }
}

using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MangoSPA.Extensions;

public static class CacheExtensions
{
    public static async Task<T> GetOrCreateAsync<T>(
        this IDistributedCache cache,
        string key,
        Func<Task<T>> factory,
        TimeSpan? absExpiration = null,
        TimeSpan? slideExpiration = null)
    {
        var cachedData = await cache.GetStringAsync(key);
        if (!string.IsNullOrWhiteSpace(cachedData))
            return JsonSerializer.Deserialize<T>(cachedData);

        var data = await factory();

        var cacheOptions = new DistributedCacheEntryOptions
        {
            // Remove item from cache after duration
            AbsoluteExpirationRelativeToNow = absExpiration ?? TimeSpan.FromDays(1),

            // Remove item from cache if unsued for the duration
            SlidingExpiration = slideExpiration
        };

        var settings = new JsonSerializerOptions().UseDefaultSettings();
        string jsonData = JsonSerializer.Serialize(data, settings);

        await cache.SetStringAsync(key, jsonData, cacheOptions);

        return data;
    }

    public static async Task<T> GetDataAsync<T>(this IDistributedCache cache, string key)
    {
        try
        {
            string data = await cache.GetStringAsync(key);
            return string.IsNullOrWhiteSpace(data) ? default : JsonSerializer.Deserialize<T>(data);
        }
        catch (Exception)
        {
            return default;
        }
    }

    public static async Task SetDataAsync<T>(
        this IDistributedCache cache, 
        string key, 
        T data,
        TimeSpan? absExpiration = null,
        TimeSpan? slideExpiration = null)
    {
        try
        {
            var options = new DistributedCacheEntryOptions
            {
                // Remove item from cache after duration
                AbsoluteExpirationRelativeToNow = absExpiration ?? TimeSpan.FromDays(1),

                // Remove item from cache if unsued for the duration
                SlidingExpiration = slideExpiration
            };

            var settings = new JsonSerializerOptions().UseDefaultSettings();
            string jsonData = JsonSerializer.Serialize(data, settings);

            await cache.RemoveAsync(key);
            await cache.SetStringAsync(key, jsonData, options);
        }
        catch (Exception) { }
    }
}

public static class JsonSerializerExtensions
{
    public static JsonSerializerOptions UseDefaultSettings(this JsonSerializerOptions options)
    {
        options ??= new JsonSerializerOptions();
        options.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        return options;
    }
}
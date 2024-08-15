using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace MangoSPA.Extensions;

public static class SessionExtensions
{
    public static async Task<T> GetAsync<T>(this ISession session, string key)
    {
        if (!session.IsAvailable)
            await session.LoadAsync();

        var value = session.GetString(key);
        return value is null ? default : JsonSerializer.Deserialize<T>(value);
    }

    public static async Task SetAsync<T>(this ISession session, string key, T value)
    {
        if (!session.IsAvailable)
            await session.LoadAsync();

        session.SetString(key, JsonSerializer.Serialize(value));
    }

    public static async Task RemoveAsync(this ISession session, string key)
    {
        if (!session.IsAvailable)
            await session.LoadAsync();

        session.Remove(key);
    }
}

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using MangoSPA.Services;
using System.Collections.Generic;
using MangoSPA.Models;

namespace MangoSPA;

public class SessionStore : ITicketStore
{
    readonly ICacheService _cache;

    public SessionStore(ICacheService cache)
    {
        _cache = cache;
    }

    public async Task<string> StoreAsync(AuthenticationTicket ticket)
    {
        var key = $"{CacheKeys.AuthSesssionKeyPrefix}{Guid.NewGuid()}";
        await RenewAsync(key, ticket);
        return key;
    }

    public async Task RenewAsync(string key, AuthenticationTicket ticket)
    {
        var options = new DistributedCacheEntryOptions();

        var expiresUtc = ticket.Properties.ExpiresUtc;
        if (expiresUtc.HasValue)
            options.SetAbsoluteExpiration(expiresUtc.Value);

        byte[] val = SerializeToBytes(ticket);
        await _cache.SetAsync(key, val, options);

        await TrackAllUserSessions(key);
    }

    public async Task<AuthenticationTicket> RetrieveAsync(string key)
    {
        byte[] bytes = await _cache.GetAsync(key);
        AuthenticationTicket ticket = DeserializeFromBytes(bytes);
        return ticket;
    }

    public async Task RemoveAsync(string key)
    {
        await _cache.RemoveAsync(key);

        var sessions = await _cache.GetDataAsync<HashSet<string>>(CacheKeys.AuthSesssionsKey);
        if (sessions is null) return;

        var wasDeleted = sessions.Remove(key);
        if (wasDeleted)
            await _cache.SetDataAsync(CacheKeys.AuthSesssionsKey, sessions, hasNoExpiration: true);
    }

    // As an alternative, we can remove this session tracking function and instead use the Redis ConnectionMultiplexer
    // within the GetActiveSessions endpoint
    // e.g. var keys = server.Keys(pattern: $"{CacheKeys.AuthSesssionKeyPrefix}*").ToArray();
    private async Task TrackAllUserSessions(string key)
    {
        var sessions = await _cache.GetDataAsync<HashSet<string>>(CacheKeys.AuthSesssionsKey);
        if (sessions is null)
        {
            await _cache.SetDataAsync<HashSet<string>>(CacheKeys.AuthSesssionsKey, [key], hasNoExpiration: true);
            return;
        }

        var wasAdded = sessions.Add(key);
        if (wasAdded)
            await _cache.SetDataAsync(CacheKeys.AuthSesssionsKey, sessions, hasNoExpiration: true);
    }

    private static byte[] SerializeToBytes(AuthenticationTicket source)
    {
        return TicketSerializer.Default.Serialize(source);
    }

    private static AuthenticationTicket DeserializeFromBytes(byte[] source)
    {
        return source is null ? null : TicketSerializer.Default.Deserialize(source);
    }
}
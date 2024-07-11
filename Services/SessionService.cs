using MangoSPA.Extensions;
using MangoSPA.Models;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace MangoSPA.Services;

public interface ISessionService
{
    Task<List<UserAuthSession>> GetActiveSessionsAsync();
    Task<List<UserAuthSession>> GetActiveSessionsForUserAsync(string email);
    Task DeleteActiveSessionAsync(string sessionId);
    Task DeleteActiveSessionsForUserAsync(string email);
}

public class SessionService : ISessionService
{
    readonly ITicketStore _authSessionStore;
    readonly ICacheService _cacheService;

    public SessionService(ITicketStore ticketStore, ICacheService cacheService)
    {
        _authSessionStore = ticketStore;
        _cacheService = cacheService;
    }

    public async Task<List<UserAuthSession>> GetActiveSessionsAsync()
    {
        var sessions = await _cacheService.GetDataAsync<HashSet<string>>(CacheKeys.AuthSesssionsKey);

        var userSessions = new List<UserAuthSession>();
        foreach (var sessionId in sessions)
        {
            var ticket = await _authSessionStore.RetrieveAsync(sessionId);
            if (ticket is null || ticket.Principal is null) 
            {
                var wasDeleted = sessions.Remove(sessionId);
                if (wasDeleted)
                    await _cacheService.SetDataAsync(CacheKeys.AuthSesssionsKey, sessions, hasNoExpiration: true);

                continue;
            }

            var user = ticket.Principal.ToAuthenticatedUser();

            var session = new UserAuthSession
            {
                SessionId = sessionId,
                User = user,
                ExpiresUtc = ticket.Properties.ExpiresUtc,
                OS = ticket.Properties.Items.TryGetValue("os", out string osName) ? osName : null,
                Browser = ticket.Properties.Items.TryGetValue("browser", out string browser) ? browser : null,
            };

            userSessions.Add(session);
        }

        return userSessions;
    }

    public async Task<List<UserAuthSession>> GetActiveSessionsForUserAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return null;

        var sessions = await _cacheService.GetDataAsync<HashSet<string>>(CacheKeys.AuthSesssionsKey);

        var userSessions = new List<UserAuthSession>();
        foreach (var sessionId in sessions)
        {
            var ticket = await _authSessionStore.RetrieveAsync(sessionId);
            if (ticket is null || ticket.Principal is null)
            {
                var wasDeleted = sessions.Remove(sessionId);
                if (wasDeleted)
                    await _cacheService.SetDataAsync(CacheKeys.AuthSesssionsKey, sessions, hasNoExpiration: true);

                continue;
            }

            var user = ticket.Principal.ToAuthenticatedUser();

            if (!user.Email.Equals(email, StringComparison.OrdinalIgnoreCase))
                continue;

            var session = new UserAuthSession
            {
                SessionId = sessionId,
                User = user,
                ExpiresUtc = ticket.Properties.ExpiresUtc,
                OS = ticket.Properties.Items.TryGetValue("os", out string osName) ? osName : null,
                Browser = ticket.Properties.Items.TryGetValue("browser", out string browser) ? browser : null,
            };

            userSessions.Add(session);
        }

        return userSessions;
    }

    public async Task DeleteActiveSessionAsync(string sessionId)
    {
        if (string.IsNullOrWhiteSpace(sessionId))
            return;

        await _authSessionStore.RemoveAsync(sessionId);
    }

    public async Task DeleteActiveSessionsForUserAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return;

        var sessions = await _cacheService.GetDataAsync<HashSet<string>>(CacheKeys.AuthSesssionsKey);

        foreach (var sessionId in sessions)
        {
            var ticket = await _authSessionStore.RetrieveAsync(sessionId);
            if (ticket is null || ticket.Principal is null)
            {
                var wasDeleted = sessions.Remove(sessionId);
                if (wasDeleted)
                    await _cacheService.SetDataAsync(CacheKeys.AuthSesssionsKey, sessions, hasNoExpiration: true);

                continue;
            }

            var user = ticket.Principal.ToAuthenticatedUser();

            if (!user.Email.Equals(email, StringComparison.OrdinalIgnoreCase))
                continue;

            await _authSessionStore.RemoveAsync(sessionId);
        }
    }
}

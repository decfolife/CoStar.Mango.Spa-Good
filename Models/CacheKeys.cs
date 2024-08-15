namespace MangoSPA.Models;

public static class CacheKeys
{
    public const string AuthSesssionKeyPrefix = "AuthSession_";
    public const string AuthSesssionsKey = "AuthSessions";

    //public static CacheKey UserSessionData(string key)
    //    => new($"sessionData_{key}", TimeSpan.FromHours(8));
}
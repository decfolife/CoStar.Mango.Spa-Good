using MangoSPA.Enums;
using MangoSPA.Models;
using System.Security.Claims;
using static MangoSPA.Constants;

namespace MangoSPA.Extensions;

public static class ClaimExtensions
{
    public static string Email(this ClaimsPrincipal principal)
    {
        var email = principal.Claims?
            .FirstOrDefault(x => x.Type == ClaimTypes.Email || x.Type == ClaimType.Email)
            ?.Value ?? string.Empty;

        return email;
    }

    public static int UserId(this ClaimsPrincipal principal)
        => int.TryParse(principal.FindFirst(ClaimType.UserId)?.Value, out int result) ? result : default;

    public static int ContactId(this ClaimsPrincipal principal)
        => int.TryParse(principal.FindFirst(ClaimType.ContactId)?.Value, out int result) ? result : default;

    public static string ContactRole(this ClaimsPrincipal principal)
        => principal.FindFirst(ClaimType.ContactRole)?.Value;

    public static string ClientKey(this ClaimsPrincipal principal)
        => principal.FindFirst(ClaimType.ClientKey)?.Value;

    public static int SecurityLevel(this ClaimsPrincipal principal)
        => int.TryParse(principal.FindFirst(ClaimType.SecurityLevel)?.Value, out int result) ? result : default;

    public static bool IsAutoProvisioned(this ClaimsPrincipal principal)
        => bool.TryParse(principal.FindFirst(ClaimType.IsAutoProvisioned)?.Value, out bool result) && result;

    public static string AccessToken(this ClaimsPrincipal principal)
        => principal.FindFirst(ClaimType.AccessToken)?.Value ?? string.Empty;

    public static bool IsSecurityLevel2(this ClaimsPrincipal principal)
    {
        var securityLevel = principal.SecurityLevel();
        return securityLevel == 2;
    }

    public static bool IsAdminOrSuperUserContact(this ClaimsPrincipal principal)
    {
        var contactRole = principal.ContactRole()?.ToLower();
        if (contactRole == "superuser" || contactRole == "admin")
            return true;

        return false;
    }

    public static bool IsSuperUserContact(this ClaimsPrincipal principal)
    {
        var contactRole = principal.ContactRole()?.ToLower();
        if (int.TryParse(contactRole, out int role))
        {
            if (role == (int)UserRoleType.SuperUser || role == (int)UserRoleType.Admin)
                return true;
        } 
        else
        {
            if (contactRole == "superuser" || contactRole == "admin")
                return true;
        }

        return false;
    }

    public static AuthenticatedUser ToAuthenticatedUser(this ClaimsPrincipal principal)
    {
        return new AuthenticatedUser
        {
            UserId = principal.UserId(),
            Email = principal.Email(),
            ContactId = principal.ContactId(),
            ClientKey = principal.ClientKey(),
            IsAutoProvisioned = principal.IsAutoProvisioned(),
            IsRemUser = principal.SecurityLevel() > -1
        };
    }

    public static string FindClaim(this ClaimsPrincipal principal, string claimType)
        => principal.Claims?.FirstOrDefault(x => x.Type == claimType)?.Value ?? string.Empty;

    public static string FindClaim(this IEnumerable<Claim> claims, string claimType)
        => claims?.FirstOrDefault(x => x.Type == claimType)?.Value ?? string.Empty;

    //public static string SessionId(this ClaimsPrincipal principal)
    //{
    //    var sessionIdentity = principal.Identities
    //        .FirstOrDefault(x => x.AuthenticationType == "Session");

    //    if (sessionIdentity is null) return null;

    //    string sessionId = sessionIdentity.Claims
    //        .FindClaim(ClaimType.SessionId)
    //        .Split(AuthSesssionKeyPrefix)
    //        .LastOrDefault();

    //    return sessionId;
    //}
}

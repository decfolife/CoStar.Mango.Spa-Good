using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using static MangoSPA.Constants;

namespace MangoSPA;

/// <summary>
/// The following classes were copied from the CentralAuth reporsitory > 'Shared' library project
/// </summary>
public class Constants
{
    public class ClaimType
    {
        public const string TrackingId = JwtRegisteredClaimNames.Jti;
        public const string Email = JwtRegisteredClaimNames.Email;
        public const string UserId = "userId";
        public const string ContactId = "contactId";
        public const string ContactRole = "contactRole";
        public const string ClientKey = "clientKey";
        public const string SecurityLevel = "securityLevel";
        public const string IsAutoProvisioned = "isAutoProvisioned";
        public const string AccessToken = "token";

        // Indicates whether /login endpoint or /token endpoint was used to generate a JWT token
        public const string IsInternal = "isInternal";
    }
}

public static class ClaimExtensions
{
    public static string Email(this ClaimsPrincipal principal)
        => principal.FindFirst(ClaimTypes.Email)?.Value ?? string.Empty;

    //public static string Email(this ClaimsPrincipal principal)
    //{
    //    var email = principal.FindFirst(ClaimTypes.Email)?.Value ?? string.Empty;
    //    if (string.IsNullOrWhiteSpace(email))
    //        email = principal.FindFirst(ClaimType.Email)?.Value ?? string.Empty;

    //    return email;
    //}

    public static int ContactId(this ClaimsPrincipal principal)
        => int.TryParse(principal.FindFirst(ClaimType.ContactId).Value, out int result) ? result : default;

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
        var securityLevel = SecurityLevel(principal);
        return securityLevel == 2;
    }

    public static bool IsAdminOrSuperUserContact(this ClaimsPrincipal principal)
    {
        var contactRole = ContactRole(principal)?.ToLower();
        if (contactRole == "superuser" || contactRole == "admin")
            return true;

        return false;
    }

    public static string FindClaim(this ClaimsPrincipal principal, string claimType)
        => principal.Claims?.FirstOrDefault(x => x.Type == claimType)?.Value ?? string.Empty;

    public static string FindClaim(this IEnumerable<Claim> claims, string claimType)
        => claims?.FirstOrDefault(x => x.Type == claimType)?.Value ?? string.Empty;
}

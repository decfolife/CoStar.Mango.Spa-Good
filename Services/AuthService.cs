using MangoSPA.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Threading.Tasks;
using static MangoSPA.Constants;

namespace MangoSPA.Services;

public interface IAuthService
{
    Task<LoginResponse> Login(LoginRequest request);
    Task<LoginToClientResponse> LoginToClient(LoginToClientRequest request);
    Task<AccessTokenResponse> OAuthToken(AccessTokenRequest request);
}

public class AuthService : IAuthService
{
    readonly IHttpClientFactory _clientFactory;
    readonly IHttpContextAccessor _httpContextAccessor;
    readonly ILogger<AuthService> _logger;

    public AuthService(
        IHttpClientFactory clientFactory,
        IHttpContextAccessor httpContextAccessor,
        ILogger<AuthService> logger)
    {
        _clientFactory = clientFactory;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<LoginResponse> Login(LoginRequest request)
    {
        var client = _clientFactory.CreateClient("identity-api");

        var response = await client.PostAsJsonAsync("auth/login", request);
        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            _logger.LogError("Login request failed. {StatusCode} {Error}", response.IsSuccessStatusCode, error);
            return null;
        }

        var result = await response.Content.ReadFromJsonAsync<LoginResponse>();

        // Do not create auth cookie for client specific login page. Only for general login page.
        if (!string.IsNullOrWhiteSpace(request.ClientKey))
            return result;

        await CreateAuthenticationCookie(result.AuthToken);

        return result;
    }

    public async Task<LoginToClientResponse> LoginToClient(LoginToClientRequest request)
    {
        var client = _clientFactory.CreateClient("identity-api");

        var response = await client.PostAsJsonAsync("auth/login/client", request);
        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            _logger.LogError("Login request failed. {StatusCode} {Error}", response.IsSuccessStatusCode, error);
            return null;
        }

        var result = await response.Content.ReadFromJsonAsync<LoginToClientResponse>();

        await CreateAuthenticationCookie(result.AuthToken);

        return result;
    }

    public async Task<AccessTokenResponse> OAuthToken(AccessTokenRequest request)
    {
        var client = _clientFactory.CreateClient("identity-api");

        var response = await client.PostAsJsonAsync("oauth/token", request);
        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            _logger.LogError("AccessToken request failed. {StatusCode} {Error}", response.IsSuccessStatusCode, error);
            return null;
        }

        var result = await response.Content.ReadFromJsonAsync<AccessTokenResponse>();

        await CreateAuthenticationCookie(result.AccessToken);

        return result;
    }

    private async Task CreateAuthenticationCookie(string accessToken)
    {
        JwtSecurityToken token = new JwtSecurityTokenHandler().ReadJwtToken(accessToken);
        var claims = new List<Claim>(token.Claims) { new(ClaimType.AccessToken, accessToken) };

        var userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var userPrincipal = new ClaimsPrincipal(userIdentity);

        await _httpContextAccessor.HttpContext.SignInAsync(userPrincipal,
               new AuthenticationProperties
               {
                   IsPersistent = true
               });
    }
}

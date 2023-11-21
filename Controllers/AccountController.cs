using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using MangoSPA;
using MangoSPA.Models;

namespace Mango.MangoSPA.Server.Controllers;

public class AccountController : ControllerBase
{
    readonly IHttpClientFactory _clientFactory;
    readonly ILogger<AccountController> _logger;

    public AccountController(IHttpClientFactory clientFactory, ILogger<AccountController> logger)
    {
        _clientFactory = clientFactory;
        _logger = logger;
    }

    /// <summary>
    /// Calls Identity API which generates an accessToken (JWT) using the current logged in user's claims
    /// Then creates an http-only cookie to keep the user logged-in
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost("~/oauth/token")] //oauth/token   
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<AccessTokenResponse>> AccessToken([FromBody] AccessTokenRequest request)
    {
        _logger.LogInformation("AccessToken request started. Calling Identity API to get access token.");

        var client = _clientFactory.CreateClient("identity-api");

        var response = await client.PostAsJsonAsync("oauth/token", request);
        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            _logger.LogError("AccessToken request failed. {StatusCode} {Error}", response.IsSuccessStatusCode, error);
            return Unauthorized(error);
        }

        var result = await response.Content.ReadFromJsonAsync<AccessTokenResponse>();

        _logger.LogInformation("Identity API responded successfully with access token. Generating http-only session cookie.");

        JwtSecurityToken token = new JwtSecurityTokenHandler().ReadJwtToken(result.AccessToken);
        var claims = new List<Claim>(token.Claims) { new("token", result.AccessToken) };

        var userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var userPrincipal = new ClaimsPrincipal(userIdentity);

        await HttpContext.SignInAsync(userPrincipal, 
            new AuthenticationProperties
            {
                ExpiresUtc = token.ValidTo
            });

        _logger.LogInformation("AccessToken request completed successfully.");

        return Ok(result);
    }

    /// <summary>
    /// Get the current logged-in user JWT token
    /// </summary>
    /// <returns></returns>
    [Authorize]
    [HttpGet("user/token")] //account/user/token
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult<string> AccessToken()
    {
        _logger.LogInformation("AccessToken request started for logged-in user {Email}.", User.Email());

        var token = User.AccessToken();
        if (string.IsNullOrWhiteSpace(token))
        {
            _logger.LogError("Logged in user {Email} does not have an access token (JWT).", User.Email());
            return Unauthorized();
        }

        _logger.LogInformation("AccessToken request completed successfully for logged-in user {Email}.", User.Email());

        return Ok(token);
    }

    [HttpPost("logout")] //account/logout   
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Logout()
    {
        await HttpContext.SignOutAsync();
        return Ok();
        //return LocalRedirect(Url.Content("~/"));
    }
}


using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using MangoSPA.Models;
using MangoSPA.Services;
using MangoSPA.Extensions;
using Microsoft.AspNetCore.Hosting;

namespace Mango.MangoSPA.Server.Controllers;

[Route("[controller]")]
public class AuthController : ControllerBase
{
    readonly IAuthService _authService;
    readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    /// <summary>
    /// Calls Identity API to get accessToken (JWT).
    /// Then logs the user in using an authentication cookie.
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost("~/oauth/token")] //api/oauth/token  
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<OAuthResponse>> AccessToken([FromBody] AccessTokenRequest request)
    {
        _logger.LogInformation("AccessToken request started. Calling Identity API to get access token.");

        var tokenResponse = await _authService.OAuthToken(request);
        if (tokenResponse is null) return Unauthorized();

        // If source has a value, there is no need to generate an auth code for V06.
        if (!string.IsNullOrWhiteSpace(request.Source) && request.Source.Equals("v06", StringComparison.OrdinalIgnoreCase)) 
        {
            await _authService.CreateAuthenticationCookie(tokenResponse.AccessToken);
            _logger.LogInformation("AccessToken request completed successfully.");

            return Ok(new OAuthResponse
            {
                AccessToken = tokenResponse.AccessToken,
                RedirectUri = request.RedirectUri
            });
        }

        _logger.LogInformation("Calling Identity API to get generate an auth code for V06.");

        // Generate a new authCode for V06 so it can use it fetch the JWT
        var authorizeResponse = await _authService.OAuthAuthorize(tokenResponse.AccessToken, request.RedirectUri);
        if (authorizeResponse is null) return Unauthorized();

        await _authService.CreateAuthenticationCookie(tokenResponse.AccessToken);

        var result = new OAuthResponse
        {
            AccessToken = tokenResponse.AccessToken,  
            Code = authorizeResponse.Code,
            RedirectUri = authorizeResponse.RedirectUri
        };

        _logger.LogInformation("AccessToken request completed successfully.");

        return Ok(result);
    }

    /// <summary>
    /// Used for LOCAL testing only.
    /// </summary>
    /// <param name="accessToken"></param>
    /// <param name="env"></param>
    /// <returns></returns>
    [ApiExplorerSettings(IgnoreApi = true)]
    [HttpPost("login")] //auth/login  
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<OAuthResponse>> Login(
        [FromBody] string accessToken,
        [FromServices] IWebHostEnvironment env)
    {
        if (!env.IsLocal())
            return BadRequest("Only allowed in LOCAL.");

        await HttpContext.SignOutAsync();

        _logger.LogInformation("login request started.");
        await _authService.CreateAuthenticationCookie(accessToken);
        _logger.LogInformation("login request completed successfully.");

        return Ok();
    }

    /// <summary>
    /// Get the current logged-in user.
    /// </summary>
    /// <returns></returns>
    [Authorize]
    [HttpGet("user/token")] //auth/user/token
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult<AuthenticatedUser> GetCurrentUser()
    {
        _logger.LogInformation("Fetching accessToken for logged-in user {Email}.", User.Email());

        var user = User.ToAuthenticatedUser();

        _logger.LogInformation("Successfully fetched accessToken for logged-in user {Email}.", User.Email());

        return Ok(user);
    }

    [HttpPost("logout")] //auth/logout   
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Logout()
    {
        await HttpContext.SignOutAsync();
        return Ok();
        //return LocalRedirect(Url.Content("~/"));
    }
}
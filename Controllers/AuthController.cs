using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using MangoSPA;
using MangoSPA.Models;
using MangoSPA.Services;
using System;

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
    /// Then creates an authentication cookie to keep the user logged-in
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
    /// Creates an authentication cookie to keep the user logged-in to CREM
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    //[HttpPost("login")] //api/auth/login      
    //[ProducesResponseType(StatusCodes.Status401Unauthorized)]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult> Login([FromBody] LoginRequest request)
    //{
    //    await HttpContext.SignOutAsync();

    //    _logger.LogInformation("Login request started. Calling Identity API to get access token.");

    //    var result = await _authService.Login(request);
    //    if (result is null) return Unauthorized();

    //    _logger.LogInformation("Login request successfully completed.");

    //    return Ok(result);
    //}

    // Need Authorization on this endpoint. Just do Cookie Auth? maybe JWT auth too so v06 can call this endpoint using the JWT
    /// <summary>
    /// Creates an authentication cookie to keep the user logged-in to CREM
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    //[Authorize]
    //[HttpPost("login/client")] //api/auth/login/client     
    //[ProducesResponseType(StatusCodes.Status401Unauthorized)]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
    //public async Task<ActionResult> LoginToClient([FromBody] LoginToClientRequest request)
    //{
    //    _logger.LogInformation("Login to client request started. Calling Identity API to get access token.");

    //    var result = await _authService.LoginToClient(request);
    //    if (result is null) return Unauthorized();

    //    _logger.LogInformation("Login to client request successfully completed.");

    //    return Ok(result);
    //}

    /// <summary>
    /// Get the current logged-in user JWT token
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

        var token = User.AccessToken();
        if (string.IsNullOrWhiteSpace(token))
        {
            _logger.LogError("Logged in user {Email} does not have an access token (JWT).", User.Email());
            return Unauthorized();
        }

        _logger.LogInformation("Successfully fetched accessToken for logged-in user {Email}.", User.Email());

        return Ok(token);
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
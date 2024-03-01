using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using MangoSPA;
using MangoSPA.Models;
using MangoSPA.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using static MangoSPA.Constants;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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
    public async Task<ActionResult<AccessTokenResponse>> AccessToken([FromBody] AccessTokenRequest request)
    {
        _logger.LogInformation("AccessToken request started. Calling Identity API to get access token.");

        var result = await _authService.OAuthToken(request);
        if (result is null) return Unauthorized();

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
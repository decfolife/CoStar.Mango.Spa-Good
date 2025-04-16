using MangoSPA.Extensions;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using static MangoSPA.Constants;

namespace MangoSPA.Middleware;


/// <summary>
/// Yarp already logs by default so we are not explicitly logging here.
/// </summary>
public class YarpExceptionHandler
{
    readonly RequestDelegate _next;
    readonly ProblemDetailsFactory _problemFactory;
    readonly IWebHostEnvironment _env;

    public YarpExceptionHandler(
        RequestDelegate next, 
        ProblemDetailsFactory problemFactory,
        IWebHostEnvironment env)
    {
        _next = next;
        _problemFactory = problemFactory;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        await _next(context);

        var errorFeature = context.GetForwarderErrorFeature();
        if (errorFeature is not null)
        {
            int statusCode = StatusCodes.Status500InternalServerError;
            string errorCode = "INTERNAL_ERROR";

            var exception = errorFeature.Exception;
            if (exception is AntiforgeryValidationException)
            {
                statusCode = StatusCodes.Status400BadRequest;
                errorCode = "XSRF_ERROR";
            }

            var problem = _problemFactory.CreateProblemDetails(context, statusCode);
            problem.Extensions["message"] = exception.Message;
            problem.Extensions["errorCode"] = errorCode;
            problem.Extensions["trackingId"] = context?.Request?.Headers[Headers.TrackingId].ToString() ?? string.Empty;

            if ((_env.IsLocal() || _env.IsLowerEnvs()) && exception is not null)
                problem.Extensions["exception"] = GlobalExceptionHandler.ToProblemException(exception);

            context.Response.StatusCode = statusCode;
            await context.Response.WriteAsJsonAsync(problem);
        }
    }
}

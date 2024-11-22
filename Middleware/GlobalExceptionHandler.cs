using MangoSPA.Extensions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Logging;

namespace MangoSPA.Middleware;

public class GlobalExceptionHandler : IExceptionHandler
{
    readonly ProblemDetailsFactory _problemDetailsFactory;
    readonly ILogger<GlobalExceptionHandler> _logger;
    readonly IWebHostEnvironment _env;

    public GlobalExceptionHandler(
        ProblemDetailsFactory problemDetailsFactory,
        ILogger<GlobalExceptionHandler> logger,
        IWebHostEnvironment env)
    {
        _problemDetailsFactory = problemDetailsFactory;
        _logger = logger;
        _env = env;
    }

    static string GetTrackingId(HttpContext httpContext)
        => httpContext?.Request?.Headers[Constants.Headers.TrackingId].ToString() ?? string.Empty;

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "Global Exception occurred: {Message}", exception.Message);

        var problem = _problemDetailsFactory.CreateProblemDetails(httpContext, StatusCodes.Status500InternalServerError);
        problem.Extensions["message"] = "An unexpected error has occurred.";
        problem.Extensions["errorCode"] = "INTERNAL_ERROR";
        problem.Extensions["trackingId"] = GetTrackingId(httpContext);

        if (_env.IsLowerEnvs() && exception is not null)
            problem.Extensions["exception"] = ToProblemException(exception);

        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

        await httpContext.Response.WriteAsJsonAsync(problem, cancellationToken);

        return true;
    }

    static ProblemException ToProblemException(Exception ex)
    {
        var pe = new ProblemException(
            Type: ex.GetType().Name,
            Source: ex.Source ?? null,
            Message: ex.Message,
            Stack: ex.StackTrace?.Split(Environment.NewLine)
                .Select(x => x.Trim())
                .ToList() ?? [],
            InnerException: null);

        if (ex.InnerException is not null)
            pe = pe with { InnerException = ToProblemException(ex.InnerException) };

        return pe;
    }
}

record ProblemException(string Type, string Source, string Message, List<string> Stack, ProblemException InnerException);
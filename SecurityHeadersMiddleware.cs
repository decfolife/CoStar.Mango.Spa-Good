using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace MangoSPA;

public class SecurityHeadersMiddleware
{
    readonly RequestDelegate _next;

    public SecurityHeadersMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        context.Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");
        context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
        context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");

        // Should only be turned on in upper environments
        //context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload;");

        var nonce = Guid.NewGuid();

        context.Response.Headers.Add("Content-Security-Policy", "default-src 'self';" +
            "connect-src 'self' *.crem.aws.dshrp.com/ *.corp.virtualpremise.com:*/" +
            "font-src 'self' *.googleapis.com *.gstatic.com;" +
            "frame-src 'self';" +
            "script-src 'self' *.costar.com *.glancecdn.net *.google-analytics.com;" +
            $"style-src 'self' 'nonce-{nonce}' *.googleapis.com;" +
            "frame-ancestors 'self';" +
            "img-src 'self' data: *.corp.virtualpremise.com:*/;" +
            "manifest-src 'self';" +
            "media-src 'self';" +
            "object-src 'self';" +
            "worker-src 'self';");

        await _next(context);
    }
}


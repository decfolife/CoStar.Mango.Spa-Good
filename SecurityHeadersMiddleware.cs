using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
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
        context.Response.Headers.TryAdd("X-Frame-Options", "SAMEORIGIN");
        context.Response.Headers.TryAdd("X-Content-Type-Options", "nosniff");
        context.Response.Headers.TryAdd("X-XSS-Protection", "1; mode=block");

        // Should only be turned on in upper environments
        // Enable HSTS with a max-age of 31536000 seconds (1 year) - this is being done from the NGINX ingress in k8s.
        // Added by k8s already. No need to add it here.
        // context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload;");

        //var nonce = Guid.NewGuid();

        context.Response.Headers.TryAdd("Content-Security-Policy",
            "default-src 'self'; connect-src 'self' *.costarremanager.com:*/ *.crem.aws.dshrp.com/ *.corp.virtualpremise.com:*/ maps.googleapis.com; font-src 'self' fonts.googleapis.com fonts.gstatic.com; frame-src 'self'; script-src 'self' *.costar.com *.glancecdn.net *.googleapis.com; style-src 'self' maps.googleapis.com fonts.googleapis.com; frame-ancestors 'self'; img-src 'self' data: *.corp.virtualpremise.com:*/ maps.googleapis.com maps.gstatic.com; manifest-src 'self'; media-src 'self'; object-src 'self'; worker-src 'self';");

        await _next(context);
    }
}


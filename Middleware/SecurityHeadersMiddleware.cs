using Microsoft.AspNetCore.Http;

namespace MangoSPA.Middleware;

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
            "default-src 'self'; font-src 'self' fonts.googleapis.com fonts.gstatic.com; script-src 'self' *.costar.com *.glancecdn.net *.googleapis.com *.costarremanager.com:*/ https://cdn.lrkt-in.com *.pendo.costarremanager.com app.pendo.io cdn.pendo.io pendo-static-5398454967468032.storage.googleapis.com data.pendo.io 'nonce-$request_id'; style-src 'self' fonts.googleapis.com *.costarremanager.com:*/ maps.googleapis.com *.storage.googleapis.com app.pendo.io pendo-io-static.storage.googleapis.com pendo-static-5398454967468032.storage.googleapis.com 'nonce-$request_id'; img-src 'self' data: *.costarremanager.com:*/ *.corp.virtualpremise.com:*/ data.pendo.costarremanager.com maps.googleapis.com maps.gstatic.com cdn.pendo.io data.pendo.io pendo-static-5398454967468032.storage.googleapis.com app.pendo.io data: img.youtube.com; connect-src 'self' *.costarremanager.com:*/ *.corp.virtualpremise.com:*/ api.feedback.us.pendo.io api.feedback.eu.pendo.io *.crem.aws.dshrp.com/ maps.googleapis.com *.pendo.costarremanager.com data.pendo.io pendo-static-5398454967468032.storage.googleapis.com app.pendo.io; frame-src 'self' costarremanager.com costarmanager.com portal.feedback.us.pendo.io portal.feedback.eu.pendo.io app.pendo.io portal.pendo.io player.vimeo.com; worker-src 'self' blob:; frame-ancestors 'self'; manifest-src 'self'; media-src 'self'; object-src 'self' *.costarremanager.com:*/; base-uri 'self';");

        await _next(context);
    }
}


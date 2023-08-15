using Mango.MangoSPA;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net.Http.Headers;
using System;
using Microsoft.AspNetCore.Http;

namespace MangoSPA;

public class Startup
{
    public IConfiguration Configuration { get; }

    private const string _CorsPolicy = "mangospa-cors-policy";

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddRouting(opts =>
        {
            opts.LowercaseUrls = true;
            opts.LowercaseQueryStrings = true;
        });

        AddAppSettings(services, Configuration);

        services.AddCors(options =>
        {
            options.AddPolicy(_CorsPolicy, builder =>
                builder.SetIsOriginAllowed(_ => true)
                        //.WithOrigins("http://localhost:63585")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
        });

        // Setup where the compiled version of our spa application will be, when in production. 
        services.AddSpaStaticFiles(options =>
        {
            options.RootPath = "Client/dist";
        });

        AddAuth(services, Configuration);

        services.AddHttpClient("identity-api", (p, c) =>
        {
            c.BaseAddress = new Uri(Configuration["ServicesUrls:IdentityApiUrl"]);
            c.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        });

        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDev() || env.IsLocal())
        {
            app.UseDeveloperExceptionPage();
        }

        // Needed if not using IIS or NGINX server to serve the app
        app.UseMiddleware<SecurityHeadersMiddleware>();

        //app.UseFileServer();
        app.UseStaticFiles();

        // This will make the application to respond with the index.html and the rest of the assets present on the configured folder (at AddSpaStaticFiles() (wwwroot))
        if (!env.IsLocal())
        {
            app.UseSpaStaticFiles();
        }

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseCors(_CorsPolicy);

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

        // Handles all still unattended (by any other middleware) requests by returning the default page of the SPA (wwwroot/index.html).
        app.UseSpa(spa =>
        {
            // To learn more about options for serving an Angular SPA from ASP.NET Core,
            // see https://go.microsoft.com/fwlink/?linkid=864501

            // the root of the angular app. (Where the package.json lives)
            spa.Options.SourcePath = "Client";

            if (env.IsLocal())
            {
                // use the SpaServices extension method for angular, that will make the application to run "ng serve" for us, when in development.
                spa.UseAngularCliServer(npmScript: "start");
            }
        });
    }

    public void AddAppSettings(IServiceCollection services, IConfiguration config)
    {
        services.Configure<AppSettings>(config.GetSection(AppSettings.Section));
        services.Configure<ServiceUrlsOptions>(config.GetSection(ServiceUrlsOptions.Section));
    }

    public void AddAuth(IServiceCollection services, IConfiguration config)
    {
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, opts =>
                {
                    opts.Cookie.SameSite = SameSiteMode.Strict;
                    opts.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                    opts.Cookie.HttpOnly = true;
                    opts.LoginPath = "/login";
                    opts.LogoutPath = "/logout";
                });
      
                //.AddOAuth("central-auth", o =>
                //{
                //    o.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                //    o.ClientId = "mango-spa";
                //    o.ClientSecret = "mango-spa";

                //    //o.AuthorizationEndpoint = "https://identity.dev.crem.aws.dshrp.com/api/oauth/authorize";
                //    //o.TokenEndpoint = "https://identity.dev.crem.aws.dshrp.com/api/oauth/token";
                //    o.AuthorizationEndpoint = "https://localhost:5001/api/oauth/authorize";
                //    o.TokenEndpoint = "https://localhost:5001/api/oauth/token";
                //    o.CallbackPath = "/oauth/custom-cb";
                //    o.UsePkce = true;

                //    // Todo
                //    o.Events.OnCreatingTicket = async ctx =>
                //    {

                //    };
                //});
    }
}



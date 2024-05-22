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
using Microsoft.AspNetCore.Authentication;
using System.Net;
using Microsoft.AspNetCore.HttpOverrides;
using Serilog.Events;
using Serilog;
using System.Reflection;
using Microsoft.OpenApi.Models;
using System.IO;
using System.Collections.Generic;
using MangoSPA.Services;
using Yarp.ReverseProxy.Transforms;
using System.Threading.Tasks;

namespace MangoSPA;

public class Startup
{
    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Environment { get; }

    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        Configuration = configuration;
        Environment = environment;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddRouting(opts =>
        {
            opts.LowercaseUrls = true;
            opts.LowercaseQueryStrings = true;
        });

        services.AddHealthChecks();
        services.AddHttpContextAccessor();

        services.AddReverseProxy()
            .LoadFromConfig(Configuration.GetSection("ReverseProxy"))
            .AddTransforms(builderContext =>
            {
                builderContext.AddRequestTransform(async transformContext =>
                {
                    var accessToken = transformContext.HttpContext.User.AccessToken();
                    transformContext.ProxyRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                });             
            });

        AddSwagger(services);
        AddLogging(services);
        AddAppSettings(services, Configuration);
        AddAuth(services, Environment);

        // Needed if we want to serve mangoSPA using .NET web server.
        // Setup where the compiled version of our spa application will be, when in production. 
        //services.AddSpaStaticFiles(options =>
        //{
        //    options.RootPath = "Client/dist";
        //});

        services.AddHttpClient("identity-api", (p, c) =>
        {
            c.BaseAddress = new Uri(Configuration["ServicesUrls:IdentityApiUrl"]);
            c.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        });

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                if (Environment.IsLocal())
                    policy.SetIsOriginAllowed(_ => true);
                else
                {
                    policy.WithOrigins("https://*.costarremanager.com", "http://*.corp.virtualpremise.com", "http://*.corp.virtualpremise.com:30080")
                          .SetIsOriginAllowedToAllowWildcardSubdomains();
                }

                policy.AllowAnyMethod()
                      .AllowAnyHeader()
                      .AllowCredentials();
            });
        });

        services.AddControllers();

        services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders = ForwardedHeaders.XForwardedFor
                                     | ForwardedHeaders.XForwardedProto
                                     | ForwardedHeaders.XForwardedHost;
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IConfiguration config)
    {
        app.UseForwardedHeaders();
        app.UsePathBase("/api");

        if (!env.IsStage() && !env.IsProd())
        {
            app.UseDeveloperExceptionPage();

            var isInK8s = config.GetSection("AppSettings").GetValue<bool>("IsInKubernetes");
            if (isInK8s)
            {
                app.UseSwagger(opt =>
                {
                    opt.PreSerializeFilters.Add((swagger, request) =>
                    {
                        var serverUrl = $"{request.Scheme}://{request.Host}/api";
                        swagger.Servers = new List<OpenApiServer> { new() { Url = serverUrl } };
                    });
                });

                app.UseSwaggerUI(opt =>
                {
                    opt.RoutePrefix = "swagger";
                    opt.SwaggerEndpoint("v1/swagger.json", "MangoSPA Server v1");
                });
            }
            else
            {
                app.UseSwagger();
                app.UseSwaggerUI(opt =>
                {
                    opt.SwaggerEndpoint("../swagger/v1/swagger.json", "MangoSPA Server v1");
                });
            }
        }

        // *****
        // Needed if we want to serve mangoSPA using .NET web server.
        // Needed if not using IIS or NGINX server to serve the app
        //app.UseMiddleware<SecurityHeadersMiddleware>();

        //app.UseStaticFiles(); 

        // This will make the application to respond with the index.html and the rest of the assets present on the configured folder (at AddSpaStaticFiles() (wwwroot))
        //if (!env.IsLocal())
        //{
        //    app.UseSpaStaticFiles();
        //}
        // *****

        app.UseMiddleware<SecurityHeadersMiddleware>();
        app.UseRouting();
        app.UseCors();
        app.UseAuthentication();
        app.UseAuthorization();
 
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHealthChecks("/health");
            endpoints.MapReverseProxy();
        });

        app.UseSerilogRequestLogging();

        // Needed if we want to serve mangoSPA using .NET web server.
        // Handles all still unattended (by any other middleware) requests by returning the default page of the SPA (wwwroot/index.html).
        //app.UseSpa(spa =>
        //{
        //    // To learn more about options for serving an Angular SPA from ASP.NET Core,
        //    // see https://go.microsoft.com/fwlink/?linkid=864501

        //    // the root of the angular app. (Where the package.json lives)
        //    spa.Options.SourcePath = "Client";

        //    if (env.IsLocal())
        //    {
        //        // use the SpaServices extension method for angular, that will make the application to run "ng serve" for us, when in development.
        //        spa.UseAngularCliServer(npmScript: "start");
        //    }
        //});
    }

    public void AddAppSettings(IServiceCollection services, IConfiguration config)
    {
        services.Configure<AppSettings>(config.GetSection(AppSettings.Section));
        services.Configure<ServiceUrlsOptions>(config.GetSection(ServiceUrlsOptions.Section));
    }

    public void AddSwagger(IServiceCollection services)
    {
        services.AddSwaggerGen(opts =>
        {
            opts.SwaggerDoc("v1", new OpenApiInfo() { Title = "MangoSPA Server", Description = "Used to act as a Web server for Mango SPA and create authentication cookie.", Version = "v1" });

            string filePath = Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml");
            opts.IncludeXmlComments(filePath, true);
        });
    }

    public void AddLogging(IServiceCollection services)
    {
        var configuration = new LoggerConfiguration()
            .MinimumLevel.Information()
            .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .Enrich.WithEnvironmentUserName()
            .Enrich.WithMachineName()
            .Enrich.WithProperty("EntryPoint", Assembly.GetEntryAssembly()?.GetName().Name)
            .Enrich.WithProperty("Version", Assembly.GetEntryAssembly()?.GetName().Version?.ToString())
            .WriteTo.Console(LogEventLevel.Information, "[{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} {Level}] {CorrelationId} - {Message}{NewLine}{Exception}");

        Log.Logger = configuration.CreateLogger();

        Serilog.Debugging.SelfLog.Enable(Console.Error);
        AppDomain.CurrentDomain.ProcessExit += (s, e) => Log.CloseAndFlush();
        services.AddLogging(b => b.AddSerilog(Log.Logger, dispose: true));
    }

    public void AddAuth(IServiceCollection services, IWebHostEnvironment env)
    {
        services.AddScoped<IAuthService, AuthService>();

        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, opts =>
                {
                    opts.Cookie.Name = "mango";
                    opts.Cookie.SameSite = env.IsLocal() ? SameSiteMode.None : SameSiteMode.Strict;
                    opts.Cookie.SecurePolicy = env.IsLowerEnvs() ? CookieSecurePolicy.SameAsRequest : CookieSecurePolicy.Always;
                    opts.Cookie.HttpOnly = true;
                    opts.ExpireTimeSpan = TimeSpan.FromMinutes(int.Parse(Configuration["Auth:CookieExpireInMinutes"]));
                    //opts.SlidingExpiration = true;

                    opts.Events = new CookieAuthenticationEvents
                    {
                        OnRedirectToLogin = async (context) =>
                        {
                            await context.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                            context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        }
                    };
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



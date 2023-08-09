using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Threading.Tasks;

namespace MangoSPA;

public class Program
{
    public async static Task Main(string[] args)
    {
        await BuildWebHost(args).RunAsync();
    }

    public static IWebHost BuildWebHost(string[] args) =>
        Microsoft.AspNetCore.WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>()
            .UseContentRoot(Directory.GetCurrentDirectory())
            .ConfigureLogging((hostingContext, builder) =>
            {
                builder.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                builder.AddConsole();
            })
            .Build();
}


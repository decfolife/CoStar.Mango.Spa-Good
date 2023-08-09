namespace Mango.MangoSPA;

/// <summary>
/// Class that represents the 'AppSettings' section in the appsettings.json file.
/// </summary>
public class AppSettings
{
    public const string Section = "AppSettings";
}

public class ServiceUrlsOptions
{
    public const string Section = "ServiceUrls";

    public string IdentityApiUrl { get; set; }
    public string MangoHttpAggregatorUrl { get; set; }
    public string WebBffIdentityUrl { get; set; }
}


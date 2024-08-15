namespace MangoSPA.Models;

public record SharedInfo(int IdleTimeOutMinutes);

//Used to store current user session data
//public record SessionDataDto
//{
//    public string CurrencyFormat { get; set; }
//    public List<object> BreadCrumbs { get; set; }
//}
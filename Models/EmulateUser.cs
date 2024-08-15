namespace MangoSPA.Models;

public record EmulateUserRequest(string Email, int ContactId, int ContactRole, string ClientKey);

public record EmulateUserResponse(int ContactId, bool IsEmulatedUser);

public record EmulatedUser(int ContactId, string AccessToken, bool IsEmulatedUser = true);

public record AccessTokenDto(string AuthToken);
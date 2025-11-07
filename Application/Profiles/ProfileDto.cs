namespace Application.Profiles;

public class ProfileDto
{
    public string Username { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string? Bio { get; set; }
    public string? BankAccountNumber { get; set; }
    public string Email { get; set; } = null!;
}

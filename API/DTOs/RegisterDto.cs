using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$",
        ErrorMessage = "Password must be 6–20 chars, include upper, lower, number.")]
    public string Password { get; set; } = null!;

    [Required]
    public string FullName { get; set; } = null!;
}

using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.Profiles;

public class Edit
{
    private readonly UserManager<AppUser> _userManager;

    public Edit(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<bool> EditProfileAsync(string email, string fullName, string? bio, string? bankAccount)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null) return false;

        user.FullName = fullName;
        user.Bio = bio;
        user.BankAccountNumber = bankAccount;

        var result = await _userManager.UpdateAsync(user);
        return result.Succeeded;
    }
}

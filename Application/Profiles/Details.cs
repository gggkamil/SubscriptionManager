using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Profiles;

public class Details
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IMapper _mapper;

    public Details(UserManager<AppUser> userManager, IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<ProfileDto?> GetProfileAsync(string username)
    {
        var user = await _userManager.Users
            .FirstOrDefaultAsync(x => x.UserName == username);

        return user == null ? null : _mapper.Map<ProfileDto>(user);
    }
}

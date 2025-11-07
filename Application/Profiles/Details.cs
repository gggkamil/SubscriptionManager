using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

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

    public async Task<ProfileDto?> GetProfileByIdAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        return user == null ? null : _mapper.Map<ProfileDto>(user);
    }
}

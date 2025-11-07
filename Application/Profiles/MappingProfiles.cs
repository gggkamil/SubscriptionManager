using AutoMapper;
using Domain.Entities;

namespace Application.Profiles;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<AppUser, ProfileDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName));
    }
}
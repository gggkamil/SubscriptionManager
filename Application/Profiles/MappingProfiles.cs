using Application.Subscriptions;
using AutoMapper;
using Domain.Entities;

namespace Application.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, ProfileDto>();

            CreateMap<Subscription, SubscriptionDto>()
                .ForMember(dest => dest.AppUser, opt => opt.MapFrom(src => src.AppUser))
                .ForMember(dest => dest.AppUserId, opt => opt.MapFrom(src => src.AppUserId));
        }
    }
}

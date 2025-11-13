using Application.Profiles;

namespace Application.Subscriptions
{
    public class SubscriptionDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Amount { get; set; }
        public int MaxContributors { get; set; }
        public DateTime NextPaymentDate { get; set; }

        public ProfileDto? AppUser { get; set; }
         public string? AppUserId { get; set; }

          public List<ProfileDto> Contributors { get; set; } = new();
    }
}

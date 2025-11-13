namespace Domain.Entities
{
public class SubscriptionContributor
{
    public Guid Id { get; set; }
    public Guid SubscriptionId { get; set; }
    public Subscription Subscription { get; set; } = null!;
    public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;
}
}

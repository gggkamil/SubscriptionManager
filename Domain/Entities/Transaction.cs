using System;

namespace Domain.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        public string AppUserId { get; set; } = null!;
        public AppUser AppUser { get; set; } = null!;

        public Guid SubscriptionId { get; set; }
        public Subscription Subscription { get; set; } = null!;

        public Guid? SubscriptionContributorId { get; set; }
        public SubscriptionContributor? Contributor { get; set; }

        public string Merchant { get; set; } = "";
    }
}

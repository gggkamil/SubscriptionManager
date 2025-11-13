using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
public class Subscription
{
    public Guid Id { get; set; }
    public string? AppUserId { get; set; } = null!;  
    public AppUser? AppUser { get; set; } = null!;
    
    public string Name { get; set; } = null!;
    public decimal Amount { get; set; }
    public int MaxContributors { get; set; }
    public DateTime NextPaymentDate { get; set; }
     public ICollection<SubscriptionContributor> Contributors { get; set; } = new List<SubscriptionContributor>();

}

}
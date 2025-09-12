using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
public class Notification
{
    public Guid Id { get; set; }
    public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;

    public Guid SubscriptionId { get; set; }
    public Subscription Subscription { get; set; } = null!;

    public string Message { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Status { get; set; } = "Pending";
}

}
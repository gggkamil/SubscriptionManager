using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
public class Notification
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid SubscriptionId { get; set; }
    public string Message { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Status { get; set; } = "Pending";
}
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
public class Subscription
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; } = null!;
    public decimal Amount { get; set; }
    public string Frequency { get; set; } = null!;
    public DateTime NextPaymentDate { get; set; }
}
}
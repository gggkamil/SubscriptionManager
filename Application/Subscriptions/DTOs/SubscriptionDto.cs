namespace Application.Subscriptions.DTOs;

public class SubscriptionDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public decimal Amount { get; set; }
    public string Frequency { get; set; } = null!;
    public DateTime NextPaymentDate { get; set; }
}
using MediatR;

namespace Application.Subscriptions.Commands;

public record CreateSubscriptionCommand(string Name, decimal Amount, string Frequency, DateTime NextPaymentDate) : IRequest<Guid>;
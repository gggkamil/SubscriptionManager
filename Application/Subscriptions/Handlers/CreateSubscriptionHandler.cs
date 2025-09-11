using Application.Subscriptions.Commands;
using Domain.Entities;
using MediatR;
using Persistence;
public class CreateSubscriptionHandler : IRequestHandler<CreateSubscriptionCommand, Guid>
{
    private readonly AppDbContext _context;

    public CreateSubscriptionHandler(AppDbContext context) => _context = context;

    public async Task<Guid> Handle(CreateSubscriptionCommand request, CancellationToken cancellationToken)
    {
        var sub = new Subscription
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Amount = request.Amount,
            Frequency = request.Frequency,
            NextPaymentDate = request.NextPaymentDate
        };

        _context.Subscriptions.Add(sub);
        await _context.SaveChangesAsync(cancellationToken);
        return sub.Id;
    }
}
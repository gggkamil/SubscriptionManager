using Application.Subscriptions.DTOs;
using Application.Subscriptions.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Subscriptions.Handlers;

public class GetSubscriptionsHandler : IRequestHandler<GetSubscriptionsQuery, List<SubscriptionDto>>
{
    private readonly AppDbContext _context;

    public GetSubscriptionsHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SubscriptionDto>> Handle(GetSubscriptionsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Subscriptions
            .Select(s => new SubscriptionDto
            {
                Id = s.Id,
                Name = s.Name,
                Amount = s.Amount,
                Frequency = s.Frequency,
                NextPaymentDate = s.NextPaymentDate
            })
            .ToListAsync(cancellationToken);
    }
}

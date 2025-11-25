using Application.Core;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Subscriptions
{
    public class Pay
    {
        public record Command(Guid SubscriptionId) : IRequest<Result<Unit>>;

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly AppDbContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(AppDbContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken ct)
            {
                var userId = _userAccessor.GetUserId();

                var subscription = await _context.Subscriptions
                    .FirstOrDefaultAsync(x => x.Id == request.SubscriptionId, ct);

                if (subscription == null)
                    return Result<Unit>.Failure("Subscription not found");

                var transaction = new Transaction
                {
                    Id = Guid.NewGuid(),
                    AppUserId = userId,
                    SubscriptionId = subscription.Id,
                    Amount = subscription.Amount,
                    Date = DateTime.UtcNow
                };

                _context.Transactions.Add(transaction);

                var result = await _context.SaveChangesAsync(ct) > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Transaction could not be saved");
            }
        }
    }
}

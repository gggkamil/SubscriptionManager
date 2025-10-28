using Application.Core;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Subscriptions
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Subscription Subscription { get; set; } = null!;
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var sub = await _context.Subscriptions.FindAsync(new object[] { request.Subscription.Id }, cancellationToken);

                if (sub == null) return Result<Unit>.Failure("Subscription not found");

                sub.Name = request.Subscription.Name;
                sub.Amount = request.Subscription.Amount;
                sub.Frequency = request.Subscription.Frequency;
                sub.NextPaymentDate = request.Subscription.NextPaymentDate;

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!success) return Result<Unit>.Failure("Failed to update subscription");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}

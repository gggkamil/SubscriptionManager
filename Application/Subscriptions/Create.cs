using Application.Core;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Subscriptions
{
    public class Create
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
                _context.Subscriptions.Add(request.Subscription);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!success) return Result<Unit>.Failure("Nie udało się utworzyć");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}

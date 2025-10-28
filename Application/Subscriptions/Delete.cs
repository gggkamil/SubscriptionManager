using Application.Core;
using MediatR;
using Persistence;

namespace Application.Subscriptions
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var sub = await _context.Subscriptions.FindAsync(new object[] { request.Id }, cancellationToken);

                if (sub == null) return Result<Unit>.Failure("Subscription not found");

                _context.Subscriptions.Remove(sub);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!success) return Result<Unit>.Failure("Failed to delete subscription");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}

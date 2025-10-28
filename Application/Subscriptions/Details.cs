using Application.Core;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Subscriptions
{
    public class Details
    {
        public class Query : IRequest<Result<Subscription>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Subscription>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Subscription>> Handle(Query request, CancellationToken cancellationToken)
            {
                var sub = await _context.Subscriptions.FindAsync(new object[] { request.Id }, cancellationToken);
                return sub == null
                    ? Result<Subscription>.Failure("Subscription not found")
                    : Result<Subscription>.Success(sub);
            }
        }
    }
}

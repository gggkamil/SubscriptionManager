using Application.Core;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Subscriptions
{
    public class List
    {
        public class Query : IRequest<Result<List<Subscription>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Subscription>>>
        {
            private readonly AppDbContext _context;

            public Handler(AppDbContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Subscription>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var subs = await _context.Subscriptions.ToListAsync(cancellationToken);
                return Result<List<Subscription>>.Success(subs);
            }
        }
    }
}

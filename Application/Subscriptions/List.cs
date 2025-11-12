using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Subscriptions
{
    public class List
    {
        public class Query : IRequest<Result<List<SubscriptionDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<SubscriptionDto>>>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<SubscriptionDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var subs = await _context.Subscriptions
                    .Include(s => s.AppUser)
                    .ProjectTo<SubscriptionDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<SubscriptionDto>>.Success(subs);
            }
        }
    }
}

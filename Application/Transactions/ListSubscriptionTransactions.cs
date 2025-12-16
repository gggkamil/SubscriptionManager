using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transactions
{
    public class ListSubscriptionTransactions
    {
        public class Query : IRequest<Result<List<TransactionDto>>>
        {
            public Guid SubscriptionId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<TransactionDto>>>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<TransactionDto>>> Handle(
                Query request,
                CancellationToken cancellationToken)
            {
                var transactions = await _context.Transactions
                    .Where(t => t.SubscriptionId == request.SubscriptionId)
                    .ProjectTo<TransactionDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<TransactionDto>>.Success(transactions);
            }
        }
    }
}

using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transactions
{
    public class ListUserTransactions
    {
        public class Query : IRequest<Result<List<TransactionDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<TransactionDto>>>
        {
            private readonly AppDbContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<Result<List<TransactionDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userId = _userAccessor.GetUserId();

                var transactions = await _context.Transactions
                    .Where(x => x.AppUserId == userId)
                    .OrderByDescending(x => x.Date)
                    .ProjectTo<TransactionDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<TransactionDto>>.Success(transactions);
            }
        }
    }
}

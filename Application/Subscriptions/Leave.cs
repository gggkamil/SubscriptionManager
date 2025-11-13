using Application.Core;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Claims;

namespace Application.Subscriptions
{
    public class Leave
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid SubscriptionId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly AppDbContext _context;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
            {
                _context = context;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var userId = (_httpContextAccessor.HttpContext?.User as ClaimsPrincipal)?
                    .FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null)
                    return Result<Unit>.Failure("Nie znaleziono użytkownika");

                var contributor = await _context.SubscriptionContributors
                    .FirstOrDefaultAsync(c => c.SubscriptionId == request.SubscriptionId && c.AppUserId == userId, cancellationToken);

                if (contributor == null)
                    return Result<Unit>.Failure("Nie jesteś współopłacającym tej subskrypcji");

                _context.SubscriptionContributors.Remove(contributor);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Wystąpił problem w trakcie usuwania osoby do współopłacających");
            }
        }
    }
}

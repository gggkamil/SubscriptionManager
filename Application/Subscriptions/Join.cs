using Application.Core;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Claims;

namespace Application.Subscriptions
{
    public class Join
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
                // ✅ Get current user ID from claims
                var userId = (_httpContextAccessor.HttpContext?.User as ClaimsPrincipal)?
                    .FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null)
                    return Result<Unit>.Failure("Nie znaleziono użytkownika");

                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                    return Result<Unit>.Failure("Nie znaleziono użytkownika w bazie");

                var subscription = await _context.Subscriptions
                    .Include(s => s.Contributors)
                    .FirstOrDefaultAsync(s => s.Id == request.SubscriptionId, cancellationToken);

                if (subscription == null)
                    return Result<Unit>.Failure("Nie znaleziono subskrypcji");

                if (subscription.Contributors.Any(c => c.AppUserId == userId))
                    return Result<Unit>.Failure("Już jesteś współopłacającym tej subskrypcji");

                if (subscription.Contributors.Count >= subscription.MaxContributors)
                    return Result<Unit>.Failure("Ta subskrypcja posiada już komplet współopłacających");

                subscription.Contributors.Add(new SubscriptionContributor
                {
                    Subscription = subscription,
                    AppUser = user
                });

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Wystąpił problem w trakcie dodawania osoby do współopłacających");
            }
        }
    }
}

using Application.Core;
using Domain.Entities;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

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
            private readonly IHttpContextAccessor _httpContext;

            public Handler(AppDbContext context, IHttpContextAccessor httpContext)
            {
                _context = context;
                _httpContext = httpContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
             
                var userId = _httpContext.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null) return Result<Unit>.Failure("No logged-in user found");

                request.Subscription.Id = Guid.NewGuid(); // optional if not set
                request.Subscription.AppUserId = userId;

                _context.Subscriptions.Add(request.Subscription);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!success) return Result<Unit>.Failure("Nie udało się utworzyć subskrypcji");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}

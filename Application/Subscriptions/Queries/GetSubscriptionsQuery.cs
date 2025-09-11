using Application.Subscriptions.DTOs;
using MediatR;

namespace Application.Subscriptions.Queries;

public record GetSubscriptionsQuery : IRequest<List<SubscriptionDto>>;

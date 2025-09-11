using Application.Subscriptions.Commands;
using Application.Subscriptions.DTOs;
using Application.Subscriptions.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubscriptionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public SubscriptionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<SubscriptionDto>>> GetSubscriptions()
    {
        var result = await _mediator.Send(new GetSubscriptionsQuery());
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateSubscription([FromBody] CreateSubscriptionCommand command)
    {
        var id = await _mediator.Send(command);
        return Ok(id);
    }
}

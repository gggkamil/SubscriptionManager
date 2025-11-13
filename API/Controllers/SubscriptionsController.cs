using Application.Subscriptions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class SubscriptionsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetSubscriptions()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubscription(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubscription(Subscription subscription)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Subscription = subscription }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSubscription(Guid id, Subscription subscription)
        {
            subscription.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Subscription = subscription }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscription(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
        [HttpPost("{id}/join")]
        public async Task<IActionResult> Join(Guid id)
        {
            return HandleResult(await Mediator.Send(new Join.Command { SubscriptionId = id }));
        }

        [HttpPost("{id}/leave")]
        public async Task<IActionResult> Leave(Guid id)
        {
            return HandleResult(await Mediator.Send(new Leave.Command { SubscriptionId = id }));
        }

    }
}

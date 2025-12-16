using Application.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class TransactionsController : BaseApiController
    {
        
        [HttpGet("mine")]
        public async Task<IActionResult> GetMyTransactions()
        {
            return HandleResult(await Mediator.Send(new ListUserTransactions.Query()));
        }
        [HttpGet("subscription/{subscriptionId}")]
public async Task<IActionResult> GetSubscriptionTransactions(Guid subscriptionId)
{
    return HandleResult(
        await Mediator.Send(new ListSubscriptionTransactions.Query
        {
            SubscriptionId = subscriptionId
        })
    );
}

    }
}

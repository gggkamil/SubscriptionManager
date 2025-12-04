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
    }
}

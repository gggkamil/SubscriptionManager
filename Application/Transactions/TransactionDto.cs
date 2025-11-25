namespace Application.Transactions
{
    public class TransactionDto
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public Guid SubscriptionId { get; set; }
        public string AppUserId { get; set; } = null!;
    }
}

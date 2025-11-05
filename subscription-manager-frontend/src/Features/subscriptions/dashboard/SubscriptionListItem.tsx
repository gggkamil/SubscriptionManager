export default function SubscriptionListItem({ subscription }: { subscription: any }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "0.5rem", padding: "1rem" }}>
      <h3>{subscription.name}</h3>
      <p>Amount: ${subscription.amount}</p>
      <p>Frequency: {subscription.frequency}</p>
      <p>Next Payment: {subscription.nextPaymentDate}</p>
    </div>
  );
}

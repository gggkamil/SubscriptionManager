export default function SubscriptionListItem({ subscription }: { subscription: any }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "0.5rem", padding: "1rem" }}>
      <h3>{subscription.name}</h3>
      <p>Opłata: ${subscription.amount}</p>
      <p>Ilość osób: {subscription.maxContributors}</p>
      <p>Termin następnej opłaty: {subscription.nextPaymentDate}</p>
    </div>
  );
}

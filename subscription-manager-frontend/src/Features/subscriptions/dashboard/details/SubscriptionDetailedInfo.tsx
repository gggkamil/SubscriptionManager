import { Card, CardContent, Typography, Divider } from "@mui/material";
import type { Subscription } from "../../../../app/models/subscription";

interface Props {
  subscription: Subscription;
}

export default function SubscriptionDetailedInfo({ subscription }: Props) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Szczegóły subskrypcji
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography>
          <strong>Ilość osób:</strong> {subscription.maxContributors || "Brak maksymalnej ilości osób"}
        </Typography>
        <Typography>
          <strong>Kwota:</strong> {subscription.amount.toFixed(2)} zł
        </Typography>
        <Typography>
          <strong>Następna płatność:</strong>{" "}
          {new Date(subscription.nextPaymentDate).toLocaleDateString("pl-PL")}
        </Typography>
      </CardContent>
    </Card>
  );
}

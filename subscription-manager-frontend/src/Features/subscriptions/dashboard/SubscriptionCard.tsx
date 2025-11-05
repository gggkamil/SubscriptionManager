import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import type { Subscription } from "../../../app/models/subscription";

interface Props {
  subscription: Subscription;
}

export default function SubscriptionCard({ subscription }: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6">{subscription.name}</Typography>
        <Typography color="text.secondary">
          Amount: ${subscription.amount.toFixed(2)}
        </Typography>
        <Typography color="text.secondary">
          Frequency: {subscription.frequency}
        </Typography>
        <Typography color="text.secondary">
          Next Payment:{" "}
          {new Date(subscription.nextPaymentDate).toLocaleDateString()}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button size="small" variant="outlined">
            Edit
          </Button>
          <Button size="small" variant="contained" color="error">
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

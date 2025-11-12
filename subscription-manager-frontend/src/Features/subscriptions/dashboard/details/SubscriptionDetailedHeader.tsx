import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import type { Subscription } from "../../../../app/models/subscription";

interface Props {
  subscription: Subscription;
}

export default function SubscriptionDetailedHeader({ subscription }: Props) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
      <CardContent>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {subscription.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {subscription.amount.toFixed(2)} zł
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Następna płatność:{" "}
          <strong>
            {new Date(subscription.nextPaymentDate).toLocaleDateString("pl-PL")}
          </strong>
        </Typography>
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to={`/subscriptions/edit/${subscription.id}`}
            variant="contained"
            color="primary"
          >
            Edytuj
          </Button>
          <Button
            component={Link}
            to={`/subscriptions`}
            variant="outlined"
            color="inherit"
          >
            Powrót
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

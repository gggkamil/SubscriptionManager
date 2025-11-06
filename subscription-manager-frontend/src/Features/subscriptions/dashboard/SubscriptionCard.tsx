import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import type { Subscription } from "../../../app/models/subscription";

interface Props {
  subscription: Subscription;
}

export default observer(function SubscriptionCard({ subscription }: Props) {
  const { subscriptionStore } = useStore();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      await subscriptionStore.deleteSubscription(subscription.id);
      // optionally refresh the list or navigate to /subscriptions
      navigate("/subscriptions");
    }
  };

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
          <Button
            size="small"
            variant="outlined"
            component={Link}
            to={`/subscriptions/edit/${subscription.id}`}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
});

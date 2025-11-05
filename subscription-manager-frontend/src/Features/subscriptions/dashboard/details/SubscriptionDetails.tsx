import { observer } from "mobx-react-lite";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useStore } from "../../../../app/stores/store";

export default observer(function SubscriptionDetails() {
  const { id } = useParams<{ id: string }>();
  const { subscriptionStore } = useStore();
  const {
    subscriptions,
    selectedSubscription,
    loadSubscriptions,
    loading,
  } = subscriptionStore;

  useEffect(() => {
    if (subscriptions.length === 0) loadSubscriptions();
  }, [loadSubscriptions, subscriptions.length]);

  const subscription =
    selectedSubscription ?? subscriptions.find((x) => x.id === id);

  if (loading || !subscription)
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        {subscription.name}
      </Typography>
      <Typography>Amount: ${subscription.amount.toFixed(2)}</Typography>
      <Typography>Frequency: {subscription.frequency}</Typography>
      <Typography>
        Next Payment:{" "}
        {new Date(subscription.nextPaymentDate).toLocaleDateString()}
      </Typography>

      <Button
        component={Link}
        to={`/manageSubscription/${subscription.id}`}
        sx={{ mt: 3 }}
        variant="contained"
      >
        Edit
      </Button>
    </Box>
  );
});

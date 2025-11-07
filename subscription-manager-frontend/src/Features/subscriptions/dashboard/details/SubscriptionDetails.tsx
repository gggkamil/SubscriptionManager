import { observer } from "mobx-react-lite";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useStore } from "../../../../app/stores/store";
import { Button, Typography, Box } from "@mui/material";

const SubscriptionDetails = observer(() => {
  const { subscriptionStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const subscription = subscriptionStore.getSubscription(id!);

  if (!subscription) return <Typography>Loading...</Typography>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      await subscriptionStore.deleteSubscription(subscription.id);
      navigate("/subscriptions");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5">{subscription.name}</Typography>
      <Typography>Amount: {subscription.amount}</Typography>
      <Typography>Frequency: {subscription.frequency}</Typography>
      <Typography>Next payment: {subscription.nextPaymentDate}</Typography>

      <Button
        component={Link}
        to={`/subscriptions/edit/${subscription.id}`}
        sx={{ mt: 3, mr: 2 }}
        variant="contained"
      >
        Edytuj
      </Button>

      <Button
        sx={{ mt: 3 }}
        variant="outlined"
        color="error"
        onClick={handleDelete}
      >
        Usuń
      </Button>
    </Box>
  );
});

export default SubscriptionDetails;

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
    if (window.confirm("Na pewno chcesz usunąć tą subskrypcję?")) {
      await subscriptionStore.deleteSubscription(subscription.id);
      navigate("/subscriptions");
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6">{subscription.name}</Typography>
        <Typography color="text.secondary">
          Opłata: ${subscription.amount.toFixed(2)}
        </Typography>
        <Typography color="text.secondary">
          Opis planu: {subscription.frequency}
        </Typography>
        <Typography color="text.secondary">
          Termin następnej opłaty:{" "}
          {new Date(subscription.nextPaymentDate).toLocaleDateString()}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            component={Link}
            to={`/subscriptions/edit/${subscription.id}`}
          >
            Edytuj
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Usuń
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
});

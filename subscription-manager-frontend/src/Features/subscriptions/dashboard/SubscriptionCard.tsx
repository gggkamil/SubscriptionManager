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
    if (window.confirm("Na pewno chcesz usunąć tę subskrypcję?")) {
      await subscriptionStore.deleteSubscription(subscription.id);
      navigate("/subscriptions");
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": { boxShadow: 4, transform: "scale(1.01)" },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {subscription.name}
        </Typography>

        <Typography color="text.secondary">
           Opłata: {subscription.amount.toFixed(2)} zł
        </Typography>
        <Typography color="text.secondary">
           Opis planu: {subscription.frequency}
        </Typography>
        <Typography color="text.secondary">
          Następna płatność:{" "}
          {new Date(subscription.nextPaymentDate).toLocaleDateString("pl-PL")}
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            component={Link}
            to={`/subscriptions/${subscription.id}`}
          >
            Szczegóły
          </Button>

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
            variant="outlined"
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

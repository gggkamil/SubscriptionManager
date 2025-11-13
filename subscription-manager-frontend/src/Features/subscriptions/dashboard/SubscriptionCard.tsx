import { Card, CardContent, Typography, Button, Stack, Box, CircularProgress, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import type { Subscription } from "../../../app/models/subscription";

interface Props {
  subscription: Subscription;
}

export default observer(function SubscriptionCard({ subscription }: Props) {
  const { userStore } = useStore();


  if (!subscription)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );

  const isHost = subscription.appUserId === userStore.user?.id;



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
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {subscription.name}
          </Typography>
          {isHost && <Chip label="Właściciel" color="success" size="small" />}
        </Stack>

        <Typography color="text.secondary">
          Opłata: {subscription.amount.toFixed(2)} zł
        </Typography>
        <Typography color="text.secondary">
          Ilość osób: {subscription.maxContributors}
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

        </Stack>
      </CardContent>
    </Card>
  );
});
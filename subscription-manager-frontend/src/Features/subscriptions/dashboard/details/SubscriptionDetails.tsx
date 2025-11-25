import { observer } from "mobx-react-lite";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useStore } from "../../../../app/stores/store";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Grid,
  Avatar,
  Stack
} from "@mui/material";
import SubscriptionDetailedSidebar from "./SubscriptionDetailedSidebar";

const SubscriptionDetails = observer(() => {
  const { subscriptionStore, userStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = userStore;
  const subscription = subscriptionStore.getSubscription(id!);

  if (!subscription)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );

  const isHost = subscription.appUserId === userStore.user?.id;
  const isContributor = subscription.contributors.some(c => c.id === user?.id);
  if (!subscription)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );

  const handleDelete = async () => {
    if (window.confirm("Na pewno usunąć tę subskrypcję?")) {
      await subscriptionStore.deleteSubscription(subscription.id);
      navigate("/subscriptions");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4, px: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              p: 2,
              maxWidth: 700,
              mx: "auto",
            }}
          >
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {subscription.name}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="body1" sx={{ mb: 1.5 }}>
                <strong>Opłata:</strong> {subscription.amount.toFixed(2)} zł
              </Typography>

              <Typography variant="body1" sx={{ mb: 1.5 }}>
                <strong>Ilość osób:</strong>{" "}
                {subscription.maxContributors > 0
                  ? subscription.maxContributors
                  : "Brak maksymalnej liczby osób"}

              </Typography>

              <Typography variant="body1" sx={{ mb: 3 }}>
                <strong>Termin następnej opłaty:</strong>{" "}
                {new Date(subscription.nextPaymentDate).toLocaleDateString(
                  "pl-PL"
                )}
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                Uczestnicy
              </Typography>

              {subscription.contributors.length === 0 && (
                <Typography color="text.secondary">Brak uczestników</Typography>
              )}

              <Stack spacing={1} sx={{ mb: 2 }}>
                {subscription.contributors.map((u) => (
                  <Box
                    key={u.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1,
                      borderRadius: 2,
                      bgcolor: "#f5f5f5",
                    }}
                  >
                    <Avatar>{u.fullName?.[0]?.toUpperCase()}</Avatar>
                    <Box>
                      <Typography fontWeight="bold">{u.fullName}</Typography>
                      <Typography variant="body2" color="text.secondary">{u.email}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              {(() => {
                const { userStore } = useStore();
                const { user } = userStore;


                const isContributor = subscription.contributors.some(c => c.id === user?.id);

                const isFull =
                  subscription.contributors.length >= subscription.maxContributors;

                return (
                  <Button
                    variant="contained"
                    color={isContributor ? "warning" : "success"}
                    sx={{ mb: 2 }}
                    disabled={!isContributor && isFull}
                    onClick={() =>
                      isContributor
                        ? subscriptionStore.leaveSubscription(subscription.id)
                        : subscriptionStore.joinSubscription(subscription.id)
                    }
                  >
                    {isContributor
                      ? "Opuść subskrypcję"
                      : isFull
                        ? "Brak miejsc"
                        : "Dołącz"}
                  </Button>
                );
              })()}

              <Box display="flex" gap={2} mt={2}>
                {isHost && (
                  <>
                    <Button
                      component={Link}
                      to={`/subscriptions/edit/${subscription.id}`}
                      variant="contained"
                      color="primary"
                    >
                      Edytuj
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleDelete}
                    >
                      Usuń
                    </Button>
                  </>
                )}

                <Button
                  component={Link}
                  to="/subscriptions"
                  variant="text"
                  color="inherit"
                >
                  Wróć
                </Button>
                {isContributor && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => subscriptionStore.pay(subscription.id)}
                  >
                    Zapłaciłem ({subscription.amount} zł)
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SubscriptionDetailedSidebar subscription={subscription} />
        </Grid>
      </Grid>
    </Box>
  );
});

export default SubscriptionDetails;
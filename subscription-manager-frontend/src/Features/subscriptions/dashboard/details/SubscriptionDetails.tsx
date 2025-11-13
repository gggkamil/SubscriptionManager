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
} from "@mui/material";
import SubscriptionDetailedSidebar from "./SubscriptionDetailedSidebar";

const SubscriptionDetails = observer(() => {
  const { subscriptionStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const subscription = subscriptionStore.getSubscription(id!);

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
                {subscription.maxContributors || "Brak maksymalnej ilości osób"}
              </Typography>

              <Typography variant="body1" sx={{ mb: 3 }}>
                <strong>Termin następnej opłaty:</strong>{" "}
                {new Date(subscription.nextPaymentDate).toLocaleDateString(
                  "pl-PL"
                )}
              </Typography>

              <Box display="flex" gap={2} mt={2}>
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

                <Button
                  component={Link}
                  to="/subscriptions"
                  variant="text"
                  color="inherit"
                >
                  Wróć
                </Button>
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

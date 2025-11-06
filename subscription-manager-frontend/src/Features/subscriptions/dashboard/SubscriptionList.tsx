import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import Grid from "@mui/material/Grid";
import SubscriptionCard from "./SubscriptionCard";

export default observer(function SubscriptionList() {
  const { subscriptionStore } = useStore();
  const { subscriptions } = subscriptionStore;

  return (
    <Grid container spacing={2}>
      {subscriptions.map((sub) => (
        <Grid key={sub.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <SubscriptionCard subscription={sub} />
        </Grid>
      ))}
    </Grid>
  );
});

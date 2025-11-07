import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import Grid from "@mui/material/Grid";
import SubscriptionCard from "./SubscriptionCard";

const SubscriptionList = observer(() => {
  const { subscriptionStore } = useStore();
  const { filteredSubscriptions } = subscriptionStore; 

  if (!filteredSubscriptions.length) {
    return (
      <p style={{ textAlign: "center", color: "#777", marginTop: "1rem" }}>
        No subscriptions found.
      </p>
    );
  }

  return (
    <Grid container spacing={2}>
      {filteredSubscriptions.map((sub) => (
        <Grid key={sub.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <SubscriptionCard subscription={sub} />
        </Grid>
      ))}
    </Grid>
  );
});
export default SubscriptionList;
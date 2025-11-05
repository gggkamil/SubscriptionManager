import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import {Grid, Box, CircularProgress, Skeleton } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import SubscriptionList from "./SubscriptionList";
import SubscriptionFilters from "./SubscriptionFilters";

export default observer(function SubscriptionDashboard() {
  const { subscriptionStore } = useStore();
  const { loadSubscriptions, subscriptions, loading } = subscriptionStore;

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const load = async () => {
      await loadSubscriptions();
      // you can add pagination check later
      setHasMore(false);
    };
    load();
  }, [loadSubscriptions]);

  const fetchMore = async () => {
    await loadSubscriptions();
    setHasMore(false); // stop infinite scroll for now
  };

  if (loading && subscriptions.length === 0) {
    return (
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {[...Array(3)].map((_, i) => (
          <Grid key={i} size={6}>
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <InfiniteScroll
            dataLength={subscriptions.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            }
            style={{ overflow: "visible" }}
          >
            <SubscriptionList />
          </InfiniteScroll>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SubscriptionFilters />
        </Grid>
      </Grid>
    </Box>
  );
});

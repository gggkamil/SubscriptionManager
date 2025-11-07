import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";

const SubscriptionFilters = () => {
  const { subscriptionStore } = useStore();
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    switch (filter) {
      case "active":
        subscriptionStore.filterActive();
        break;
      case "expired":
        subscriptionStore.filterExpired();
        break;
      default:
        subscriptionStore.filterAll();
        break;
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        mb: 3,
        bgcolor: "background.paper",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filtry
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant={activeFilter === "all" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleFilterChange("all")}
          >
            Wszystkie
          </Button>
          <Button
            variant={activeFilter === "active" ? "contained" : "outlined"}
            color="success"
            onClick={() => handleFilterChange("active")}
          >
            Przyszłe
          </Button>
          <Button
            variant={activeFilter === "expired" ? "contained" : "outlined"}
            color="error"
            onClick={() => handleFilterChange("expired")}
          >
            Zaległe
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default observer(SubscriptionFilters);

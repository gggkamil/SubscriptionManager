import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

export default function SubscriptionFilters() {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Stack spacing={2}>
          <Button variant="outlined">All</Button>
          <Button variant="outlined">Active</Button>
          <Button variant="outlined">Expired</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

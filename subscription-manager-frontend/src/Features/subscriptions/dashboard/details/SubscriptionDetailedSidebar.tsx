import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import type { Subscription } from "../../../../app/models/subscription";

interface Props {
  subscription: Subscription;
}

export default function SubscriptionDetailedSidebar({ subscription }: Props) {
  const user = subscription.appUser;

  if (!user) return null;

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          textAlign: "center",
          py: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Właściciel subskrypcji
        </Typography>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: "secondary.main",
                fontSize: 32,
              }}
            >
              {user.fullName?.[0]?.toUpperCase() ?? "?"}
            </Avatar>

            <Chip
              label="Host"
              color="warning"
              size="small"
              sx={{
                position: "absolute",
                top: 5,
                right: -10,
                fontWeight: "bold",
              }}
            />
          </Box>

          <Typography variant="h6" fontWeight="bold" textAlign="center">
            {user.fullName}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 1 }}
          >
            {user.email}
          </Typography>

          <Divider sx={{ width: "100%", my: 1 }} />

          {user.bio && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ fontStyle: "italic", mb: 1 }}
            >
              “{user.bio}”
            </Typography>
          )}

          {user.bankAccountNumber && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              <strong>Nr konta:</strong> {user.bankAccountNumber}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

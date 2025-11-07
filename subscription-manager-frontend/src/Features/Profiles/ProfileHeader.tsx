import { Card, CardContent, Avatar, Typography,  Divider } from "@mui/material";
import type { Profile } from "../../app/models/profile";

interface Props {
  profile: Profile;
}

const ProfileHeader = ({ profile }: Props) => {
  return (
    <Card sx={{ textAlign: "center", boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: "0 auto",
            mb: 2,
            bgcolor: "primary.main",
            fontSize: 40,
          }}
        >
          {profile.fullName?.[0]?.toUpperCase() || "U"}
        </Avatar>

        <Typography variant="h6" fontWeight="bold">
          {profile.fullName}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {profile.email}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" color="text.secondary">
          {profile.bio || "..."}
        </Typography>

        {profile.bankAccountNumber && (
          <Typography
            variant="body2"
            sx={{ mt: 2, color: "text.secondary", fontStyle: "italic" }}
          >
            Numer konta: {profile.bankAccountNumber}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;

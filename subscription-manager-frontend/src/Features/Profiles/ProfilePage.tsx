import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { profileStore } = useStore();
  const { profile, loadProfile, loadingProfile } = profileStore;

  useEffect(() => {
    if (id) loadProfile(id);
  }, [id, loadProfile]);

  if (loadingProfile) return <LoadingComponent content="Ładuje profile..." />;

  if (!profile)
    return (
      <Typography
        variant="h6"
        textAlign="center"
        sx={{ mt: 10, color: "text.secondary" }}
      >
        Profile not found.
      </Typography>
    );

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 6 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ProfileHeader profile={profile} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <ProfileContent profile={profile} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default observer(ProfilePage);

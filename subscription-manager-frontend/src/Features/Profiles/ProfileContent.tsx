import { observer } from "mobx-react-lite";
import { Tabs, Tab, Box, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import type { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileEditForm from "./ProfileEditForm";
import SubscriptionCard from "../subscriptions/dashboard/SubscriptionCard";

interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const [tab, setTab] = useState(0);
  const { subscriptionStore } = useStore();
  const { subscriptions, loadSubscriptions, loadingInitial } = subscriptionStore;

  useEffect(() => {
    if (subscriptions.length === 0) loadSubscriptions();
  }, [subscriptions.length, loadSubscriptions]);

  const userSubscriptions = subscriptions.filter(s => s.appUserId === profile.id);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", boxShadow: 1, borderRadius: 2 }}>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Opis" />
        <Tab label="Edytuj profil" />
        <Tab label="Jestem właścicielem" />
        <Tab label="Należe do" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {tab === 0 && (
          <Box>
            <p><strong>Imię i nazwisko:</strong> {profile.fullName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio || "Brak opisu."}</p>
          </Box>
        )}

        {tab === 1 && <ProfileEditForm profile={profile} />}

        {tab === 2 && (
          <Box>
            {loadingInitial ? (
              <Typography color="text.secondary">Ładowanie subskrypcji...</Typography>
            ) : userSubscriptions.length === 0 ? (
              <Typography color="text.secondary">Ten użytkownik nie ma jeszcze żadnych subskrypcji.</Typography>
            ) : (
              <Grid container spacing={2}>
                {userSubscriptions.map(sub => (
                  <Grid key={sub.id} >
                    <SubscriptionCard subscription={sub} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {tab === 3 && (
  <Box>
    {loadingInitial ? (
      <Typography color="text.secondary">Ładowanie subskrypcji...</Typography>
    ) : subscriptions.filter(s => 
      s.contributors.some(c => c.id === profile.id)
    ).length === 0 ? (
      <Typography color="text.secondary">
        Ten użytkownik nie należy do żadnej subskrypcji.
      </Typography>
    ) : (
      <Grid container spacing={2}>
        {subscriptions
          .filter(s => s.contributors.some(c => c.id === profile.id))
          .map(sub => (
            <Grid key={sub.id} >
              <SubscriptionCard subscription={sub} />
            </Grid>
          ))}
      </Grid>
    )}
  </Box>
)}
      </Box>
    </Box>
  );
};

export default observer(ProfileContent);

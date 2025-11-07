import { observer } from "mobx-react-lite";
import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import type { Profile } from "../../app/models/profile";
import ProfileEditForm from "./ProfileEditForm";

interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const [tab, setTab] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", boxShadow: 1, borderRadius: 2 }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="About" />
        <Tab label="Edit Profile" />
        <Tab label="Subscriptions" />
        <Tab label="Activity" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {tab === 0 && (
          <Box>
            <p><strong>Full name:</strong> {profile.fullName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio || "No bio yet."}</p>
          </Box>
        )}
        {tab === 1 && <ProfileEditForm profile={profile} />}
        {tab === 2 && (
          <p style={{ color: "#777" }}>
            Subscriptions tab (connect later to your Subscriptions list)
          </p>
        )}
        {tab === 3 && (
          <p style={{ color: "#777" }}>
            Activity tab (future feature)
          </p>
        )}
      </Box>
    </Box>
  );
};

export default observer(ProfileContent);

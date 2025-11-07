import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import LoadingComponent from "../../app/layout/LoadingComponent";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { profileStore } = useStore();
  const { profile, loadProfile, loadingProfile } = profileStore;

  useEffect(() => {
    if (id) loadProfile(id);
  }, [id, loadProfile]);

  if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

  return (
    <div className="container mx-auto p-6">
      {profile && (
        <>
          <ProfileHeader profile={profile} />
          <ProfileContent profile={profile} />
        </>
      )}
    </div>
  );
};

export default observer(ProfilePage);

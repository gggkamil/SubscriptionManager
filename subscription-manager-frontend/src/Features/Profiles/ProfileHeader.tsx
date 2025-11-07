import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import type { Profile } from "../../app/models/profile";

interface Props {
  profile: Profile;
}

const ProfileHeader = ({ profile }: Props) => {
  return (
    <Card className="p-6 mb-6 text-center">
      <CardContent>
        <h2 className="text-2xl font-bold mb-2">{profile.fullName}</h2>
        <p className="text-gray-600">{profile.email}</p>
        <p className="text-sm text-gray-500">
          Bank Account: {profile.bankAccountNumber ?? "Not connected"}
        </p>
        <p className="italic text-gray-700 mt-2">
          {profile.bio ?? "No bio yet"}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;

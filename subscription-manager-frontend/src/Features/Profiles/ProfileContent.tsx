import { useState } from "react";
import type { Profile } from "../../app/models/profile";
import ProfileEditForm from "./ProfileEditForm";

interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const [activeTab, setActiveTab] = useState<"about" | "edit">("about");

  return (
    <div>
      <div className="flex justify-center mb-4 space-x-6">
        <button
          onClick={() => setActiveTab("about")}
          className={`px-4 py-2 rounded ${
            activeTab === "about" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab("edit")}
          className={`px-4 py-2 rounded ${
            activeTab === "edit" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Edit Profile
        </button>
      </div>

      {activeTab === "about" && (
        <div className="text-center">
          <p>{profile.bio ?? "No bio available"}</p>
        </div>
      )}

      {activeTab === "edit" && <ProfileEditForm profile={profile} />}
    </div>
  );
};

export default ProfileContent;

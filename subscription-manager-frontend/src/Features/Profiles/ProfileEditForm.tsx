import { Formik, Form } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import type { Profile } from "../../app/models/profile";
import { TextField, Button } from "@mui/material";
interface Props {
  profile: Profile;
}

const ProfileEditForm = ({ profile }: Props) => {
  const { profileStore } = useStore();
  const { updateProfile, updatingProfile } = profileStore;

  return (
    <Formik
      initialValues={{
        fullName: profile.fullName,
        bio: profile.bio ?? "",
        bankAccountNumber: profile.bankAccountNumber ?? "",
      }}
      validationSchema={Yup.object({
        fullName: Yup.string().required("Full name is required"),
      })}
      onSubmit={(values) =>
        updateProfile(profile.id, {
          ...profile,
          ...values,
        })
      }
    >
      {({ handleChange, handleSubmit, values }) => (
   <Form
  onSubmit={handleSubmit}
  className="flex flex-col gap-4 max-w-md mx-auto"
>
  <TextField
    label="Full name"
    name="fullName"
    value={values.fullName}
    onChange={handleChange}
    fullWidth
  />
  <TextField
    label="Bio"
    name="bio"
    value={values.bio}
    onChange={handleChange}
    fullWidth
  />
  <TextField
    label="Bank account number"
    name="bankAccountNumber"
    value={values.bankAccountNumber}
    onChange={handleChange}
    fullWidth
  />
  <Button
    type="submit"
    variant="contained"
    color="primary"
    disabled={updatingProfile}
  >
    {updatingProfile ? "Saving..." : "Save changes"}
  </Button>
</Form>

      )}
    </Formik>
  );
};

export default observer(ProfileEditForm);

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import type { Profile } from "../../app/models/profile";
import { TextField, Button, Box, Stack } from "@mui/material";

interface Props {
  profile: Profile;
}

const ProfileEditForm = ({ profile }: Props) => {
  const { profileStore } = useStore();
  const { updateProfile, updatingProfile } = profileStore;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 2,
      }}
    >
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
            style={{
              width: "100%",
              maxWidth: "700px", 
            }}
          >
            <Stack spacing={3}>
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
                multiline
                minRows={3}
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
                sx={{
                  alignSelf: "flex-end",
                  px: 4,
                  py: 1.2,
                }}
                disabled={updatingProfile}
              >
                {updatingProfile ? "Saving..." : "Save changes"}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default observer(ProfileEditForm);

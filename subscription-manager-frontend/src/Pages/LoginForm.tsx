import { observer } from "mobx-react-lite";
import "./LoginForm.css";
import { Formik, Form, Field } from "formik";
import { Button, TextField } from "@mui/material";
import { useStore } from "../stores/store";

export default observer(function LoginForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => userStore.login(values)}
    >
      {({ handleSubmit }) => (
        <Form color="White" onSubmit={handleSubmit}>
          <Field name="email" as={TextField} label="Email" fullWidth margin="normal" />
          <Field name="password" as={TextField} label="Password" type="password" fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
});

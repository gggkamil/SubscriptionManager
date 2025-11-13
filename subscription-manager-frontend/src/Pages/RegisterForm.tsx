import { observer } from "mobx-react-lite";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useStore } from "../app/stores/store";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required("Imię i nazwisko jest wymagane"),
    email: Yup.string().email("Niepoprawny email").required("Email jest wymagany"),
    password: Yup.string()
        .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
            "Hasło musi zawierać 6–20 liter, zawierać dużą literę, małą literę, cyfrę"
        )
        .required("Hasło jest wymagane"),
});

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ fullName: "", email: "", password: "" }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                    await userStore.register({
                        fullName: values.fullName,
                        email: values.email,
                        password: values.password,
                    });
                } catch (error: any) {
                    if (error?.response?.data?.errors) {
                        const apiErrors = error.response.data.errors;
                        const formattedErrors: Record<string, string> = {};
                        Object.keys(apiErrors).forEach(key => {
                            formattedErrors[key] = apiErrors[key].join(", ");
                        });
                        setErrors(formattedErrors);
                    } else {
                        setErrors({ email: "Rejestracja nie powiodła się." });
                    }
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ handleSubmit, isSubmitting, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <Field
                            name="fullName"
                            as={TextField}
                            label="Imię i nazwisko"
                            fullWidth
                            error={touched.fullName && Boolean(errors.fullName)}
                            helperText={touched.fullName && errors.fullName}
                        />
                    </Box>

                    <Box mb={2}>
                        <Field
                            name="email"
                            as={TextField}
                            label="Email"
                            fullWidth
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                    </Box>

                    <Box mb={2}>
                        <Field
                            name="password"
                            as={TextField}
                            label="Hasło"
                            type="password"
                            fullWidth
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </Box>

                    {errors.email && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {typeof errors.email === "string" ? errors.email : JSON.stringify(errors.email)}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        Utwórz użytkownika
                    </Button>
                </Form>
            )}
        </Formik>
    );
});

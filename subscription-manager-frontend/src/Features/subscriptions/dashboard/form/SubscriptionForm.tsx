import { observer } from "mobx-react-lite";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useStore } from "../../../../app/stores/store";

export default observer(function SubscriptionForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { subscriptionStore, userStore } = useStore();
  const { loadSubscriptions, subscriptions } = subscriptionStore;


  const subscription = subscriptions.find((s) => s.id === id);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!subscriptions.length) loadSubscriptions();
  }, [loadSubscriptions, subscriptions.length]);

  useEffect(() => {
    if (userStore.token && !userStore.user) {
      userStore.getCurrentUser();
    }
  }, [userStore]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Nazwa jest wymagana"),
    amount: Yup.number()
      .required("Opłata jest wymagana")
      .min(0, "Opłata musi być wyższa od 0"),
    frequency: Yup.string().required("Opis planu jest wymagana"),
    nextPaymentDate: Yup.date().required("Termin następnej opłaty jest wymagany"),
  });

  if (!userStore.user) {
    return <Typography>Ładuje dane użytkownika...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={3}>
        {isEditMode ? "Edytuj Subscrypcje" : "Utwórz Subscrypcje"}
      </Typography>

      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={{
          name: subscription?.name || "",
          amount: subscription?.amount || 0,
          frequency: subscription?.frequency || "",
          nextPaymentDate: subscription?.nextPaymentDate
            ? subscription.nextPaymentDate.substring(0, 10)
            : "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const payload = {
            id: subscription?.id, 
            name: values.name,
            amount: values.amount,
            frequency: values.frequency,
            nextPaymentDate: new Date(values.nextPaymentDate).toISOString(),
          };

          try {
            if (isEditMode) {
              await subscriptionStore.updateSubscription(payload as any);
            } else {
              await subscriptionStore.createSubscription(payload as any);
            }

            resetForm();
            navigate("/subscriptions");
          } catch (error) {
            console.error("Błąd podczas próby zapisu subscrypcji:", error);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nazwa"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Opłata"
              name="amount"
              type="number"
              value={values.amount}
              onChange={handleChange}
              error={touched.amount && !!errors.amount}
              helperText={touched.amount && errors.amount}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Opis planu"
              name="frequency"
              value={values.frequency}
              onChange={handleChange}
              error={touched.frequency && !!errors.frequency}
              helperText={touched.frequency && errors.frequency}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Termin następnej opłaty"
              name="nextPaymentDate"
              type="date"
              value={values.nextPaymentDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={touched.nextPaymentDate && !!errors.nextPaymentDate}
              helperText={touched.nextPaymentDate && errors.nextPaymentDate}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={subscriptionStore.submitting}
            >
              {isEditMode ? "Aktualizuj" : "Zapisz"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});

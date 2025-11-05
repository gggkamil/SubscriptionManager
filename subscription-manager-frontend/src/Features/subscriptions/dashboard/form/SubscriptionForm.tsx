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

  const subscription = subscriptions.find(s => s.id === id);

  useEffect(() => {
    if (!subscriptions.length) loadSubscriptions();
  }, [loadSubscriptions, subscriptions.length]);

  useEffect(() => {
    if (userStore.token && !userStore.user) {
      userStore.getCurrentUser();
    }
  }, [userStore]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    amount: Yup.number().required("Amount is required").min(0, "Amount must be positive"),
    frequency: Yup.string().required("Frequency is required"),
    nextPaymentDate: Yup.date().required("Next Payment Date is required"),
  });

  if (!userStore.user) {
    return <Typography>Loading user info...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={3}>
        {id ? "Edit Subscription" : "Create Subscription"}
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
  // payload matches Subscription entity exactly
  const payload = {
    name: values.name,
    amount: values.amount,
    frequency: values.frequency,
    nextPaymentDate: new Date(values.nextPaymentDate).toISOString(),
  };

  console.log("📤 Sending payload:", payload);

  try {
    if (id) {
      await subscriptionStore.updateSubscription(payload as any);
    } else {
      await subscriptionStore.createSubscription(payload as any);
    }
    resetForm();
    navigate("/subscriptions");
  } catch (error) {
    console.error("❌ Failed to save subscription:", error);
  }
}}

      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Amount"
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
              label="Frequency"
              name="frequency"
              value={values.frequency}
              onChange={handleChange}
              error={touched.frequency && !!errors.frequency}
              helperText={touched.frequency && errors.frequency}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Next Payment Date"
              name="nextPaymentDate"
              type="date"
              value={values.nextPaymentDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={touched.nextPaymentDate && !!errors.nextPaymentDate}
              helperText={touched.nextPaymentDate && errors.nextPaymentDate}
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});

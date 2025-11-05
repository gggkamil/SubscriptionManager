import { createBrowserRouter, Navigate } from "react-router-dom";
import SubscriptionDashboard from "../../Features/subscriptions/dashboard/SubscriptionDashboard";
import SubscriptionDetails from "../../Features/subscriptions/dashboard/details/SubscriptionDetails";
import LoginForm from "../../Pages/LoginForm";
import App from "../../App";
import SubscriptionForm from "../../Features/subscriptions/dashboard/form/SubscriptionForm";

export const router = createBrowserRouter([
 {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Navigate to="/login" /> },
      { path: "login", element: <LoginForm /> },
      { path: "subscriptions", element: <SubscriptionDashboard /> },
      { path: "subscriptions/:id", element: <SubscriptionDetails /> },
      { path: "createSubscription", element: <SubscriptionForm /> },

      { path: "*", element: <Navigate to="/subscriptions" /> },
    ],
  },
]);

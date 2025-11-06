import { createBrowserRouter, Navigate } from "react-router-dom";
import SubscriptionDashboard from "../../Features/subscriptions/dashboard/SubscriptionDashboard";
import SubscriptionDetails from "../../Features/subscriptions/dashboard/details/SubscriptionDetails";
import SubscriptionForm from "../../Features/subscriptions/dashboard/form/SubscriptionForm";
import LoginForm from "../../Pages/LoginForm";
import App from "../../App";
import RequireAuth from "../layout/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" /> },
      { path: "login", element: <LoginForm /> },


      {
  element: <RequireAuth />,
  children: [
    { path: "subscriptions", element: <SubscriptionDashboard /> },
    { path: "subscriptions/:id", element: <SubscriptionDetails /> },
    { path: "subscriptions/create", element: <SubscriptionForm /> },
    { path: "subscriptions/edit/:id", element: <SubscriptionForm /> },
  ],
},

   
      {
        path: "*",
        element: <Navigate to="/subscriptions" replace />,
      },
    ],
  },
]);

import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../stores/store";

export default observer(function RequireAuth() {
  const { userStore } = useStore();

  if (!userStore.isLoggedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
});

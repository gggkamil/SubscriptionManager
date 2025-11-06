import { Navigate, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";

export default observer(function RequireAuth() {
  const { userStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    if (userStore.token && !userStore.user) {
      userStore.getCurrentUser();
    }
  }, [userStore]);


  if (userStore.token && !userStore.user) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }


  if (!userStore.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return <Outlet />;
});

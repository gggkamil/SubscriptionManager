import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Outlet, useNavigate } from "react-router-dom";
import { useStore } from "./app/stores/store";
import { CircularProgress, Box } from "@mui/material";
import TopBar from "./app/layout/TopBar";

function App() {
  const { userStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userStore.token) {
      userStore.getCurrentUser().then(() => navigate("/subscriptions"));
    } else {
      navigate("/login");
    }
  }, [userStore, navigate]);

  if (userStore.token && !userStore.user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <TopBar /> 
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default observer(App);

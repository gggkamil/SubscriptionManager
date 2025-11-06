import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useStore } from "./app/stores/store";
import { CircularProgress, Box } from "@mui/material";
import TopBar from "./app/layout/TopBar";

function App() {
  const { userStore } = useStore();


  useEffect(() => {
    if (userStore.token && !userStore.user) {
      userStore.getCurrentUser();
    }
  }, [userStore]);


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

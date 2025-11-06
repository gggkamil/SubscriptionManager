import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

export default observer(function TopBar() {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    userStore.logout();
    navigate("/login");
  };

  const user = userStore.user;

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/subscriptions"
          sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}
        >
          Subscription Manager
        </Typography>

        {userStore.isLoggedIn && user && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" sx={{ color: "white" }}>
               {user.displayName || user.username || "User"}
            </Typography>

            <Button
              color="inherit"
              component={Link}
              to="/subscriptions/create"
              sx={{ mr: 1 }}
            >
              Add Subscription
            </Button>

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
});

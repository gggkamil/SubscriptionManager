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

        {userStore.isLoggedIn && (
          <Box>
            <Button
              color="inherit"
              component={Link}
              to="/createSubscription"
              sx={{ mr: 2 }}
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

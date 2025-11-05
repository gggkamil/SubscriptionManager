import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ServerError() {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>Server Error</Typography>
      <Typography>Sorry, something went wrong on our end.</Typography>
      <Button component={Link} to="/" sx={{ mt: 3 }} variant="contained">
        Back to Home
      </Button>
    </Box>
  );
}

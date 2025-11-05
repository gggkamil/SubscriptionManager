import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>Oops – we couldn’t find that page</Typography>
      <Button component={Link} to="/" variant="contained">
        Return Home
      </Button>
    </Box>
  );
}

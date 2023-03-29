import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const PaymentSuccess = () => {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Your payment was successful!
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Return to the Home page!
      </Button>
    </Box>
  );
};

export default PaymentSuccess;

import React, { useState } from "react";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { Link, useNavigate } from "react-router-dom";

const style = {
  inputContainer: {
    width: "350px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    border: "solid 1px lightGrey",
    borderRadius: "5px",
    backgroundColor: "white",
  },
};

const LoginAsGuest = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={style.inputContainer}>
          <Typography variant="h5" sx={{ color: "black", fontSize: "30px" }}>
            Checkout as a Guest
          </Typography>

          <FormControl
            sx={{ m: 1, width: "initial" }}
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          >
            <InputLabel htmlFor="my-input">Email</InputLabel>
            <OutlinedInput id="component-outlined" label="Email" />
          </FormControl>

          <Button
            variant="contained"
            sx={{
              margin: "20px auto",
              padding: "10px",

              backgroundColor: "#459C98",
              "&:hover": {
                backgroundColor: "#136A66",
              },
            }}
            //   onClick={emailSignIn}
          >
            Continue as Guest
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LoginAsGuest;

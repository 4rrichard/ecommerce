import { Box, Button, Typography } from "@mui/material";
import React from "react";

import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const style = {
  profileMenuContainer: {
    zIndex: "5",
    position: "absolute",
    top: "100%",
    right: "0",
    width: "200px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#136A66",
    borderRadius: "10px 0 10px 10px",
  },
  button: {
    color: "white",
  },
  loginBtn: {
    color: "white",
    backgroundColor: "#459C98",
    boxShadow: "none",
    border: "3px solid transparent",
    "&:hover": {
      backgroundColor: "rgba(69, 156, 152, 0.34)",
      boxShadow: "none",
      border: "3px solid #459C98",
    },
  },
  regBtn: {
    border: "3px solid white",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(69, 156, 152, 0.64)",
      border: "3px solid transparent",
    },
  },
};

const ProfileMenu = ({ mouseClick }) => {
  const [user] = useAuthState(auth);

  const userName = user && user.displayName.split(" ").slice(-1);
  return (
    <Box sx={style.profileMenuContainer}>
      {!user ? (
        <>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={style.loginBtn}
            onClick={mouseClick}
          >
            LOGIN
          </Button>
          <Button
            component={Link}
            to="/register"
            size="small"
            variant="outlined"
            sx={style.regBtn}
            onClick={mouseClick}
          >
            Register
          </Button>
        </>
      ) : (
        <>
          <Typography>Welcome {userName}!</Typography>
          <Logout />
        </>
      )}
    </Box>
  );
};

export default ProfileMenu;

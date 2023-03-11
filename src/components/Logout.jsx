import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Logout = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <Button
        onClick={handleSignOut}
        variant="text"
        sx={{
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(19, 106, 102, 0.14)",

            borderRadius: "10px ",
          },
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;

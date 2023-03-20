import { Box, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { auth } from "../firebase";
import SuccessfulLogOut from "./SuccessfulLogOut";

const Logout = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      handleOpen();
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
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <SuccessfulLogOut />
        </Box>
      </Modal>
    </>
  );
};

export default Logout;

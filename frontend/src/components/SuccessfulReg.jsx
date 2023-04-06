import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { ProductContext } from "../context/ContextProvider";

import { auth, db } from "../firebase";

import { Box, Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { collection, getDocs } from "firebase/firestore";

const style = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  btn: {
    mt: 2,
    backgroundColor: "#459C98",
    "&:hover": {
      backgroundColor: "#136A66",
    },
  },
};

const SuccessfulReg = () => {
  const [user] = useAuthState(auth);

  const { selectedProduct } = useContext(ProductContext);

  const [DBdata, setDBdata] = useState([]);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const checkout = async () => {
    const prods = [];

    DBdata.length !== 0 &&
      DBdata !== "[]" &&
      selectedProduct !== "[]" &&
      selectedProduct.length !== 0 &&
      selectedProduct.map((item1) => {
        DBdata.map((item2) => {
          if (item1.title === item2.name) {
            return prods.push({ ...item1, id: item2.id });
          }
        });
      });

    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: prods }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
        if (response.url === "http://localhost:5173/success") {
          if (user) {
            localStorage.removeItem(user.uid);
          } else {
            localStorage.removeItem("guest");
          }
        }
      });
  };

  useEffect(() => {
    (async () => {
      const prodDB = collection(db, "products");
      const snapshots = await getDocs(prodDB);

      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        return data;
      });
      setDBdata(docs);
    })();
  }, []);

  return (
    <Box sx={style.modal}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ color: "black" }}
      >
        You have successfully registered!
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Button
          id="modal-modal-description"
          variant="contained"
          sx={style.btn}
          onClick={goHome}
        >
          {localStorage.guest !== "[]" || localStorage.guest.length !== 0
            ? "Continue shopping"
            : "Start shopping"}
        </Button>
        <Button variant="contained" onClick={checkout} sx={style.btn}>
          Go to Payment
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessfulReg;

import { Box, Typography, Button } from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ContextProvider";
import { auth, db } from "../firebase";
import CartItems from "./CartItems";

import { collection, getDocs } from "firebase/firestore";

const style = {
  headerDescTitle: {
    flexBasis: "30%",
    flexGrow: "0",
    flexShrink: "0",
  },
  headerAmountTitle: {
    flexBasis: "calc(50% - 32px)",
    flexGrow: "0",
    flexShrink: "0",
  },
  headerPriceTitle: {
    flexBasis: "calc(5% - 32px)",
    flexGrow: "0",
    flexShrink: "0",
  },
  checkoutContainer: {
    maxWidth: "fit-content",
    margin: "20px auto 0 auto",
    padding: "20px",
    display: "flex",
    gap: { xs: "15px", md: "100px" },
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    backgroundColor: "#1F2223",
    color: "lightgrey",
  },
};

const Cart = () => {
  const [user] = useAuthState(auth);

  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  const navigate = useNavigate();

  const [checkDelete, setCheckDelete] = useState(false);
  const [DBdata, setDBdata] = useState([]);

  const calcQuantity =
    selectedProduct !== "[]" &&
    selectedProduct.length !== 0 &&
    selectedProduct
      .map((prod) => prod.price * prod.quantity)
      .reduce((total, currentValue) => total + currentValue, 0)
      .toFixed(2);

  useEffect(() => {
    const data = user
      ? localStorage.getItem(user.uid)
      : localStorage.getItem("guest");
    setSelectedProduct(JSON.parse(data));
  }, [checkDelete]);

  const checkout = async () => {
    if (!user) {
      navigate("/register");
    } else {
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
    }
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const prodDB = collection(db, "products");
        const snapshots = await getDocs(prodDB);

        const docs = snapshots.docs.map((doc) => {
          const data = doc.data();
          return data;
        });
        setDBdata(docs);
      })();
    }
  }, []);

  return (
    <Box sx={{ height: "500px", margin: "10%" }}>
      <Typography sx={{ fontSize: "40px", textAlign: "center" }}>
        Your cart
      </Typography>
      {selectedProduct !== "[]" && selectedProduct.length !== 0 ? (
        <>
          <Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },

                textAlign: "center",
                borderBottom: "solid 1px grey",
              }}
            >
              <Typography sx={style.headerDescTitle}>Description</Typography>
              <Typography sx={style.headerAmountTitle}>Amount</Typography>
              <Typography sx={style.headerPriceTitle}>Price</Typography>
            </Box>
            <Box>
              {selectedProduct !== "[]" &&
                selectedProduct.length !== 0 &&
                selectedProduct.map((product, id) => (
                  <CartItems
                    product={product}
                    key={id}
                    checkDelete={checkDelete}
                    setCheckDelete={setCheckDelete}
                  />
                ))}
            </Box>
          </Box>
          <Box sx={style.checkoutContainer}>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Cart total:
              </Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {calcQuantity} $
              </Typography>
            </Box>

            <Button variant="contained" onClick={checkout}>
              Checkout now
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ width: "100%", textAlign: "center", marginTop: "100px" }}>
          <Typography sx={{ fontSize: "24px", marginBottom: "20px" }}>
            Your cart is currently empty
          </Typography>
          <Button variant="contained" component={Link} to="/">
            Continue shopping
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;

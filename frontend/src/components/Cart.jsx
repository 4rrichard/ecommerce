import { Box, Typography, Button } from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ContextProvider";
import { auth, db } from "../firebase";
import CartItems from "./CartItems";

import { collection, query, getDocs } from "firebase/firestore";

const Cart = () => {
  const [user] = useAuthState(auth);

  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

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

  console.log(DBdata);

  return (
    <Box sx={{ height: "500px", margin: "10% 15%" }}>
      <Typography sx={{ fontSize: "40px", textAlign: "center" }}>
        Your cart
      </Typography>
      {selectedProduct !== "[]" && selectedProduct.length !== 0 ? (
        <>
          <Box>
            <Box
              sx={{
                display: "flex",

                textAlign: "center",
                borderBottom: "solid 1px grey",
              }}
            >
              <Typography sx={{ flex: 1 }}>Description</Typography>
              <Typography sx={{ flex: 1 }}>Amount</Typography>
              <Typography sx={{ flex: 1 }}>Price</Typography>
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
          <Box
            sx={{
              width: "70%",
              marginLeft: "15%",
              marginTop: "20px",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#1F2223",
              color: "lightgrey",
            }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Cart total:
            </Typography>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {calcQuantity} $
            </Typography>
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

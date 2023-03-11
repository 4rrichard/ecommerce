import { Box, Typography, Button } from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../App";
import CartItems from "./CartItems";

const Cart = () => {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  const [checkDelete, setCheckDelete] = useState(false);

  const calcQuantity =
    selectedProduct.length !== 0 &&
    selectedProduct
      .map((prod) => prod.price * prod.quantity)
      .reduce((total, currentValue) => total + currentValue, 0)
      .toFixed(2);

  useEffect(() => {
    const data = localStorage.getItem("user2");
    setSelectedProduct(JSON.parse(data));
  }, [checkDelete]);

  return (
    <Box sx={{ height: "500px", margin: "10% 15%" }}>
      <Typography sx={{ fontSize: "40px", textAlign: "center" }}>
        Your cart
      </Typography>
      {selectedProduct.length !== 0 ? (
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
              {selectedProduct.length !== 0 &&
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
            <Button variant="contained" component={Link} to="/login">
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

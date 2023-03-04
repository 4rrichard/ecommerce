import { Box, Typography } from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../App";
import CartItems from "./CartItems";

const Cart = () => {
  const selectedProduct = useContext(ProductContext);
  const products = selectedProduct.selectedProduct;

  const calcQuantity = products
    .map((prod) => prod.price * prod.quantity)
    .reduce((total, currentValue) => total + currentValue, 0)
    .toFixed(2);

  return (
    <Box sx={{ height: "500px", margin: "10% 15%" }}>
      <Typography sx={{ fontSize: "40px", textAlign: "center" }}>
        Your cart
      </Typography>
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
          {products !== "[]" &&
            products.map((product, id) => (
              <CartItems product={product} key={id} />
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
      </Box>
    </Box>
  );
};

export default Cart;

import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import React, { useContext, useState } from "react";
import { ProductContext } from "../App";
import CartItems from "./CartItems";

const Cart = () => {
  const selectedProduct = useContext(ProductContext);
  const products = selectedProduct.selectedProduct;

  return (
    <Box sx={{ height: "500px", margin: "30px" }}>
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
    </Box>
  );
};

export default Cart;

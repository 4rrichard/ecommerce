import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../App";

const SelectedProducts = () => {
  const selectedProduct = useContext(ProductContext);

  const products = selectedProduct.selectedProduct;

  console.log(typeof products);

  return (
    <Box
      sx={{
        backgroundColor: "grey",
        position: "absolute",
        right: "15px",
      }}
    >
      <Box>
        <Typography>1 product in your cart</Typography>
        <Typography>s</Typography>
        <Button variant="contained">Check Cart</Button>
      </Box>
      {products !== "[]" &&
        products.map((product, id) => (
          <Box
            sx={{
              width: "250px",
              height: "auto",
              padding: "10px",
              display: "flex",
              backgroundColor: "black",
            }}
            key={id}
          >
            <Box
              component="img"
              src={product.image}
              sx={{ width: "50px", marginRight: "10px" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>{product.title}</Typography>
              <Typography
                sx={{ fontWeight: "bold" }}
              >{`${product.price} $`}</Typography>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default SelectedProducts;

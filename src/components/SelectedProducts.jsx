import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../App";

const SelectedProducts = () => {
  const selectedProduct = useContext(ProductContext);

  const products = selectedProduct.selectedProduct;

  return (
    <Box
      sx={{
        position: "absolute",
        right: "15px",
        padding: "20px",
        backgroundColor: "grey",
      }}
    >
      {products !== "[]" && (
        <Box sx={{ paddingBottom: "10px" }}>
          <Typography sx={{ fontSize: "20px" }}>
            {products.length} product{products.length > 1 && "s"} in your cart
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
            {products.reduce(
              (total, currentValue) => (total = total + currentValue.price),
              0
            )}{" "}
            $
          </Typography>
          <Button variant="contained">Check Cart</Button>
        </Box>
      )}

      {products !== "[]" ? (
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
        ))
      ) : (
        <Typography sx={{ paddingTop: "10px" }}>Your cart is empty</Typography>
      )}
    </Box>
  );
};

export default SelectedProducts;

import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../App";

const SelectedProducts = ({ mouseClick }) => {
  const { selectedProduct } = useContext(ProductContext);

  const calcQuantity =
    selectedProduct.length !== 0
      ? selectedProduct
          .map((prod) => prod.price * prod.quantity)
          .reduce((total, currentValue) => total + currentValue, 0)
          .toFixed(2)
      : null;

  return (
    <Box
      sx={{
        zIndex: "5",
        position: "absolute",
        top: "80%",
        right: "24px",
        padding: "20px",
        backgroundColor: "#136A66",
        borderRadius: "10px 0 10px 10px",
      }}
    >
      {selectedProduct.length !== 0 ? (
        <Box sx={{ paddingBottom: "10px" }}>
          <Typography sx={{ fontSize: "20px" }}>
            {selectedProduct.reduce(
              (total, currentValue) => (total = total + currentValue.quantity),
              0
            )}{" "}
            product{selectedProduct.length > 1 && "s"} in your cart
          </Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
            {calcQuantity}$
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/cart"
            onClick={mouseClick}
          >
            Check Cart
          </Button>
          {}
        </Box>
      ) : (
        <Box sx={{ width: "100px" }}>
          <Typography>Your cart is empty</Typography>
        </Box>
      )}

      {selectedProduct !== 0 &&
        selectedProduct.map((product, id) => (
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
              <Typography sx={{ fontWeight: "bold" }}>{`${
                product.price * product.quantity
              } $`}</Typography>
              <Typography sx={{ fontWeight: "light" }}>
                Quantity: {product.quantity}
              </Typography>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default SelectedProducts;

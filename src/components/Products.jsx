import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../App";

const Products = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    allProducts,
    setSelectedProductPage,
  } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleClick = (chosenProduct) => {
    if (selectedProduct === "[]") {
      chosenProduct["quantity"] = 1;
      setSelectedProduct([chosenProduct]);
    } else if (selectedProduct.some((e) => e.id === chosenProduct.id)) {
      const data = JSON.parse(localStorage.getItem("user2"));
      for (let i = 0; i < data.length; i++) {
        if (chosenProduct.id === data[i].id) {
          data[i].quantity += 1;
        }
      }
      setSelectedProduct(data);
    } else {
      chosenProduct["quantity"] = 1;
      setSelectedProduct([...selectedProduct, chosenProduct]);
    }
  };


  const onProductClick = (product) => {
    const correction = {
      ".": "",
      ",": "",
      "---": "-",
      "--": "-",
      "'": "",
      "&": "",
      "/": "",
      "(": "",
      ")": "",
      "-–-": "-",
    };
    let productTitle = product.title.toLowerCase().split(" ").join("-");
    if (productTitle.at(-1) === "-") {
      productTitle = productTitle.slice(0, -1);
    }
    Object.keys(correction).forEach((key) => {
      productTitle = productTitle.replaceAll(key, correction[key]);
    });
    setSelectedProductPage(product);
    navigate(`/products/${productTitle}`);
  };

  return (
    <Box width={1}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        sx={{ margin: "10%" }}
      >
        {allProducts.map((fullProduct, id) => (
          <Box
            gridColumn="span 4"
            sx={{
              maxHeight: "500px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              border: "solid 1px grey",
              cursor: "pointer",
            }}
            key={id}
            onClick={() => onProductClick(fullProduct)}
          >
            <Box
              component="img"
              src={fullProduct.image}
              alt=""
              sx={{
                maxWidth: "100%",

                height: "150px",
                marginBottom: "20px",
                objectFit: "contain",
                display: "flex",
                justifyContent: "center",
              }}
            />
            <Typography
              sx={{
                color: "black",
              }}
            >
              {fullProduct.title}
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              {`${fullProduct.price} $`}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                onClick={() => handleClick(fullProduct)}
                sx={{
                  backgroundColor: "#459C98",
                  "&:hover": {
                    backgroundColor: "#136A66",
                  },
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Products;

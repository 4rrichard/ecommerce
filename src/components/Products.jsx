import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../App";

const Products = () => {
  const [product, setProduct] = useState([]);
  // const [savedProduct, setSavedProduct] = useState({});
  const { setSelectedProduct } = useContext(ProductContext);

  // localStorage.getItem("user");
  // savedProduct = savedProduct ? JSON.parse(savedProduct) : [];

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
      });
  }, []);

  const handleClick = (chosenProduct) => {
    setSelectedProduct(chosenProduct);
  };

  return (
    <Box width={1}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        sx={{ margin: "10%" }}
      >
        {product.map((fullProduct, id) => (
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

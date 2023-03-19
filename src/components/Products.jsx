import React, { useContext } from "react";

import { ProductContext } from "../context/ContextProvider";

import { Box } from "@mui/material";

import Product from "./Product";

const Products = () => {
  const { allProducts } = useContext(ProductContext);

  return (
    <Box width={1} sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        sx={{ margin: "10%" }}
      >
        {allProducts.map((fullProduct, id) => (
          <Product fullProduct={fullProduct} key={id} />
        ))}
      </Box>
    </Box>
  );
};

export default Products;

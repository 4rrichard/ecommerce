import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import React, { useContext, useState } from "react";
import { ProductContext } from "../App";

const Cart = () => {
  const selectedProduct = useContext(ProductContext);
  const products = selectedProduct.selectedProduct;

  console.log(products);

  const [counter, setCounter] = useState(1);

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
              <Box
                key={id}
                sx={{
                  paddingTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "solid 1px grey",
                }}
              >
                <Box
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    flex: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    sx={{ width: "70px", marginRight: "10px" }}
                  />
                  <Typography>{product.title}</Typography>
                </Box>
                <ButtonGroup
                  size="big"
                  aria-label="small outlined button group"
                  sx={{ height: "30px", flex: "1", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    disabled={counter >= product["countInStock"]}
                    onClick={() => {
                      setCounter(counter + 1);
                    }}
                  >
                    +
                  </Button>

                  {
                    <Button
                      disabled
                      sx={{
                        "&.Mui-disabled": {
                          background: "white",
                          color: "black",
                        },
                      }}
                    >
                      {counter}
                    </Button>
                  }

                  {
                    <Button
                      variant="contained"
                      disabled={counter <= 0}
                      onClick={() => {
                        setCounter(counter - 1);
                      }}
                    >
                      -
                    </Button>
                  }
                </ButtonGroup>

                {/* <Typography sx={{ flex: 1, textAlign: "center" }}>1</Typography> */}
                <Typography sx={{ flex: 1, textAlign: "center" }}>
                  {product.price} $
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;

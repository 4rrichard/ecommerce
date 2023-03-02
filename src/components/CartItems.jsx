import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext, useState } from "react";
import { ProductContext } from "../App";

const CartItems = ({ product }) => {
  const { setSelectedProduct } = useContext(ProductContext);

  const [counter, setCounter] = useState(product.quantity);

  const handleDelete = () => {
    const products = JSON.parse(localStorage.getItem("user"));

    console.log(products);

    const index = products.findIndex(
      (allProducts) => allProducts.id === product.id
    );

    if (index > -1) {
      products.splice(index, 1);
    }

    localStorage.setItem("user", JSON.stringify(products));
  };

  const quantityRaise = () => {
    const data = JSON.parse(localStorage.getItem("user"));

    for (let i = 0; i < data.length; i++) {
      if (product.id === data[i].id) {
        data[i].quantity += 1;
      }
    }
    console.log(data);
    setSelectedProduct(data);
  };
  const quantityReduce = () => {
    const data = JSON.parse(localStorage.getItem("user"));

    for (let i = 0; i < data.length; i++) {
      if (product.id === data[i].id) {
        data[i].quantity -= 1;
      }
    }
    console.log(data);
    setSelectedProduct(data);
  };

  return (
    <Box
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
        {
          <Button
            variant="contained"
            disabled={counter <= 0}
            onClick={() => {
              setCounter(counter - 1);
              quantityReduce();
            }}
          >
            -
          </Button>
        }

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

        <Button
          variant="contained"
          onClick={() => {
            setCounter(counter + 1);
            quantityRaise();
          }}
        >
          +
        </Button>
      </ButtonGroup>

      <Typography sx={{ flex: 1, textAlign: "center" }}>
        {product.price * counter} $
      </Typography>
      <IconButton
        aria-label="delete"
        sx={{
          height: "40px",
          padding: "0",
          alignItems: "flex-start",
          color: "white",
        }}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItems;

import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ProductContext } from "../context/ContextProvider";

const style = {
  btnRemove: {
    backgroundColor: "#459C98",
    "&:hover": {
      backgroundColor: "#136A66",
    },
    "&.Mui-disabled": {
      background: "lightgrey",
      color: "black",
      opacity: "30%",
    },
  },
  btnAdd: {
    backgroundColor: "#459C98",
    "&:hover": {
      backgroundColor: "#136A66",
    },
  },
};

const CartItems = ({ product, checkDelete, setCheckDelete }) => {
  const [user] = useAuthState(auth);

  const { setSelectedProduct } = useContext(ProductContext);

  const [counter, setCounter] = useState(product.quantity);

  const handleDelete = () => {
    const products = user
      ? JSON.parse(localStorage.getItem(user.uid))
      : JSON.parse(localStorage.getItem("guest"));

    const index = products.findIndex(
      (allProducts) => allProducts.id === product.id
    );

    if (index > -1) {
      products.splice(index, 1);
    }

    user
      ? localStorage.setItem(user.uid, JSON.stringify(products))
      : localStorage.setItem("guest", JSON.stringify(products));

    setCheckDelete(!checkDelete);
  };

  const data = user
    ? JSON.parse(localStorage.getItem(user.uid))
    : JSON.parse(localStorage.getItem("guest"));

  const quantityRaise = () => {
    const data = user
      ? JSON.parse(localStorage.getItem(user.uid))
      : JSON.parse(localStorage.getItem("guest"));
    for (let i = 0; i < data.length; i++) {
      if (product.id === data[i].id) {
        data[i].quantity += 1;
      }
    }
    setSelectedProduct(data);
  };

  const quantityReduce = () => {
    const data = user
      ? JSON.parse(localStorage.getItem(user.uid))
      : JSON.parse(localStorage.getItem("guest"));
    for (let i = 0; i < data.length; i++) {
      if (product.id === data[i].id) {
        data[i].quantity -= 1;
      }
    }
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
            disabled={counter <= 1}
            onClick={() => {
              setCounter(counter - 1);
              quantityReduce();
            }}
            sx={style.btnRemove}
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
          sx={style.btnAdd}
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

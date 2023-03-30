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
  productContainer: {
    paddingTop: "20px",
    paddingBottom: { xs: "20px", md: "0" },
    display: "flex",
    flexWrap: { xs: "wrap", md: "nowrap" },

    borderBottom: "solid 1px grey",
  },
  imgNameContainer: {
    display: "flex",
    flexBasis: { xs: "80%", md: "40%" },
    flexGrow: "0",
    flexShrink: "0",
    order: { xs: "1" },
  },
  imgContainer: {
    width: { xs: "70px", md: "120px" },
    height: { xs: "70px", md: "120px" },
    margin: "0 10px 10px 0",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  btnGroupContainer: {
    height: "30px",
    justifyContent: "center",
    flexBasis: { xs: "75%", md: "calc(30% - 32px)" },
    flexGrow: "0",
    flexShrink: "0",
    order: { xs: "3", md: "2" },
  },
  price: {
    textAlign: "center",
    flexBasis: { xs: "calc(25% - 32px)", md: "calc(28% - 32px)" },
    flexGrow: "0",
    flexShrink: "0",
    order: { xs: "4", md: "3" },
  },
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
  btnDelProd: {
    height: "40px",
    padding: "0",
    alignItems: "flex-start",
    color: "white",
    flexBasis: { xs: "calc(20% - 32px)", md: "calc(5% - 32px)" },
    flexGrow: "0",
    flexShrink: "0",
    order: { xs: "2", md: "4" },
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
    <Box sx={style.productContainer}>
      <Box sx={style.imgNameContainer}>
        <Box sx={style.imgContainer}>
          <Box component="img" src={product.image} sx={{ width: "auto" }} />
        </Box>

        <Typography sx={{ flex: "1" }}>{product.title}</Typography>
      </Box>
      <ButtonGroup
        size="big"
        aria-label="small outlined button group"
        sx={style.btnGroupContainer}
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

      <Typography sx={style.price}>{product.price * counter} $</Typography>
      <IconButton
        aria-label="delete"
        sx={style.btnDelProd}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItems;

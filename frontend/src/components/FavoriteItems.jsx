import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const style = {
  fullProductContainer: {
    paddingTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "solid 1px grey",
  },
  productImgTitleContainer: {
    marginBottom: "10px",
    display: "flex",
    flex: 1,
  },
  imgBg: {
    marginRight: "10px",
    padding: "2%",
    display: "flex",
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: "3px",
  },
  img: { maxWidth: "80px", height: "auto" },
  addToCartBtn: {
    backgroundColor: "#459C98",
    "&:hover": {
      backgroundColor: "#136A66",
    },
  },
  productPrice: { flex: 1, textAlign: "center" },
  delBtn: {
    height: "40px",
    padding: "0",
    alignItems: "flex-start",
    color: "white",
  },
};

const FavoriteItems = ({ product, checkDelete, setCheckDelete }) => {
  const handleDelete = () => {
    const products = JSON.parse(localStorage.getItem("userFavs"));

    const index = products.findIndex(
      (allProducts) => allProducts.id === product.id
    );

    if (index > -1) {
      products.splice(index, 1);
    }

    localStorage.setItem("userFavs", JSON.stringify(products));
    setCheckDelete(!checkDelete);
  };

  return (
    <Box sx={style.fullProductContainer}>
      <Box sx={style.productImgTitleContainer}>
        <Box sx={style.imgBg}>
          <Box component="img" src={product.image} sx={style.img} />
        </Box>
        <Box>
          <Typography>{product.title}</Typography>
          <Button variant="contained" sx={style.addToCartBtn}>
            Add to cart
          </Button>
        </Box>
      </Box>

      <Typography sx={style.productPrice}>{product.price} $</Typography>
      <IconButton aria-label="delete" sx={style.delBtn} onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default FavoriteItems;

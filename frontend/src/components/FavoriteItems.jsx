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
    flexBasis: { xs: "80%", md: "60%" },
    flexGrow: "0",
    flexShrink: "0",
  },
  imgBg: {
    width: { xs: "70px", md: "120px" },
    height: { xs: "70px", md: "120px" },
    marginRight: "10px",
    padding: "2%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "3px",
  },

  addToCartBtn: {
    maxWidth: "max-content",
    backgroundColor: "#459C98",
    "&:hover": {
      backgroundColor: "#136A66",
    },
  },
  productPrice: {
    flexBasis: { xs: "10%", md: "20%" },
    flexGrow: "0",
    flexShrink: "0",
    textAlign: "center",
  },
  delBtn: {
    height: "40px",
    padding: "0",
    alignItems: "flex-start",
    color: "white",
    flexBasis: { xs: "10%", md: "20%" },
    flexGrow: "0",
    flexShrink: "0",
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
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
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

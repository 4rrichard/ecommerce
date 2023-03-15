import { Box, Button, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../App";

const style = {
  product: {
    position: "relative",
    maxHeight: "350px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    border: "solid 1px grey",
    borderRadius: "5px",
    cursor: "pointer",
  },
  productImg: {
    maxWidth: "100%",

    height: "40%",
    marginBottom: "20px",
    objectFit: "contain",
    display: "flex",
    justifyContent: "center",
  },
  productTitle: { height: "20%", color: "black" },
  productPrice: {
    height: "10%",
    color: "black",
    fontWeight: "bold",
  },
  productBtn: {
    backgroundColor: "#459C98",
    "&:hover": {
      backgroundColor: "#136A66",
    },
  },
};

const Product = ({ fullProduct }) => {
  const { selectedProduct, setSelectedProduct, setSelectedProductPage } =
    useContext(ProductContext);

  const [isHoveringFavorite, setIsHoveringFavorite] = useState(false);

  const navigate = useNavigate();

  const handleAddToCart = (chosenProduct) => {
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

    if (isHoveringFavorite === false) {
      navigate(`/products/${productTitle}`);
    }
  };

  const onFavoriteIconClick = () => {
    console.log("added to favs");
  };

  const handleMouseOverFavoriteProd = () => {
    setIsHoveringFavorite(true);
  };

  const handleMouseOutFavoriteProd = () => {
    setIsHoveringFavorite(false);
  };

  return (
    <Box
      gridColumn="span 4"
      sx={style.product}
      onClick={() => onProductClick(fullProduct)}
    >
      <Box
        component="img"
        src={fullProduct.image}
        alt=""
        sx={style.productImg}
      />
      <Box sx={{ position: "absolute", top: "20px", right: "15px" }}>
        <IconButton
          onMouseOver={handleMouseOverFavoriteProd}
          onMouseOut={handleMouseOutFavoriteProd}
          onClick={onFavoriteIconClick}
        >
          {isHoveringFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      <Typography sx={style.productTitle}>{`${
        fullProduct.title.length >= 50
          ? fullProduct.title.substring(0, 50) + "..."
          : fullProduct.title
      }`}</Typography>
      <Typography sx={style.productPrice}>
        {`${fullProduct.price} $`}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="contained"
          onClick={() => handleAddToCart(fullProduct)}
          sx={style.productBtn}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Product;

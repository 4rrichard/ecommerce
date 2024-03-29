import { Box, Button, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ContextProvider";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
  productTitle: {
    height: "15%",
    width: "calc(100%)",
    color: "black",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
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
  favBtn: { position: "absolute", top: "20px", right: "15px" },
};

const Product = ({ fullProduct }) => {
  const [user] = useAuthState(auth);

  const {
    selectedProduct,
    setSelectedProduct,
    userFav,
    setUserFav,
    setSelectedProductPage,
  } = useContext(ProductContext);

  const [isHoveringFavorite, setIsHoveringFavorite] = useState(false);
  const [favSaved, setFavSaved] = useState(false);

  const navigate = useNavigate();

  const handleAddToCart = (chosenProduct, e) => {
    if (selectedProduct === "[]") {
      chosenProduct["quantity"] = 1;
      setSelectedProduct([chosenProduct]);
    } else if (selectedProduct.some((e) => e.id === chosenProduct.id)) {
      const data = user
        ? JSON.parse(localStorage.getItem(user.uid))
        : JSON.parse(localStorage.getItem("guest"));
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
    e.stopPropagation();
  };

  const handleAddToFavs = (chosenFav, e) => {
    if (userFav === "[]") {
      setUserFav([chosenFav]);
      setIsHoveringFavorite(true);
    } else if (userFav.some((e) => e.id === fullProduct.id)) {
      const favs = user
        ? JSON.parse(localStorage.getItem(`${user.uid}Favs`))
        : JSON.parse(localStorage.getItem("guestFavs"));

      const index = favs.findIndex(
        (allProducts) => allProducts.id === fullProduct.id
      );

      if (index > -1) {
        favs.splice(index, 1);
      }

      user
        ? localStorage.setItem(`${user.uid}Favs`, JSON.stringify(favs))
        : localStorage.setItem("guestFavs", JSON.stringify(favs));

      setIsHoveringFavorite(false);
      setFavSaved(!favSaved);
    } else {
      setUserFav([...userFav, chosenFav]);
      setIsHoveringFavorite(true);
    }
    e.stopPropagation();
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

  const handleMouseOverFavoriteProd = () => {
    setIsHoveringFavorite(true);
  };

  const handleMouseOutFavoriteProd = () => {
    setIsHoveringFavorite(false);
  };

  useEffect(() => {
    if (userFav !== "[]" && userFav?.length !== 0) {
      if (userFav?.some((e) => e.id === fullProduct.id)) {
        setIsHoveringFavorite(true);
      }
    }
  }, [userFav, isHoveringFavorite]);

  useEffect(() => {
    const favData = user
      ? localStorage.getItem(`${user.uid}Favs`)
      : localStorage.getItem("guestFavs");
    setUserFav(JSON.parse(favData));
  }, [favSaved]);

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
      <Box sx={style.favBtn}>
        <IconButton
          onMouseOver={handleMouseOverFavoriteProd}
          onMouseOut={handleMouseOutFavoriteProd}
          onClick={(e) => handleAddToFavs(fullProduct, e)}
        >
          {isHoveringFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      <Typography sx={style.productTitle}>{fullProduct.title}</Typography>

      <Typography sx={style.productPrice}>
        {`${fullProduct.price} $`}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="contained"
          onClick={(e) => handleAddToCart(fullProduct, e)}
          sx={style.productBtn}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Product;

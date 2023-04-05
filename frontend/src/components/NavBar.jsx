import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import HomeIcon from "@mui/icons-material/Home";

import { Button, Typography } from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { ProductContext } from "../context/ContextProvider";

import SelectedProducts from "./SelectedProducts";
import SearchResults from "./SearchResults";

import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";
import FavoritesMenu from "./FavoritesMenu";

const NavBar = () => {
  const { selectedProduct, userFav } = useContext(ProductContext);
  const [user] = useAuthState(auth);

  const [isHoveringCart, setIsHoveringCart] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [isHoveringFavs, setIsHoveringFavs] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleMouseOverCart = () => {
    setIsHoveringCart(true);
  };
  const handleMouseOutCart = () => {
    setIsHoveringCart(false);
  };

  const handleMouseOverProfile = () => {
    setIsHoveringProfile(true);
  };
  const handleMouseOutProfile = () => {
    setIsHoveringProfile(false);
  };

  const handleMouseOverFavs = () => {
    setIsHoveringFavs(true);
  };
  const handleMouseOutFavs = () => {
    setIsHoveringFavs(false);
  };

  const handleClickOutside = () => {
    setShowSearchResults(false);
  };

  const useOutsideClick = (callback) => {
    const ref = useRef();

    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("click", handleClick, true);

      return () => {
        document.removeEventListener("click", handleClick, true);
      };
    }, [ref]);

    return ref;
  };

  // const handleHeaderClick = (event) => {
  //   event.stopPropagation();
  // };

  const ref = useOutsideClick(handleClickOutside);

  const quantityProdDisplay =
    selectedProduct === "[]" || selectedProduct?.length === 0
      ? "0"
      : selectedProduct?.reduce(
          (total, currentValue) => (total = total + currentValue.quantity),
          0
        );

  const quantityFavsDisplay =
    userFav === "[]" || userFav?.length === 0 ? "0" : userFav?.length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          width: "100vw",
          backgroundColor: "#459C98",
          padding: { lg: "0 10%" },
        }}
      >
        <Toolbar>
          <Button
            component={Link}
            to="/"
            sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
          >
            WEBSHOP
          </Button>

          <IconButton
            component={Link}
            to="/"
            sx={{ display: { xs: "block", sm: "none" }, color: "white" }}
          >
            <HomeIcon />
          </IconButton>

          <SearchBar
            reference={ref}
            setSearchedProducts={setSearchedProducts}
            setShowSearchResults={setShowSearchResults}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Box
              onMouseOver={handleMouseOverFavs}
              onMouseOut={handleMouseOutFavs}
              sx={{
                position: "relative",
                "&:hover": {
                  backgroundColor: "#136A66",
                  borderRadius: "10px 10px 0 0",
                },
              }}
            >
              <IconButton
                size="large"
                aria-label="your favorites"
                color="inherit"
                sx={{
                  "&:hover": {
                    borderRadius: "10px ",
                  },
                }}
                component={Link}
                to="/favorites"
                onClick={handleMouseOutFavs}
              >
                <Badge badgeContent={quantityFavsDisplay} color="error">
                  <FavoriteBorderIcon />
                </Badge>

                <Typography
                  sx={{
                    display: { xs: "none", md: "flex" },
                    paddingLeft: "10px",
                    fontSize: "18px",
                  }}
                >
                  Favorites
                </Typography>
              </IconButton>
              {isHoveringFavs && (
                <FavoritesMenu mouseClick={handleMouseOutFavs} />
              )}
            </Box>

            <Box
              onMouseOver={handleMouseOverProfile}
              onMouseOut={handleMouseOutProfile}
              sx={{
                position: "relative",
                "&:hover": {
                  backgroundColor: "#136A66",
                  borderRadius: "10px 10px 0 0",
                },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                color="inherit"
                sx={{
                  marginRight: "1px",
                  "&:hover": {
                    borderRadius: "10px ",
                  },
                }}
                component={Link}
                to={!user ? "/login" : null}
                onClick={handleMouseOutProfile}
              >
                <AccountCircle />
                <Typography
                  sx={{
                    display: { xs: "none", md: "flex" },
                    paddingLeft: "10px",
                    fontSize: "18px",
                  }}
                >
                  Profile
                </Typography>
              </IconButton>
              {isHoveringProfile && (
                <ProfileMenu mouseClick={handleMouseOutProfile} />
              )}
            </Box>

            <Box
              onMouseOver={handleMouseOverCart}
              onMouseOut={handleMouseOutCart}
              sx={{
                position: "relative",
                "&:hover": {
                  backgroundColor: "#136A66",
                  borderRadius: "10px 10px 0 0",
                },
              }}
            >
              <IconButton
                size="large"
                aria-label="show products"
                color="inherit"
                onClick={handleMouseOutCart}
                component={Link}
                to="/cart"
              >
                <Badge badgeContent={quantityProdDisplay} color="error">
                  <ShoppingCartIcon />
                </Badge>
                <Typography
                  sx={{
                    display: { xs: "none", md: "flex" },
                    paddingLeft: "10px",
                    fontSize: "18px",
                  }}
                >
                  Cart
                </Typography>
              </IconButton>
              {isHoveringCart && (
                <SelectedProducts mouseClick={handleMouseOutCart} />
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {showSearchResults && searchedProducts.length !== 0 && (
        <SearchResults searchedProducts={searchedProducts} />
      )}
    </Box>
  );
};

export default NavBar;

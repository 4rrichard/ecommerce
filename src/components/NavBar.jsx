import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button, Typography, useMediaQuery } from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";

import { ProductContext } from "../App";

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

  // const [anchorEl, setAnchorEl] = useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const matches = useMediaQuery("(min-width:900px)");
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

  const handleHeaderClick = (event) => {
    event.stopPropagation();
  };

  const ref = useOutsideClick(handleClickOutside);

  const quantityProdDisplay =
    selectedProduct === "[]" || selectedProduct.length === 0
      ? "0"
      : selectedProduct.reduce(
          (total, currentValue) => (total = total + currentValue.quantity),
          0
        );

  const quantityFavsDisplay = userFav === "[]" ? "0" : userFav.length;

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
  //   </Menu>
  // );

  // const mobileMenuId = "primary-search-account-menu-mobile";
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem component={Link} to="/cart">
  //       <IconButton size="large" aria-label="show products" color="inherit">
  //         <Badge badgeContent={quantityProdDisplay} color="error">
  //           <ShoppingCartIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Your Cart</p>
  //     </MenuItem>

  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         size="large"
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton
  //         size="large"
  //         aria-label="login"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <LoginIcon />
  //       </IconButton>
  //       <p>Login</p>
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <Box sx={{ flexGrow: 1 }} onClick={handleHeaderClick}>
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

          <SearchBar
            reference={ref}
            setSearchedProducts={setSearchedProducts}
            setShowSearchResults={setShowSearchResults}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box
              onMouseOver={handleMouseOverFavs}
              onMouseOut={handleMouseOutFavs}
              sx={{
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
                {matches && (
                  <Typography sx={{ paddingLeft: "10px", fontSize: "18px" }}>
                    Favorites
                  </Typography>
                )}
              </IconButton>
              {isHoveringFavs && (
                <FavoritesMenu mouseClick={handleMouseOutFavs} />
              )}
            </Box>

            <Box
              onMouseOver={handleMouseOverProfile}
              onMouseOut={handleMouseOutProfile}
              sx={{
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
                to="/login"
                onClick={handleMouseOutProfile}
              >
                <AccountCircle />
                <Typography sx={{ paddingLeft: "10px", fontSize: "18px" }}>
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
                <Typography sx={{ paddingLeft: "10px", fontSize: "18px" }}>
                  Cart
                </Typography>
              </IconButton>
              {isHoveringCart && (
                <SelectedProducts mouseClick={handleMouseOutCart} />
              )}
            </Box>
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}

      {showSearchResults && searchedProducts.length !== 0 && (
        <SearchResults searchedProducts={searchedProducts} />
      )}
    </Box>
  );
};

export default NavBar;

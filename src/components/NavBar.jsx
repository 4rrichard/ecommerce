import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";

import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SelectedProducts from "./SelectedProducts";
import { ProductContext } from "../App";
import SearchResults from "./SearchResults";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavBar = () => {
  const { selectedProduct, allProducts } = useContext(ProductContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleSearchChange = (e) => {
    if (e.target.value) {
      const filteredProducts = allProducts.filter((prod) =>
        prod.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchedProducts(filteredProducts);
    } else if (e.target.value.length === 0) {
      setSearchedProducts([]);
    }
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

  const handleClickOnSearch = () => {
    setShowSearchResults(true);
  };

  // useEffect(() => {
  //   const timer = isHovering && setTimeout(onTimeOut, 1000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [isHovering]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const quantityDisplay =
    selectedProduct === "[]"
      ? "0"
      : selectedProduct.reduce(
          (total, currentValue) => (total = total + currentValue.quantity),
          0
        );

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={quantityDisplay} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Your Cart</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="login"
          aria-haspopup="true"
          color="inherit"
        >
          <LoginIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
    </Menu>
  );

  // useEffect(() => {

  //   setSearchedProducts()
  // }, [searchedProducts]);

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
          <Search
            onChange={handleSearchChange}
            ref={ref}
            onClick={handleClickOnSearch}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="your favorites"
              color="inherit"
            >
              <FavoriteBorderIcon />
            </IconButton>
            <Button variant="text" sx={{ color: "white" }}>
              LOGIN
            </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              component={Link}
              to="/cart"
            >
              <Badge badgeContent={quantityDisplay} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {isHovering && <SelectedProducts onMouseOver={handleMouseOver} />}
      {showSearchResults && searchedProducts.length !== 0 && (
        <SearchResults searchedProducts={searchedProducts} />
      )}
    </Box>
  );
};

export default NavBar;

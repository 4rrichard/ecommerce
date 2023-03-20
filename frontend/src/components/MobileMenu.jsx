import React from "react";

const MobileMenu = () => {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/cart">
        <IconButton size="large" aria-label="show products" color="inherit">
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
};

export default MobileMenu;

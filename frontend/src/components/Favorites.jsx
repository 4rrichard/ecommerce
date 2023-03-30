import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ContextProvider";
import { auth } from "../firebase";
import FavoriteItems from "./FavoriteItems";

const style = {
  favoritePageContainer: {
    width: "100vw",
    height: "90vh",
    display: "flex",
    flexDirection: { xs: "column-reverse", md: "row" },
    justifyContent: "center",
    alignItems: "center",
  },
  favoritePageLoginContainer: {
    flexBasis: "25%",
    flexGrow: "0",
    flexShrink: "0",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    border: "3px solid grey",
    borderRadius: "5px",
    backgroundColor: "black",
  },
  favoriteItemContainer: {
    paddingLeft: "30px",
    flexBasis: "65%",
    flexGrow: "0",
    flexShrink: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  favePageTitle: {
    borderBottom: "1px solid grey",
  },
  loginBtn: {
    width: "100%",
    marginBottom: "20px",
    backgroundColor: "#459C98",
    "&:hover": {
      backgroundColor: "#136A66",
    },
  },
  regBtn: {
    textAlign: "center",
    border: "2px solid white",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(69, 156, 152, 0.64)",
      border: "2px solid transparent",
    },
  },
};

const Favorites = () => {
  const [user] = useAuthState(auth);

  const { userFav, setUserFav } = useContext(ProductContext);

  const [checkDelete, setCheckDelete] = useState(false);

  useEffect(() => {
    const data = user
      ? localStorage.getItem(`${user.uid}Favs`)
      : localStorage.getItem("guestFavs");

    setUserFav(JSON.parse(data));
  }, [checkDelete]);

  return (
    <Box sx={style.favoritePageContainer}>
      <Box sx={style.favoritePageLoginContainer}>
        <Typography variant="h5">You don't have a profile yet!</Typography>
        <Typography>
          Login or Create a new account to save your favorites
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={style.loginBtn}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/register"
            sx={style.regBtn}
          >
            Create a new account
          </Button>
        </Box>
      </Box>
      <Box sx={style.favoriteItemContainer}>
        <Typography variant="h4" sx={style.favePageTitle}>
          Your favorites
        </Typography>

        <Box>
          {userFav !== "[]" &&
            userFav.length !== 0 &&
            [...userFav]
              .reverse()
              .map((product, id) => (
                <FavoriteItems
                  product={product}
                  key={id}
                  checkDelete={checkDelete}
                  setCheckDelete={setCheckDelete}
                />
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Favorites;

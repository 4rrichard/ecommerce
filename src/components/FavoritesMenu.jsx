import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../App";

const style = {
  favProdContainer: {
    zIndex: "5",
    position: "absolute",
    top: "80%",
    right: "229px",
    width: "auto",
    padding: "20px",
    backgroundColor: "#136A66",
    borderRadius: "10px 0 10px 10px",
  },
  checkFavsBtn: {
    color: "white",
    backgroundColor: "#459C98",
    boxShadow: "none",
    border: "3px solid transparent",
    "&:hover": {
      backgroundColor: "rgba(69, 156, 152, 0.34)",
      boxShadow: "none",
      border: "3px solid #459C98",
    },
  },
};

const FavoritesMenu = ({ mouseClick }) => {
  const { userFav } = useContext(ProductContext);

  return (
    <Box sx={style.favProdContainer}>
      {userFav.length !== 0 ? (
        <Box sx={{ paddingBottom: "10px" }}>
          <Button
            variant="contained"
            component={Link}
            to="/favorites"
            onClick={mouseClick}
            sx={style.checkFavsBtn}
          >
            Check Favorites
          </Button>
          {}
        </Box>
      ) : (
        <Box sx={{ width: "100px" }}>
          <Typography>You don't have favorites yet</Typography>
        </Box>
      )}

      <Box
        sx={{
          maxHeight: "300px",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {userFav.length !== 0 &&
          [...userFav].reverse().map((product, id) => (
            <Box
              sx={{
                width: "300px",
                height: "auto",
                padding: "10px",
                display: "flex",
                backgroundColor: "black",
              }}
              key={id}
            >
              <Box
                component="img"
                src={product.image}
                sx={{ width: "50px", marginRight: "10px" }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ width: "100%" }}>{product.title}</Typography>
                <Typography
                  sx={{ fontWeight: "bold" }}
                >{`${product.price} $`}</Typography>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default FavoritesMenu;

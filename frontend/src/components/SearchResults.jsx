import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ContextProvider";

const style = {
  searchResContainer: {
    zIndex: "5",
    position: "absolute",
    width: "300px",
    marginLeft: "90px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    backgroundColor: "#459C98",
    color: "white",
  },
  searchRes: {
    padding: "10px",
    backgroundColor: "#136A66",
    color: "white",
    fontSize: "15px",
    borderRadius: "5px",
    border: "3px solid transparent",
    "&:hover": {
      border: "3px solid white",
    },
  },
};

const SearchResults = ({ searchedProducts }) => {
  const { setSelectedProductPage } = useContext(ProductContext);

  const navigate = useNavigate();

  const onProductClick = (title) => {
    console.log(title);
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
    let productTitle = title.toLowerCase().split(" ").join("-");
    if (productTitle.at(-1) === "-") {
      productTitle = productTitle.slice(0, -1);
    }
    Object.keys(correction).forEach((key) => {
      productTitle = productTitle.replaceAll(key, correction[key]);
    });
    setSelectedProductPage(product);
    navigate(`/products/${productTitle}`);
  };

  return (
    <Box sx={style.searchResContainer}>
      {searchedProducts.map((prod, id) => (
        <Button key={id} sx={style.searchRes}>
          {prod.title}
        </Button>
      ))}
    </Box>
  );
};

export default SearchResults;

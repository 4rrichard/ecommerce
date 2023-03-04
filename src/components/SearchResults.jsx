import { Box, Typography } from "@mui/material";
import React from "react";

const SearchResults = ({ searchedProducts }) => {
  return (
    <Box
      sx={{
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
      }}
    >
      {searchedProducts.map((prod, id) => (
        <Typography
          key={id}
          sx={{ padding: "10px", backgroundColor: "black", fontSize: "15px" }}
        >
          {prod.title}
        </Typography>
      ))}
    </Box>
  );
};

export default SearchResults;

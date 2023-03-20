import { useContext } from "react";
import { ProductContext } from "../context/ContextProvider";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

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

const SearchBar = ({
  setSearchedProducts,
  setShowSearchResults,
  reference,
}) => {
  const { allProducts } = useContext(ProductContext);

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

  const handleClickOnSearch = () => {
    setShowSearchResults(true);
  };

  return (
    <Search
      onChange={handleSearchChange}
      ref={reference}
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
  );
};

export default SearchBar;

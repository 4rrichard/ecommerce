import { Box, Button, Rating, Typography, ButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../App";

const style = {
  productContainer: {
    position: "relative",
    width: "100vw",
    height: "90vh",
    padding: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: { height: "70%", padding: "5%", backgroundColor: "white" },
  img: {
    maxWidth: "100%",

    maxHeight: "100%",
    marginBottom: "20px",
    objectFit: "contain",
    display: "flex",
    justifyContent: "center",
  },
  detailContainer: {
    width: "100%",
    maxWidth: "30vw",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  button: {
    backgroundColor: "#459C98",
    "&:hover": {
      backgroundColor: "#136A66",
    },
  },
};

const ProductPage = () => {
  const { allProducts, selectedProduct, setSelectedProduct } =
    useContext(ProductContext);
  const { productName } = useParams();

  const [prod, setProd] = useState([]);
  const [counter, setCounter] = useState(1);

  const handleClick = () => {
    if (selectedProduct === "[]") {
      prod[0]["quantity"] = counter;
      setSelectedProduct([prod]);
    } else if (selectedProduct.some((e) => e.id === prod[0].id)) {
      const data = JSON.parse(localStorage.getItem("user2"));
      for (let i = 0; i < data.length; i++) {
        if (prod[0].id === data[i].id) {
          data[i].quantity += 1;
        }
      }
      setSelectedProduct(data);
    } else {
      prod[0]["quantity"] = counter;
      setSelectedProduct([...selectedProduct, prod[0]]);
    }
  };

  useEffect(() => {
    const prodArr = productName.split("-");
    setProd(
      allProducts.length !== 0 &&
        allProducts.filter((element) =>
          prodArr.every((item) => element.title.toLowerCase().includes(item))
        )
    );
  }, [productName, allProducts]);

  return (
    <Box sx={style.productContainer}>
      {prod !== undefined && prod !== false && prod.length !== 0 ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: "40px",
          }}
        >
          <Box sx={style.imgContainer}>
            <Box component="img" src={prod[0].image} alt="" sx={style.img} />
          </Box>
          <Box sx={style.detailContainer}>
            <Typography sx={{ color: "white", fontSize: "30px" }}>
              {prod[0].title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                minInlineSize: "max-content",
              }}
            >
              <Rating readOnly value={prod[0].rating.rate} />
              <Typography>
                {prod[0].rating.rate} ({prod[0].rating.count} review)
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
              {prod[0].price} $
            </Typography>

            <Box sx={{ display: "flex", gap: "10%" }}>
              <ButtonGroup
                size="big"
                aria-label="small outlined button group"
                sx={{ height: "100%", flex: "1", justifyContent: "center" }}
              >
                {
                  <Button
                    variant="contained"
                    disabled={counter <= 1}
                    onClick={() => {
                      setCounter(counter - 1);
                    }}
                    sx={{
                      "&.Mui-disabled": {
                        background: "lightgrey",
                        color: "black",
                        opacity: "30%",
                      },
                    }}
                  >
                    -
                  </Button>
                }

                {
                  <Button
                    disabled
                    sx={{
                      "&.Mui-disabled": {
                        background: "white",
                        color: "black",
                      },
                    }}
                  >
                    {counter}
                  </Button>
                }

                <Button
                  variant="contained"
                  sx={style.button}
                  onClick={() => {
                    setCounter(counter + 1);
                  }}
                >
                  +
                </Button>
              </ButtonGroup>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#459C98",
                  "&:hover": {
                    backgroundColor: "#136A66",
                  },
                }}
                onClick={handleClick}
              >
                Add to Cart
              </Button>
            </Box>
            <Button variant="contained" sx={style.button}>
              Add to Favorites
            </Button>
            <Typography variant="h5">Description of product:</Typography>
            <Typography>{prod[0].description}</Typography>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default ProductPage;

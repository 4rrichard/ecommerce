import { Box, Button, Rating, Typography, ButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../App";

const style = {
  productPageContainer: {
    position: "relative",
    width: "100vw",
    height: "90vh",
    padding: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productContainer: {
    width: "70%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    gap: "40px",
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
  ratingContainer: {
    display: "flex",
    gap: "10px",
    minInlineSize: "max-content",
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

  const prodArr = productName.split("-");
  const punctMarkArr = [".", ",", "---", "--", "'", "&", "/", "(", ")", "-–-"];

  const handleClick = () => {
    if (selectedProduct === "[]") {
      prod["quantity"] = counter;
      setSelectedProduct([prod]);
    } else if (selectedProduct.some((e) => e.id === prod.id)) {
      const data = JSON.parse(localStorage.getItem("user2"));
      for (let i = 0; i < data.length; i++) {
        if (prod.id === data[i].id) {
          data[i].quantity += 1;
        }
      }
      setSelectedProduct(data);
    } else {
      prod["quantity"] = counter;
      setSelectedProduct([...selectedProduct, prod]);
    }
  };

  useEffect(() => {
    if (allProducts.length !== 0) {
      allProducts.filter((element) => {
        if (
          element.title.toLowerCase().split(" ").length === prodArr.length &&
          prodArr.every((item) => element.title.toLowerCase().includes(item))
        ) {
          setProd(element);
        } else if (
          prodArr.every((item) => element.title.toLowerCase().includes(item))
        ) {
          setProd(element);
        } else if (
          punctMarkArr.some((el) => element.title.toLowerCase().includes(el))
        ) {
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
          let productTitle = element.title.toLowerCase().split(" ").join("-");
          if (productTitle.at(-1) === "-") {
            productTitle = productTitle.slice(0, -1);
          }
          Object.keys(correction).forEach((key) => {
            productTitle = productTitle.replaceAll(key, correction[key]);
          });

          if (productTitle === productName) {
            setProd(element);
          }
        }
      });
    }
  }, [productName, allProducts]);

  return (
    <Box sx={style.productPageContainer}>
      {prod !== undefined && prod !== false && prod.length !== 0 ? (
        <Box sx={style.productContainer}>
          <Box sx={style.imgContainer}>
            <Box component="img" src={prod.image} alt="" sx={style.img} />
          </Box>
          <Box sx={style.detailContainer}>
            <Typography sx={{ color: "white", fontSize: "30px" }}>
              {prod.title}
            </Typography>
            <Box sx={style.ratingContainer}>
              <Rating readOnly value={prod.rating.rate} />
              <Typography>
                {prod.rating.rate} ({prod.rating.count} review)
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
              {prod.price} $
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
            <Typography>{prod.description}</Typography>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default ProductPage;

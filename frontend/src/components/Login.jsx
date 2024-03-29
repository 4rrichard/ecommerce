import React, { useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Button, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import GoogleButton from "react-google-button";

import { Link, useNavigate } from "react-router-dom";
import LoginAsGuest from "./LoginAsGuest";

const style = {
  boxContainer: {
    width: "100vw",
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    backgroundColor: "#333",
  },
  inputContainer: {
    width: "350px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    border: "solid 1px lightGrey",
    borderRadius: "5px",
    backgroundColor: "white",
  },
};

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [loginError, setLoginError] = useState(false);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const googleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const emailSignIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (!Object.keys(localStorage).includes(user.uid)) {
          localStorage.setItem(user.uid, JSON.stringify([]));
        }
        if (!Object.keys(localStorage).includes(`${user.uid}Favs`)) {
          localStorage.setItem(`${user.uid}Favs`, JSON.stringify([]));
        }
        setLoading(false);
        navigate("/");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setLoginError(true);
        console.log(errorCode, errorMessage);
      });
  };

  const handleChange = (key) => (event) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/checkout");
  //   }
  // }, [user]);

  return (
    <Box sx={style.boxContainer}>
      <Box>
        {loading && loginError === false ? (
          <CircularProgress />
        ) : (
          <Box sx={style.inputContainer}>
            <FormControl
              sx={{ m: 1, width: "initial" }}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            >
              <InputLabel htmlFor="my-input">Email</InputLabel>
              <OutlinedInput id="component-outlined" label="Email" />
            </FormControl>
            <FormControl
              sx={{ m: 1, width: "initial", marginBottom: "10px" }}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />

              <Button
                variant="contained"
                sx={{
                  marginTop: "20px",
                  backgroundColor: "#459C98",
                  "&:hover": {
                    backgroundColor: "#136A66",
                  },
                }}
                onClick={emailSignIn}
              >
                Log In
              </Button>
              {loginError && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Email or Password is wrong — <strong>try again!</strong>
                </Alert>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <Button size="small" variant="text" sx={{ color: "#459C98" }}>
                  Forgot password?
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  size="small"
                  variant="text"
                  sx={{ color: "#459C98" }}
                >
                  Register
                </Button>
              </Box>
            </FormControl>
            <Divider sx={{ marginBottom: "20px" }}>OR</Divider>
            <GoogleButton
              onClick={googleSignIn}
              type="light"
              style={{ margin: "auto" }}
            />
          </Box>
        )}
      </Box>
      {/* <LoginAsGuest /> */}
    </Box>
  );
};

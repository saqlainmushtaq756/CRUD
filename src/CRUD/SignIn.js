import React, { useState } from "react";
import {
  Box,
  Button,
  Grid2,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import logo from "./assets/images/logo.png";
import logo2 from "./assets/images/logo2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [visibility, setVisibility] = useState(false);
  const [inputValues, setInputValues] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [rejectMessage, setRejectMessage] = useState("");

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  // Handle username validation and state
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length <= 5) {
      setUsernameError(true);
      setHelperText("Username must be greater than 5 characters");
    } else {
      setUsernameError(false);
      setHelperText("");
    }
  };

  // Handle password validation
  const handleChange = (e) => {
    const values = e.target.value;
    setInputValues(values);

    if (values?.length <= 5) {
      setPasswordError(true);
      setHelperText("Password must be greater than 5 characters");
    } else {
      setPasswordError(false);
      setHelperText("");
    }
  };

  const handlesubmit = () => {
    apiDataIs();
    setUsername("");
    setInputValues("");
  };

  // Simulate API request and handle success/error
  const apiDataIs = async () => {
    await axios
      .post("http://localhost:5000/api/login/user", {
        username: username,
        password: inputValues,
      })
      .then((response) => {
        if (response.data.status === 200) {
          setAlertMessage("Login successful!");
          setTimeout(() => {
            setAlertMessage("");
            setUsername("");
            setInputValues("");
            navigate("/");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log("error.....", error);
        setRejectMessage("Please Enter valid informations");

        setTimeout(() => {
          setRejectMessage("");
        }, 3000);
      });
  };
  const navigate = useNavigate();

  return (
    <>
      <Grid2 container height={"100vh"} sx={{ position: "relative" }}>
        <Grid2 size={7} bgcolor={"#1A6C71"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  color: "#ffff",
                }}
              >
                Breathability Made SimpleEnhancing Patient Comfort. s
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "500",
                  fontFamily: "Poppins",
                  textAlign: "left",
                  textJustify: "auto",
                  color: "#ffff",
                  justifyContent: "center",
                  mt: "5px",
                }}
              >
                Union Health Services (UHS) is a leading provider of
                high-quality allergy solutions, empowering healthcare providers
                to deliver comprehensive allergy care directly to their patients
                within the comfort and convenience of their office settings.
                With a wide range of services, including allergy testing and
                personalized allergy shots and drops, Allergy testing, shots,
                medicine, and management. Symptoms include sun rash, seasonal,
                gluten, food, and peanut allergies, we are dedicated to
                improving the lives of allergy sufferers across the United
                States.s
              </Typography>
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={5} bgcolor={"#fafafa"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100vh",
              position: "relative",
            }}
          >
            <Box position={"absolute"} top={"10px"} right={"10px"}>
              <img src={logo} alt="right pic" height={"80px"} />
            </Box>
            <Box
              border={"1px solid #ffff"}
              sx={{
                alignItems: "center",
                height: 450,
                backgroundColor: "#ffff",
                width: 400,
                boxShadow: "2px 2px 0.8rem black ",
                position: "absolute",
                top: "20%",
                right: "55%",
                borderRadius: "10%",
              }}
            >
              <Box m={3} my={5} p={1}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    mb: "10px",
                    fontFamily: "Inter",
                  }}
                >
                  Welcome to
                  <span
                    style={{
                      color: "#1A6C71",
                      marginLeft: "5px",
                      fontFamily: "Inter",
                    }}
                  >
                    UNION HEALTH SOLUTIONS
                  </span>
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, fontFamily: "Inter" }}
                >
                  Sign in
                </Typography>
                <Box my={3} sx={{ fontFamily: "Inter" }}>
                  <Stack my={1}>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Inter", mb: "5px" }}
                    >
                      Enter your username
                    </Typography>
                    <TextField
                      placeholder="Enter your username"
                      size="small"
                      value={username}
                      onChange={handleUsernameChange}
                      error={usernameError}
                      helperText={usernameError ? helperText : ""}
                      inputProps={{
                        type: "text",
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <PersonOutlineIcon
                              sx={{
                                color: "#0F0F0F",
                                fontSize: "16px",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>

                  {/* password area */}
                  <Stack>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Inter", mb: "5px" }}
                    >
                      Enter your Password
                    </Typography>
                    <TextField
                      type={visibility ? "text" : "password"}
                      placeholder="password"
                      size="small"
                      error={passwordError}
                      helperText={passwordError ? helperText : ""}
                      value={inputValues}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => handleVisibility()}>
                              {visibility ? (
                                <VisibilityIcon
                                  sx={{
                                    color: "#0F0F0F",
                                    fontSize: "16px",
                                  }}
                                />
                              ) : (
                                <VisibilityOffIcon
                                  sx={{
                                    color: "#0F0F0F",
                                    fontSize: "16px",
                                  }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    fontFamily: "Poppins",
                    backgroundColor: "#1A6C71",
                    fontSize: "12px",
                    fontWeight: 500,
                    textDecoration: "",
                  }}
                  onClick={handlesubmit}
                >
                  Sign in
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
      {/* for alert message  */}
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          left: "2%",
          width: "30%",
        }}
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          {alertMessage && (
            <Alert severity="success" sx={{ backgroundColor: "#C8E6C9" }}>
              {alertMessage}
            </Alert>
          )}
        </Stack>
        <Stack sx={{ width: "100%" }} spacing={2}>
          {rejectMessage && (
            <Alert severity="error" sx={{ backgroundColor: "#FFCDD2" }}>
              {rejectMessage}
            </Alert>
          )}
        </Stack>
      </Box>
    </>
  );
}

export default SignIn;

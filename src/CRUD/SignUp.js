import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [alertMessage, setalertmessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigation = useNavigate();
  const handleClick = () => {
    const apidata = async () => {
      try {
        await axios
          .post("http://localhost:5000/api/create/user", {
            id: userId,
            username: userName,
            fullname: fullName,
            password: newPassword,
          })
          .then((res) => {
            console.log("ye raha data jani", res.data.status);
            if (res.data.status === 201) {
              setalertmessage("User added successfullly!");
            }
            setTimeout(() => {
              navigation("/");
            }, 1000);
          });
      } catch (error) {
        console.error("api error...", error);
      }
    };
    setUserName("");
    setFullName("");
    setnewPassword("");
    setUserId("");
    apidata();
    setOpenSnackbar(true);
  };
  const handleClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <>
      <Typography variant="h5" textAlign={"center"} mt={5}>
        Sign Up form
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "20px",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <TextField
          size="small"
          label="User ID"
          type="number"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="User Name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="Full Name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <TextField
          size="small"
          label="password"
          value={newPassword}
          onChange={(e) => {
            setnewPassword(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            handleClick();
          }}
        >
          Submit
        </Button>
      </Box>
      <Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={500}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default SignUp;

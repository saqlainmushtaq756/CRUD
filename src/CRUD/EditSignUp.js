import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditSignUp() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    EditApi();
    setOpen(true);
  };
  const EditApi = async () => {
    try {
      await axios
        .put(`http://localhost:5000/api/updateuser/${id}`, {
          id: userId,
          username: userName,
          fullname: userFullName,
          password: userPassword,
        })
        .then((res) => {
          if (res.data.status === 200) {
            setAlertMessage("Updated successfully");
            setTimeout(() => {
              navigation("/");
            }, 1000);
          }
        })
        .catch((err) => {
          console.log("error in api....", err);
        });
    } catch (error) {
      console.log("Api error.......", error);
    }
  };
  const getSingleApi = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/getuser?id=${id}`)
        .then((response) => {
          setUserId(response.data.data.id);
          setUserFullName(response.data.data.fullname);
          setUserName(response.data.data.username);
          setUserPassword(response.data.data.password);
        })
        .catch((err) => {
          console.log(alert("api error kindly check your Api", err));
        });
    } catch (error) {
      console.error("error in api...", error);
    }
  };
  useEffect(() => {
    getSingleApi();
  });
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Typography variant="h5" textAlign={"center"} mt={5}>
        Update Sign Up form
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
          // label="User ID"
          disabled
          type="number"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <TextField
          size="small"
          // label="User Name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          size="small"
          // label="Full Name"
          value={userFullName}
          onChange={(e) => {
            setUserFullName(e.target.value);
          }}
        />
        <TextField
          size="small"
          // label="password"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value);
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
          Update
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default EditSignUp;

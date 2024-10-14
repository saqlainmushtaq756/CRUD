import React, { useEffect, useState } from "react";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import SingUp from "./SignUp.js";
import { Link, useNavigate } from "react-router-dom";
import EditSignUp from "./EditSignUp.js";

const Home = () => {
  const [newRows, setNewRows] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);

  const ApiData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get/users");
      setNewRows(response.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    ApiData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "User Name", width: 150, editable: true },
    { field: "fullname", headerName: "Full Name", width: 150, editable: true },
    {
      field: "password",
      headerName: "Password",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon />
            </IconButton>
            {/* </Link> */}
            <IconButton aria-label="d" onClick={() => handleDelete(params.row)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = newRows?.map((item, index) => ({
    key: index + 1,
    id: item?.id,
    username: item?.username,
    fullname: item?.fullname,
    password: item?.password,
  }));

  const handleEdit = (row) => {
    // console.log("this is id :", row.id);
    navigation(`/editsignup/${row.id}`);
  };
  const deletApi = async (row) => {
    try {
      await axios
        .delete(`http://localhost:5000/api/deleteuser?id=${row.id}`)
        .then((res) => {
          if (res.data.status === 200) {
            setAlertMessage("Deleted Successfully!");
            // setTimeout(() => {
            //   setAlertMessage(""); // Clear message after 3 seconds
            // }, 2000);
          }
        });
      ApiData();
    } catch (error) {
      console.error("Error in Api", error);
    }
  };
  const handleDelete = (row) => {
    deletApi(row);
    setOpen(true);
  };
  const navigation = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
            height: "100vh",
            mx: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // width: "70%",
              mt: 2,
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                navigation("/signin");
              }}
            >
              <WestIcon fontSize="small" />
              <Typography ml={1} fontSize={12}>
                Signin
              </Typography>
            </Button>
            <Typography variant="h5">This is Data Grid</Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                navigation("/signup");
              }}
            >
              <Typography mr={1} fontSize={12}>
                Signup
              </Typography>
              <EastIcon fontSize="small" />
            </Button>
          </Box>
          <Box sx={{ height: 400 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 15]}
              // pageSize={5}
              getRowId={(row) => row?.key}
            />
          </Box>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
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
      </Box>
    </>
  );
};

export default Home;

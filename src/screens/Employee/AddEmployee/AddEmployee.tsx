import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UrlConstants } from "../../../global/UrlConstants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Typography: {
      color: "black",
      paddingTop: "0.3rem",
      paddingLeft: "2.2rem",
      textAlign: "left",
    },
    input: {
      minWidth: 290,
      minHeight: 20,
    },
    select: {
      width: 295,
      height: 27,
    },
    mainBox: {
      backgroundColor: "#f2f1ed",
    },
    root: {
      width: 360,
    },
  })
);

export default function AddEmployee(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const [edit, setEdit] = useState(props.history.location.state?.data);
  const [employeeData, setEmployeeData] = useState({
    id: edit?.id ?? "",
    name: edit?.name ?? "",
    phone: edit?.phone ?? "",
    circle: edit?.circle ?? "",
    password: edit?.password ?? "",
    role: edit?.role ?? "Engineer",
    status: edit?.status ?? "Active",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (edit) {
      axios
        .patch(`${UrlConstants.baseUrl}/updateEmployee`, employeeData)
        .then(function (response) {
          toast.success("Successfully Updated!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => history.push("/employees"), 700);
        })
        .catch(function (error) {
          toast.error("Error while updating!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      axios
        .post(`${UrlConstants.baseUrl}/addEmployee`, employeeData)
        .then(function (response) {
          console.log(response);
          console.log("sucessfully added");
        })
        .catch(function (error) {
          console.log(error);
          console.log("error came");
        });
      toast.success("Successfully saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      history.push("/employees");
    }
  };

  const handleInputChange = (event: any) => {
    setEmployeeData({
      ...employeeData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "0.8rem",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className={classes.mainBox}
      >
        <Paper className={classes.root} elevation={16}>
          <Typography
            variant="h4"
            sx={{ paddingTop: 6, paddingBottom: 3, fontFamily: "sans-serif" }}
          >
            {edit ? `Update Engineer` : `Add Engineer`}
          </Typography>
          <Typography className={classes.Typography}>Name</Typography>
          <Grid item xs>
            <Box>
              <input
                className={classes.input}
                autoComplete="new-password"
                name="name"
                value={employeeData.name}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>Phone</Typography>
            <Box>
              <input
                className={classes.input}
                autoComplete="new-password"
                name="phone"
                value={employeeData.phone}
                type="tel"
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>Circle</Typography>
            <Box>
              <input
                className={classes.input}
                autoComplete="new-password"
                name="circle"
                value={employeeData.circle}
                type="tel"
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          {!edit && (
            <Grid className={classes.input} item xs>
              <Typography className={classes.Typography}>Password</Typography>
              <Box>
                <input
                  className={classes.input}
                  autoComplete="new-password"
                  name="password"
                  value={employeeData.password}
                  type="tel"
                  onChange={handleInputChange}
                />
              </Box>
            </Grid>
          )}

          <Grid item xs>
            <Typography className={classes.Typography}>Status</Typography>
            <select
              className={classes.select}
              id="product"
              name="status"
              value={employeeData.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </Grid>
          <Button
            style={{
              color: "white",
              backgroundColor: "#f44336",
              marginTop: 20,
              marginBottom: 28,
              minWidth: 120,
            }}
            type="submit"
          >
            Submit
          </Button>
        </Paper>
      </Box>
      <ToastContainer />
    </div>
  );
}

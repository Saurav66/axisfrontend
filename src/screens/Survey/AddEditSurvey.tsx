import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UrlConstants } from "../../global/UrlConstants";

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

export default function AddEditSurvey(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const [circleOptions, setCircleOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [subDivisionOptions, setSubDivisionOptions] = useState([]);
  const [edit, setEdit] = useState(props.history.location.state?.data);
  const [surveyObj, setSurveyObj] = useState({
    id: edit?.id ?? "",
    city: edit?.city ?? props.history.location.state?.selectedCity,
    circle: edit?.circle ?? "",
    division: edit?.division ?? "",
    subdivision: edit?.subdivision ?? "",
    endLocationAddress: edit?.endLocationAddress ?? "",
    itHardwareName: edit?.itHardwareName ?? "",
    model: edit?.model ?? "",
    serialNo: edit?.serialNo ?? "",
    upsBatteryStatus: edit?.upsBatteryStatus ?? "",
    windowsType: edit?.windowsType ?? "",
    domainJoiningStatus: edit?.domainJoiningStatus ?? "",
    utilityContactPersonName: edit?.utilityContactPersonName ?? "",
    utilityContactPersonContact: edit?.utilityContactPersonContact ?? "",
  });

  useEffect(() => {
    document.title = edit ? `Update Survey` : `Add Survey`;
    if (circleOptions.length === 0) {
      getCircles();
    }
  }, []);

  const getCircles = async () => {
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getAllCircles`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {});
    setCircleOptions(response);
  };

  const handleValidation = () => {
    if (!surveyObj.city) {
      toast.error("Please Enter City!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    if (!surveyObj.circle) {
      toast.error("Please Enter Circle!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    if (!surveyObj.utilityContactPersonName) {
      toast.error("Please Enter Name Of Utility Contact Person!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: any) => {
    console.log("surveyObj", surveyObj);
    e.preventDefault();
    if (handleValidation()) {
      if (edit) {
        axios
          .patch(`${UrlConstants.baseUrl}/updateSurvey`, surveyObj)
          .then(function (response) {
            toast.success("Survey Updated!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => history.push("/survey"), 700);
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
          .post(`${UrlConstants.baseUrl}/addSurvey`, surveyObj)
          .then(function (response) {
            console.log(response);
            console.log("Survey Added");
            toast.success("Survey Added!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => history.push("/survey"), 700);
          })
          .catch(function (error) {
            console.log(error);
            console.log("error came");
            toast.error("Erro while adding Survey!", {
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
      }
    }
  };

  const handleInputChange = (event: any) => {
    setSurveyObj({
      ...surveyObj,
      [event.target.name]: event.target.value,
    });
  };

  const handleLocationChange = async (event: any) => {
    setSurveyObj({
      ...surveyObj,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "circle") {
      const response = await axios
        .get(
          `${UrlConstants.baseUrl}/getAllDivisionByCircle/${event.target.value}`
        )
        .then((response: any) => {
          return response.data;
        })
        .catch((error) => {});
      setDivisionOptions(response);
    }
    if (event.target.name === "division") {
      const response = await axios
        .get(
          `${UrlConstants.baseUrl}/getAllSubDivisionByDivision/${event.target.value}`
        )
        .then((response: any) => {
          return response.data;
        })
        .catch((error) => {});
      setSubDivisionOptions(response);
    }
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
            {edit ? `Update Survey` : `Add Survey`}
          </Typography>
          <Typography className={classes.Typography}>City</Typography>
          <Grid item xs>
            <Box>
              <input
                className={classes.input}
                autoComplete="new-password"
                name="city"
                value={surveyObj.city}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid item xs>
            <Typography className={classes.Typography}>
              * District/Circle
            </Typography>
            <select
              className={classes.select}
              name="circle"
              value={surveyObj.circle}
              onChange={handleLocationChange}
            >
              <option value={edit ? surveyObj.circle : `pleaseSelect`}>
                {edit ? surveyObj.circle : `Please Select`}
              </option>
              {circleOptions.map((x, y) => (
                <option key={y} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs>
            <Typography className={classes.Typography}>Division</Typography>
            <select
              className={classes.select}
              id="division"
              name="division"
              value={surveyObj.division}
              onChange={handleLocationChange}
            >
              <option value={edit ? surveyObj.division : `pleaseSelect`}>
                {edit ? surveyObj.division : `pleaseSelect`}
              </option>
              {divisionOptions.map((x, y) => (
                <option key={y} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs>
            <Typography className={classes.Typography}>Sub Division</Typography>
            <select
              className={classes.select}
              name="subdivision"
              value={surveyObj.subdivision}
              onChange={handleLocationChange}
            >
              <option value={edit ? surveyObj.subdivision : `pleaseSelect`}>
                {edit ? surveyObj.subdivision : `pleaseSelect`}
              </option>
              {subDivisionOptions.map((x, y) => (
                <option key={y} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>
              End Location Address
            </Typography>
            <Box>
              <input
                className={classes.input}
                name="endLocationAddress"
                value={surveyObj.endLocationAddress}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>
              IT Hardware Name
            </Typography>
            <Box>
              <input
                className={classes.input}
                name="itHardwareName"
                value={surveyObj.itHardwareName}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>Model</Typography>
            <Box>
              <input
                className={classes.input}
                name="model"
                value={surveyObj.model}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>Serial No</Typography>
            <Box>
              <input
                className={classes.input}
                name="serialNo"
                value={surveyObj.serialNo}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>
              UPS Battery Status
            </Typography>
            <Box>
              <input
                className={classes.input}
                name="upsBatteryStatus"
                value={surveyObj.upsBatteryStatus}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>Windows Type</Typography>
            <Box>
              <input
                className={classes.input}
                name="windowsType"
                value={surveyObj.windowsType}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>
              Domain Joining Status
            </Typography>
            <Box>
              <input
                className={classes.input}
                name="domainJoiningStatus"
                value={surveyObj.domainJoiningStatus}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>
              Name Of Utility Contact Person
            </Typography>
            <Box>
              <input
                className={classes.input}
                name="utilityContactPersonName"
                value={surveyObj.utilityContactPersonName}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>
              Phone No Of Utility Contact Person
            </Typography>
            <Box>
              <input
                className={classes.input}
                name="utilityContactPersonContact"
                value={surveyObj.utilityContactPersonContact}
                onChange={handleInputChange}
              />
            </Box>
          </Grid>
          {/* <Grid item xs>
            <Typography className={classes.Typography}>Status</Typography>
            <select
              className={classes.select}
              id="product"
              name="status"
              value={surveyObj.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </Grid> */}
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

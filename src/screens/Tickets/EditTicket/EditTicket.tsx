import { Box, FormLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UrlConstants } from "../../../global/UrlConstants";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Typography: {
      color: "black",
      paddingTop: "0.3rem",
      paddingRight: "1rem",
      textAlign: "left",
    },
    select: {
      width: 220,
    },
    AddTicketInput: {
      // alignContent: "left",
      marginRight: "0.8rem",
      // padding: theme.spacing(0.4),
      // color: theme.palette.text.secondary,
      // textAlign: "center",
      // marginLeft: "7.2rem",
      // padding: "15px 15px",
      minWidth: 290,
      minHeight: 30,
    },
    root: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: "#ede9e8",
      border: "1px solid black",
    },
    header: {
      textAlign: "center",
      color: theme.palette.text.secondary,
      marginBottom: "0.8rem",
      paddingBottom: "0.4rem",
      paddingTop: "0.7rem",
    },
    paper: {
      padding: theme.spacing(1.5),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    textField: {
      "&&": {
        marginTop: "0.7rem",
        marginBottom: "0.7rem",
        marginRight: "0.6rem",
      },
      backgroundColor: "#FFFFFF", //set text field color
    },
    dateField: {
      "&&": {
        marginTop: "0.7rem",
        marginBottom: "0.7rem",
        marginRight: "0.6rem",
        width: 220,
      },
      backgroundColor: "#FFFFFF", //set text field color
    },
  })
);

export default function EditTicket(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const role = localStorage.getItem("role");
  const [data, setData] = useState(props.history.location.state?.data);

  console.log(
    data.complaintCompletionDatetime &&
      moment(data.engineerAssignedDateTime).diff(
        moment(data.complaintCompletionDatetime),
        "hours"
      )
  );

  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .patch(`${UrlConstants.baseUrl}/admin/updateTicket`, data)
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
          theme: "colored",
        });
      });
    setTimeout(() => history.push("/tickets"), 700);
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <>
      <Paper className={classes.root} elevation={12}>
        <Paper className={classes.header}>
          <TextField
            disabled
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            label="S/no"
            name="serialNo"
            value={data.serialNo}
            onChange={handleChange}
            size="small"
          />
          <TextField
            disabled={role !== "superAdmin"}
            className={classes.textField}
            label="Complaint No"
            InputLabelProps={{
              shrink: true,
            }}
            name="complaintNo"
            value={data.complaintNo}
            onChange={handleChange}
            size="small"
          />
          <TextField
            disabled={role !== "superAdmin"}
            type="datetime-local"
            className={classes.dateField}
            label="Complaint Date & Time"
            InputLabelProps={{
              shrink: true,
            }}
            name="complaintDatetime"
            defaultValue={data.complaintDatetime}
            onChange={handleChange}
            size="small"
          />
          <TextField
            disabled
            className={classes.textField}
            label="Engineer Assigned"
            InputLabelProps={{
              shrink: true,
            }}
            name="engineerAssigned"
            value={data.engineerAssigned}
            onChange={handleChange}
            size="small"
          />
          <TextField
            disabled
            className={classes.textField}
            label="Engineer Contact No"
            InputLabelProps={{
              shrink: true,
            }}
            name="engineerContactNo"
            value={data.engineerContactNo}
            onChange={handleChange}
            size="small"
          />
          <TextField
            disabled={role !== "superAdmin"}
            type="datetime-local"
            className={classes.dateField}
            label="Engineer Assigned On"
            InputLabelProps={{
              shrink: true,
            }}
            name="engineerAssignedDateTime"
            defaultValue={data.engineerAssignedDateTime}
            onChange={handleChange}
            size="small"
          />
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography variant="h5">COMPLAIMENT DETAILS</Typography>
              <hr />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Complainant Name"
                InputLabelProps={{
                  shrink: true,
                }}
                name="complainantName"
                value={data.complainantName}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Contact No"
                InputLabelProps={{
                  shrink: true,
                }}
                id="complainantContactNo"
                name="complainantContactNo"
                value={data.complainantContactNo}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Project Name"
                InputLabelProps={{
                  shrink: true,
                }}
                name="projectName"
                value={data.projectName}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Product"
                InputLabelProps={{
                  shrink: true,
                }}
                id="product"
                name="product"
                value={data.product}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Machine Make"
                InputLabelProps={{
                  shrink: true,
                }}
                name="machineMake"
                value={data.machineMake}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Problem Type"
                InputLabelProps={{
                  shrink: true,
                }}
                name="problemType"
                value={data.problemType}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Machine Serial No"
                InputLabelProps={{
                  shrink: true,
                }}
                name="uxb1jsi364g4453780"
                value={data.uxb1jsi364g4453780}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Village/Town or Substation"
                InputLabelProps={{
                  shrink: true,
                }}
                name="substation"
                value={data.substation}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Landmark"
                InputLabelProps={{
                  shrink: true,
                }}
                name="landmark"
                value={data.landmark}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Circle"
                InputLabelProps={{
                  shrink: true,
                }}
                name="circle"
                value={data.circle}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Division"
                InputLabelProps={{
                  shrink: true,
                }}
                name="division"
                value={data.division}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Pincode"
                InputLabelProps={{
                  shrink: true,
                }}
                name="pinCode"
                value={data.pinCode}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Engineer" || role === "Admin"}
                className={classes.textField}
                label="Complainant Designation"
                InputLabelProps={{
                  shrink: true,
                }}
                name="complainantDesignation"
                value={data.complainantDesignation}
                onChange={handleChange}
                size="small"
              />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography variant="h5">DETAILS FILLED BY ENGINNER</Typography>
              <hr />
              <TextField
                disabled={role === "Admin"}
                className={classes.textField}
                label="Defective Item Name"
                InputLabelProps={{
                  shrink: true,
                }}
                name="defectiveItemName"
                value={data.defectiveItemName}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Admin"}
                className={classes.textField}
                label="Old Serial No. MB/HDD/TFT"
                InputLabelProps={{
                  shrink: true,
                }}
                name="oldSerialNoMbHddTft"
                value={data.oldSerialNoMbHddTft}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Admin"}
                className={classes.textField}
                label="New Serial No. MB/HDD/TFT"
                InputLabelProps={{
                  shrink: true,
                }}
                name="newSerialNoMbHddTft"
                value={data.newSerialNoMbHddTft}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Admin"}
                className={classes.textField}
                label="Action Taken And Spare Useds"
                InputLabelProps={{
                  shrink: true,
                }}
                name="actionTakenAndSpareUsed"
                value={data.actionTakenAndSpareUsed}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={role === "Admin"}
                className={classes.dateField}
                type="datetime-local"
                label="Complaint Closed On"
                InputLabelProps={{
                  shrink: true,
                }}
                name="complaintCompletionDatetime"
                value={data.complaintCompletionDatetime}
                onChange={handleChange}
                size="small"
              />
              <Box style={{ paddingTop: "2rem" }}>
                <TextField
                  disabled
                  className={classes.textField}
                  label="Admin Response Time ( In Hours )"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // name="responseTime"
                  value={moment(data.engineerAssignedDateTime).diff(
                    moment(data.complaintDatetime),
                    "hours"
                  )}
                  size="small"
                />
                <TextField
                  disabled
                  className={classes.textField}
                  label="Engineer Response Time ( In Hours )"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    data.complaintCompletionDatetime &&
                    moment(data.complaintCompletionDatetime).diff(
                      moment(data.engineerAssignedDateTime),
                      "hours"
                    )
                  }
                  size="small"
                />
                <TextField
                  disabled
                  className={classes.textField}
                  label="Total Response Time ( In Hours )"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    data.complaintCompletionDatetime &&
                    moment(data.complaintCompletionDatetime).diff(
                      moment(data.complaintDatetime),
                      "hours"
                    )
                  }
                  size="small"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs>
          <Paper
            style={{
              marginTop: "0.7rem",
              paddingTop: "1rem",
              paddingBottom: "0.5rem",
            }}
          >
            <TextField
              className={classes.textField}
              label="Remarks"
              InputLabelProps={{
                shrink: true,
              }}
              name="remarks"
              value={data.remarks}
              onChange={handleChange}
              size="small"
            />

            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="status"
                className={classes.textField}
                style={{ marginLeft: "2rem" }}
                defaultValue={data.status}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Status"
                  control={<b />}
                  label="Status"
                />
                <FormControlLabel
                  value="OPEN"
                  control={<Radio />}
                  label="OPEN"
                />
                <FormControlLabel
                  value="CLOSED"
                  control={<Radio />}
                  label="CLOSED"
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>

        <Button
          variant="outlined"
          style={{
            color: "white",
            backgroundColor: "#900080",
            marginTop: 20,
            marginRight: 4,
            marginBottom: 20,
            minWidth: 120,
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          style={{
            color: "white",
            backgroundColor: "#f44336",
            marginTop: 20,
            marginLeft: 4,
            marginBottom: 20,
            minWidth: 120,
          }}
          type="submit"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Paper>
      <ToastContainer />
    </>
  );
}

import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Button,
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
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myDropZone: {
      position: "relative",
      width: "100%",
      height: "30%",
      minHeight: "100px",
      backgroundColor: "#F0F0F0",
      border: "dashed",
      borderColor: "#C8C8C8",
      cursor: "pointer",
      boxSizing: "border-box",
    },
    Typography: {
      color: "black",
      paddingTop: "0.3rem",
      paddingRight: "1rem",
      textAlign: "left",
    },
    select: {
      width: 220,
      height: 40,
      size: "small",
      "&&": {
        marginTop: "0.7rem",
        marginBottom: "0.7rem",
        marginRight: "0.6rem",
      },
      backgroundColor: "#FFFFFF",
    },
    AddTicketInput: {
      marginRight: "0.8rem",
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
    paper1: {
      padding: theme.spacing(1.5),
      marginTop: 20,
      textAlign: "center",
      maxWidth: 950,
      minHeight: 450,
      color: theme.palette.text.secondary,
    },
    paper2: {
      padding: theme.spacing(1.5),
      textAlign: "center",
      maxWidth: 1300,
      color: theme.palette.text.secondary,
    },
    textField: {
      "&&": {
        marginTop: "0.7rem",
        marginBottom: "0.7rem",
        marginRight: "0.6rem",
      },
      backgroundColor: "#FFFFFF",
    },
    textFieldForCal: {
      width: 250,
      "&&": {
        marginTop: "0.7rem",
        marginBottom: "0.7rem",
        marginRight: "0.6rem",
      },
      backgroundColor: "#FFFFFF",
    },
    dateField: {
      "&&": {
        marginTop: "0.7rem",
        marginBottom: "0.7rem",
        marginRight: "0.6rem",
        width: 220,
      },
      backgroundColor: "#FFFFFF",
    },
  })
);

export default function EditTicket(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const role = localStorage.getItem("role");
  const [data, setData] = useState({
    id: "",
    serialNo: null,
    complaintNo: "",
    complaintDatetime: null,
    circle: "",
    division: "",
    complainantName: "",
    complainantDesignation: "",
    complainantContactNo: "",
    defectiveItemName: null,
    uxb1jsi364g4453780: "",
    engineerAssigned: "",
    engineerAssignedDateTime: "",
    engineerContactNo: "",
    complaintAttemptsFirstDateAndTime: null,
    complaintAttemptsSecondDateAndTime: null,
    complaintAttemptsThirdDateAndTime: null,
    locationCode: null,
    complaintCompletionDatetime: null,
    status: null,
    actionTakenAndSpareUsed: null,
    oldSerialNoMbHddTft: null,
    newSerialNoMbHddTft: null,
    remarks: null,
    projectName: "",
    product: "",
    machineMake: "",
    problemType: "",
    substation: "",
    landmark: "",
    pinCode: "",
    docPath: "",
    aeitStatus: null,
    approverName: null,
    approverPhone: null,
    // complaintAttendHours: 0,
    // complaintCompletionInDays: null,
    // complaintCompletionInHour: 0
  });
  const [calCulation, setCalculation] = useState({
    complaintAttendHours: 0,
    complaintCompletionInDays: null,
    complaintCompletionInHour: 0,
    engineerResponseTime: 0,
    adminResponseTime: 0,
    totalResponseTime: 0,
  });
  const [engineersList, setEngineersList] = useState(props.history.location.state?.engineersList);
  const [complaintCompletionInHour, setComplaintCompletionInHour] = useState(0);
  const disableEdit =
    localStorage.getItem("role") === "superAdmin" ||
      (localStorage.getItem("role") === "Engineer" &&
        data.status === "OPEN")
      ? false
      : true;

  const disableStatusChange =
    localStorage.getItem("role") === "superAdmin" || localStorage.getItem("role") === "Admin" ||
      (localStorage.getItem("role") === "Engineer")
      ? false
      : true;

  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (!calCulation.complaintAttendHours) {
      calculateComplaintAttendHours()
    }
    if (!data.id) {
      getTicketById(props.history.location.state?.data);
    }
    console.log("ddd", data.id)
  }, [data.id])

  const getTicketById = async (id: string) => {
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getTicketById/${id}/loggedInUserId/${localStorage.getItem("id")}`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => { });
    setData(response);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let subUrl = localStorage.getItem("role") === "superAdmin" ? `admin/updateTicket/loggedInUserId/${localStorage.getItem("id")}` : `engineer/updateTicket`
    axios
      .patch(`${UrlConstants.baseUrl}/${subUrl}`, data)
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

  const handleViewDocument = () => {
    window.open(`${UrlConstants.baseUrl}/document/view/${data.docPath}`);
  };

  const handleDownloadDocument = (e: any) => {
    axios({
      url: `${UrlConstants.baseUrl}/document/download/${data.docPath}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", data.docPath);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const onFileDropped = (files: any) => {
    //if (!disableEdit) {
    if (files[0]?.name) {
      axios
        .post(
          `${UrlConstants.baseUrl}/document`,
          {
            userId: data.complaintNo,
            documentFile: files[0],
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(function (response) {
          setData({ ...data, docPath: response.data.data.name });
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
          toast.error("Maximum Image size should be 1MB!", {
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
      // }
    }
  };

  const handleAssignedEngChange = (event: any) => {
    let value = event?.target.value;
    let id = value[0];
    let name = value[1];
    let phone = value[2];
    setData({
      ...data,
      engineerAssigned: event?.target.value[1],
      engineerContactNo: event?.target.value[2],
      engineerAssignedDateTime: moment().format("YYYY-MM-DDTHH:mm"),
    });
  };

  const calculateComplaintAttendHours = async () => {
    //code
    let response = 0;
    if (data.complaintAttemptsThirdDateAndTime !== null) {
      response = +(Math.floor(moment.duration(moment.duration(moment(data.complaintAttemptsThirdDateAndTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) + "." + (Math.floor(moment.duration(moment.duration(moment(data.complaintAttemptsThirdDateAndTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asMinutes()) - Math.floor(moment.duration(moment.duration(moment(data.complaintAttemptsThirdDateAndTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) * 60))
    } else if (data.complaintAttemptsSecondDateAndTime !== null) {
      response = +(Math.floor(moment.duration(moment.duration(moment(data.complaintAttemptsSecondDateAndTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) + "." + (Math.floor(moment.duration(moment.duration(moment(data.complaintAttemptsSecondDateAndTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asMinutes()) - Math.floor(moment.duration(moment.duration(moment(data.complaintAttemptsSecondDateAndTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) * 60))
    } else if (data.complaintAttemptsFirstDateAndTime !== null) {
      response = +(Math.floor(moment.duration(moment.duration(moment(data.complaintAttemptsFirstDateAndTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) + "." + (Math.floor(moment.duration(moment.duration(moment(data.complaintAttemptsFirstDateAndTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asMinutes()) - Math.floor(moment.duration(moment.duration(moment(data.complaintAttemptsFirstDateAndTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) * 60))
    } else {
      response = 0
    }
    setCalculation({
      ...calCulation,
      complaintAttendHours: response,
      complaintCompletionInHour: +(Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) + "." + (Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asMinutes()) - Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) * 60)),
      complaintCompletionInDays: data.complaintCompletionDatetime &&
        moment(data.complaintCompletionDatetime).diff(
          moment(data.complaintDatetime),
          "days"
        ),
      engineerResponseTime: +(Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.engineerAssignedDateTime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) + "." + (Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.engineerAssignedDateTime))).asMilliseconds().toFixed(), 'milliseconds').asMinutes()) - Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.engineerAssignedDateTime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) * 60)),
      adminResponseTime: +(Math.floor(moment.duration(moment.duration(moment(data.engineerAssignedDateTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) + "." + (Math.floor(moment.duration(moment.duration(moment(data.engineerAssignedDateTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asMinutes()) - Math.floor(moment.duration(moment.duration(moment(data.engineerAssignedDateTime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) * 60)),
      totalResponseTime: +(Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) + "." + (Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asMinutes()) - Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) * 60)),
    })
  }


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
            value={data.complaintDatetime}
            onChange={handleChange}
            size="small"
          />
          <FormControl >
            <InputLabel id="demo-simple-select-label">Engineer Assigned</InputLabel>
            <Select
              className={classes.select}
              disabled={role !== "superAdmin"}
              variant='outlined'
              label="Engineer Assigned"
              name="engineerAssigned"
              defaultValue={data.engineerAssigned}
              value={data.engineerAssigned}
              renderValue={() => data.engineerAssigned}
              onChange={handleAssignedEngChange}
            >
              {engineersList?.map((x: any, y: any) => (
                <MenuItem key={y} value={[x.id, x.name, x.phone]}>
                  {x.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            value={data.engineerAssignedDateTime}
            onChange={handleChange}
            size="small"
          />
          <TextField
            disabled={role !== "superAdmin"}
            className={classes.textField}
            label="AEIT Status"
            InputLabelProps={{
              shrink: true,
            }}
            name="aeitStatus"
            value={data.aeitStatus}
            onChange={handleChange}
            size="small"
          />
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper className={classes.paper1}>
              <Typography variant="h5">COMPLAIMENT DETAILS</Typography>
              <hr />
              <TextField
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
                disabled={role !== "superAdmin"}
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
            <Paper className={classes.paper2}>
              <Typography variant="h5">DETAILS FILLED BY ENGINNER</Typography>
              <hr />
              <TextField
                disabled={disableEdit}
                className={classes.textField}
                label="Location Code"
                InputLabelProps={{
                  shrink: true,
                }}
                name="locationCode"
                value={data.locationCode}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={disableEdit}
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
                disabled={disableEdit}
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
                disabled={disableEdit}
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
                disabled={disableEdit}
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
                disabled={disableEdit}
                type="datetime-local"
                className={classes.dateField}
                label="Complaint Attempts First Date & Time"
                InputLabelProps={{
                  shrink: true,
                }}
                name="complaintAttemptsFirstDateAndTime"
                value={data.complaintAttemptsFirstDateAndTime}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={disableEdit}
                type="datetime-local"
                className={classes.dateField}
                label="Complaint Attempts Second Date & Time"
                InputLabelProps={{
                  shrink: true,
                }}
                name="complaintAttemptsSecondDateAndTime"
                value={data.complaintAttemptsSecondDateAndTime}
                onChange={handleChange}
                size="small"
              />
              <TextField
                disabled={disableEdit}
                type="datetime-local"
                className={classes.dateField}
                label="Complaint Attempts Third Date & Time"
                InputLabelProps={{
                  shrink: true,
                }}
                name="complaintAttemptsThirdDateAndTime"
                value={data.complaintAttemptsThirdDateAndTime}
                onChange={handleChange}
                size="small"
              />
              <TextField
                //code2
                disabled={role !== "superAdmin"}
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
              <Box>
                <TextField
                  disabled
                  className={classes.textFieldForCal}
                  label="Complaint  Attend Hours (HH:MM)"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="complaintAttendHours"
                  type="number"
                  defaultValue={calCulation?.complaintAttendHours}
                  value={calCulation?.complaintAttendHours}
                  size="small"
                />
                <TextField
                  disabled
                  className={classes.textFieldForCal}
                  label="Complaint Completion in days"
                  name="complaintCompletionInDays"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calCulation.complaintCompletionInDays}
                  size="small"
                />
                <TextField
                  disabled
                  className={classes.textFieldForCal}
                  label="Complaint Completion in Hours (HH:MM)"
                  name="complaintCompletionInHour"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // value={
                  //   data.complaintCompletionDatetime &&
                  //   moment(data.complaintCompletionDatetime).diff(
                  //     moment(data.complaintDatetime)
                  //   )
                  // }
                  value={calCulation?.complaintCompletionInHour}
                  // value={Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) + "." + (Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asMinutes()) - Math.floor(moment.duration(moment.duration(moment(data.complaintCompletionDatetime).diff(moment(data.complaintDatetime))).asMilliseconds().toFixed(), 'milliseconds').asHours()) * 60)}
                  size="small"
                />
              </Box>
              <Box>
                <TextField
                  disabled
                  className={classes.textFieldForCal}
                  label="Admin Response Time In Hours (HH:MM)"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calCulation?.adminResponseTime}
                  size="small"
                />
                <TextField
                  disabled
                  className={classes.textFieldForCal}
                  label="Engineer Response Time In Hours (HH:MM)"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calCulation?.engineerResponseTime}
                  size="small"
                />
                <TextField
                  disabled
                  className={classes.textFieldForCal}
                  label="Total Response Time In Hours (HH:MM)"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calCulation.totalResponseTime}
                  size="small"
                />
              </Box>
              {(role === "Engineer" || role === "superAdmin") && (
                <Box>
                  <DropzoneArea
                    filesLimit={1}
                    dropzoneClass={classes.myDropZone}
                    showFileNamesInPreview={true}
                    acceptedFiles={["image/*"]}
                    dropzoneText={
                      data?.docPath
                        ? "Replace Image"
                        : "Drag and drop an image here or click"
                    }
                    onChange={(files) => onFileDropped(files)}
                  ></DropzoneArea>
                </Box>
              )}
              {data?.docPath && (
                <Box>
                  <Typography>{data.docPath}</Typography>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#013220",
                      marginTop: 20,
                      marginLeft: 4,
                      marginBottom: 20,
                      minWidth: 120,
                    }}
                    onClick={handleViewDocument}
                  >
                    View Image
                  </Button>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#013220",
                      marginTop: 20,
                      marginLeft: 4,
                      marginBottom: 20,
                      minWidth: 120,
                    }}
                    onClick={handleDownloadDocument}
                  >
                    Download Image
                  </Button>
                </Box>
              )}
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
                value={data.status}
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
                  disabled={disableStatusChange}
                />
                <FormControlLabel
                  value="CLOSED"
                  control={<Radio />}
                  label="CLOSED"
                  disabled={disableStatusChange}
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

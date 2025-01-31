import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddressComponent from "./AddressComponent";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UrlConstants } from "../../../global/UrlConstants";
import { useEffect, useState } from "react";
import { Step, StepContent, StepLabel, Stepper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    Typography: {
      color: "black",
      paddingTop: "0.3rem",
      paddingLeft: "0.5rem",
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
      width: 400,
    },
  })
);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function getSteps() {
  return [<b style={{ color: 'black' }}>Personal Details</b>,
  <b style={{ color: 'black' }}>Location Details</b>];
}

export default function AddTicket(props: any) {
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [ticketData, setTicketData] = useState({
    complainantName: "",
    complainantContactNo: "",
    complainantDesignation: "",
    projectName: "",
    product: "",
    machineMake: "",
    problemType: "",
    circle: "",
    division: "",
    substation: "",
    landmark: "",
    pinCode: "",
  });
  const [machineMakeOptions, setMachineMakeOptions] = useState<string[]>([]);
  const [problemTypeOptions, setProblemTypeOptions] = useState<string[]>([]);
  const [complaintNo, setComplaintNo] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      window.location.replace("https://axisinfoline.com");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };

  useEffect(() => {
    document.title = "Create Ticket";
  }, []);

  const handlePersonalDetailsValidation = () => {
    if (!ticketData.complainantName) {
      toast.error("Please Enter your name!", {
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
    if (!ticketData.complainantContactNo) {
      toast.error("Please Enter your Phone Number!", {
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
    if (!ticketData.complainantContactNo) {
      toast.error("Please Select Project Name!", {
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
    if (!ticketData.projectName) {
      toast.error("Please Select Project Name!", {
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

  const handleLocationValidation = () => {
    if (!ticketData.circle && !ticketData.division) {
      toast.error("Please Select Circle!", {
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
    if (!ticketData.circle) {
      toast.error("Please Select Project Name!", {
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
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      if (handleLocationValidation()) {
        axios
          .post(`${UrlConstants.baseUrl}/createTicket`, ticketData)
          .then(function (response) {
            setComplaintNo(response.data);
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
            setTicketData({
              complainantName: "",
              complainantContactNo: "",
              complainantDesignation: "",
              projectName: "",
              product: "",
              machineMake: "",
              problemType: "",
              circle: "",
              division: "",
              substation: "",
              landmark: "",
              pinCode: "",
            });
            setOpen(true);
          })
          .catch(function (error) {
            toast.error("Error while Adding Ticket!", {
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
    } else {
      if (handlePersonalDetailsValidation()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleInputChange = (event: any) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setTicketData({ ...ticketData, [event.target.name]: event.target.value });
    if (event.target.value === "Desktop") {
      setTicketData({
        ...ticketData,
        product: "Desktop",
        machineMake: "DELL",
        problemType: "SYSTEM NOT WORKING",
      });
      setMachineMakeOptions([
        "DELL",
        "HP",
        "ACER",
        "LENOVO",
        "ASSEMBLED",
        "HCL",
      ]);
      setProblemTypeOptions([
        "SYSTEM NOT WORKING",
        "DISPLAY ISSUE",
        "RESTARTING ISSUE",
        "POWER ON ISSUE",
        "DATE TIME ISSUE",
        "SYSTEM HANGING ISSUE",
        "WINDOW ISSUE",
      ]);
    } else if (event.target.value === "UPS Offline") {
      setTicketData({
        ...ticketData,
        product: "UPS Offline",
        machineMake: "EMERSON 600/800 VA UPS",
        problemType: "POWER ON ISSUE",
      });
      setMachineMakeOptions([
        "EMERSON 600/800 VA UPS",
        "MICROTEK 600/800 VA UPS",
        "LUMINUS 600/800 VA UPS",
        "INTEX 600/800 VA UPS",
      ]);
      setProblemTypeOptions(["POWER ON ISSUE", "BACKUP ISSUE"]);
    } else if (event.target.value === "UPS Online") {
      setTicketData({
        ...ticketData,
        product: "UPS Online",
        machineMake: "EMERSON 3KVA UPS",
        problemType: "POWER ON ISSUE",
      });
      setMachineMakeOptions(["EMERSON 3KVA UPS"]);
      setProblemTypeOptions([
        "POWER ON ISSUE",
        "CHARGING ISSUE",
        "BACKUP ISSUE",
        "ERROR-01",
        "ERROR-27",
        "UPS NOT WORKING",
      ]);
    } else if (event.target.value === "Please select") {
      setTicketData({
        ...ticketData,
        product: "",
        machineMake: "",
        problemType: "",
      });
      setMachineMakeOptions([]);
      setProblemTypeOptions([]);
    }
  };


  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <><Typography className={classes.Typography}>* Name</Typography>
            <Grid item xs>
              <Box>
                <input
                  required
                  maxLength={36}
                  className={classes.input}
                  autoComplete="new-password"
                  name="complainantName"
                  onChange={handleInputChange}
                />
              </Box>
            </Grid>
            <Grid className={classes.input} item xs>
              <Typography className={classes.Typography}>*Phone</Typography>
              <Box>
                <input
                  required
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  maxLength={13}
                  className={classes.input}
                  autoComplete="new-password"
                  name="complainantContactNo"
                  type="tel"
                  onChange={handleInputChange}
                />
              </Box>
            </Grid>
            <Grid className={classes.input} item xs>
              <Typography className={classes.Typography}>Designation</Typography>
              <Box>
                <input
                  maxLength={36}
                  className={classes.input}
                  autoComplete="new-password"
                  name="complainantDesignation"
                  onChange={handleInputChange}
                />
              </Box>
            </Grid>
            <Grid item xs>
              <Typography className={classes.Typography}>
                * Project Name
              </Typography>
              <select
                required
                className={classes.select}
                id="projectName"
                name="projectName"
                value={ticketData.projectName}
                onChange={handleInputChange}
              >
                <option value="">Please Select</option>
                <option value="PVVNL">PVVNL</option>
                <option value="DVVNL" disabled>
                  DVVNL
                </option>
                <option value="MVVNL" disabled>
                  MVVNL
                </option>
                <option value="PUVVNL" disabled>
                  PUVVNL
                </option>
                <option value="KESCO" disabled>
                  KESCO
                </option>
                <option value="DMRC" disabled>
                  DMRC
                </option>
              </select>
            </Grid>
            <Grid item xs>
              <Typography className={classes.Typography}>
                Product & Services
              </Typography>
              <select
                className={classes.select}
                id="product"
                name="product"
                value={ticketData.product}
                onChange={handleInputChange}
              >
                <option value="">Please Select</option>
                <option value="Desktop">Desktop</option>
                <option value="UPS Offline">UPS Offline</option>
                <option value="UPS Online">UPS Online</option>
              </select>
            </Grid>
            <Grid item xs>
              <Typography className={classes.Typography}>Machine Make</Typography>
              <select
                className={classes.select}
                id="machineMake"
                name="machineMake"
                value={ticketData.machineMake}
                onChange={handleInputChange}
              >
                {machineMakeOptions.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs>
              <Typography className={classes.Typography}>Problem Type</Typography>
              <select
                className={classes.select}
                id="problemType"
                name="problemType"
                value={ticketData.problemType}
                onChange={handleInputChange}
              >
                {problemTypeOptions.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid className={classes.input} item xs>
              <Typography className={classes.Typography}>
                Machine Serial No.
              </Typography>
              <Box>
                <input
                  maxLength={36}
                  className={classes.input}
                  autoComplete="new-password"
                  name="uxb1jsi364g4453780"
                  onChange={handleInputChange}
                />
              </Box>
            </Grid></>
        );
      case 1:
        return (
          <AddressComponent
            ticketData={ticketData}
            setTicketData={setTicketData}
          />
        );
      default:
        return 'Unknown step';
    }
  }

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
        aria-disabled
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Paper className={classes.root} elevation={6}>
          <Box style={{ position: "absolute", paddingLeft: "0.2rem" }}>
            <IconButton onClick={() => history.goBack()}>
              <KeyboardBackspaceIcon style={{ fill: "#000000" }} />
            </IconButton>
          </Box>
          <Typography
            variant="h4"
            sx={{ paddingTop: 6, paddingBottom: 3, fontFamily: "sans-serif" }}
          >
            Create Ticket
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step >
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        style={{
                          marginTop: 20,
                          marginBottom: 28,
                          minWidth: 110,
                        }}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        style={{
                          color: "white",
                          backgroundColor: "#f44336",
                          marginTop: 20,
                          marginBottom: 28,
                          minWidth: 110,
                        }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Ticket Created
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Your complaint number is: <strong>{complaintNo}</strong>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <ToastContainer />
    </div>
  );
}

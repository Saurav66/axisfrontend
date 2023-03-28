import {
  Box,
  createStyles,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Typography: {
      color: "black",
      paddingTop: "0.3rem",
      paddingLeft: "2rem",
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
      justifyContent: "center",
      width: 360,
      marginLeft: "35rem",
      alignContent: "left",
    },
  })
);

export default function AddressComponent(props: any) {
  const classes = useStyles();
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [circleOptions, setCircleOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [selectedRadioValue, setSelectedRadioValue] = useState("");

  useEffect(() => {
    document.title = "Engineers";
    if (circleOptions.length === 0) {
      getCircles();
    }
    if (selectedRadioValue === "division" && divisionOptions.length === 0) {
      getDivisions();
    }
  }, [selectedRadioValue]);

  const getCircles = async () => {
    const response = await axios
      .get(`http://165.227.128.110:9000/getAllCircles`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    console.log("response4", response);
    setCircleOptions(response);
  };

  const getDivisions = async () => {
    const response = await axios
      .get(`http://165.227.128.110:9000/getAllDivisions`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    console.log("response4", response);
    setDivisionOptions(response);
  };

  const handleLocationChange = async (event: any) => {
    console.log("event.target.value", event.target.value);
    console.log("event.target.name", event.target.name);
    props.setTicketData({
      ...props.ticketData,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "circle") {
      const response = await axios
        .get(
          `http://165.227.128.110:9000/getAllDivisionByCircle/${event.target.value}`
        )
        .then((response: any) => {
          return response.data;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
      setCityOptions(response);
    }
  };

  const handleAddressTypeChange = (e: any, value: string) => {
    setSelectedRadioValue(value);
    if (value === "location") {
      props.ticketData.circle = "";
      props.ticketData.division = "";
      props.ticketData.substation = "";
      props.ticketData.landmark = "";
      props.ticketData.pinCode = "";
    } else if (value === "circle") {
      props.ticketData.circle = "";
      props.ticketData.division = "";
      props.ticketData.substation = "";
      props.ticketData.landmark = "";
      props.ticketData.pinCode = "";
    } else if (value === "division") {
      props.ticketData.circle = "";
      props.ticketData.division = "";
      props.ticketData.substation = "";
      props.ticketData.landmark = "";
      props.ticketData.pinCode = "";
    }
  };

  const handleDropDownChange = (event: any) => {
    props.setTicketData({
      ...props.ticketData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="address"
          onChange={handleAddressTypeChange}
        >
          <FormControlLabel
            value="location"
            control={<Radio />}
            label="Location"
          />
          <FormControlLabel value="circle" control={<Radio />} label="Circle" />
          <FormControlLabel
            value="division"
            control={<Radio />}
            label="Division"
          />
        </RadioGroup>
      </FormControl>
      {selectedRadioValue === "location" && (
        <>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>
              Village/Substation
            </Typography>
            <Box>
              <input
                className={classes.input}
                autoComplete="new-password"
                id="substation"
                name="substation"
                onChange={handleLocationChange}
              />
            </Box>
          </Grid>
          <Grid className={classes.input} item xs>
            <Typography className={classes.Typography}>Landmark</Typography>
            <Box>
              <input
                className={classes.input}
                autoComplete="new-password"
                name="landmark"
                onChange={handleLocationChange}
              />
            </Box>
          </Grid>
          <Grid item xs>
            <Typography className={classes.Typography}>
              District/Circle
            </Typography>
            <select
              className={classes.select}
              id="circle"
              name="circle"
              value={props.ticketData.circle}
              onChange={handleLocationChange}
            >
              <option value="pleaseSelect">Please Select</option>
              {circleOptions.map((x, y) => (
                <option key={y} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs>
            <Typography className={classes.Typography}>
              City/Division
            </Typography>
            <select
              className={classes.select}
              id="division"
              name="division"
              value={props.ticketData.division}
              onChange={handleLocationChange}
            >
              <option value="pleaseSelect">Please Select</option>
              {cityOptions.map((x, y) => (
                <option key={y} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs>
            <Typography className={classes.Typography}>Pincode</Typography>
            <Box>
              <input
                className={classes.input}
                autoComplete="off"
                id="pinCode"
                name="pinCode"
                onChange={handleLocationChange}
              />
            </Box>
          </Grid>
        </>
      )}
      {selectedRadioValue === "circle" && (
        <>
          <Grid item xs>
            <Typography className={classes.Typography}>Circle</Typography>
            <select
              className={classes.select}
              id="circle"
              name="circle"
              value={props.ticketData.circle}
              onChange={handleDropDownChange}
            >
              <option value="pleaseSelect">Please Select</option>
              {circleOptions.map((x, y) => (
                <option key={y} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </Grid>
        </>
      )}
      {selectedRadioValue === "division" && (
        <>
          <Grid item xs>
            <Typography className={classes.Typography}>Division</Typography>
            <select
              className={classes.select}
              name="division"
              value={props.ticketData.division}
              onChange={handleDropDownChange}
            >
              <option value="pleaseSelect">Please Select</option>
              {divisionOptions.map((x, y) => (
                <option key={y} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </Grid>
        </>
      )}
    </>
  );
}

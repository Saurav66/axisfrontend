import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { UrlConstants } from "../../../global/UrlConstants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TypographyHeading: {
      color: "black",
      paddingTop: "1.2rem",
      paddingBottom: "0.7rem",
      paddingLeft: "2rem",
      textAlign: "left",
      // color: "red",
    },
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
      .get(`${UrlConstants.baseUrl}/getAllCircles`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {});
    setCircleOptions(response);
  };

  const getDivisions = async () => {
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getAllDivisions`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {});
    setDivisionOptions(response);
  };

  const handleLocationChange = async (event: any) => {
    props.setTicketData({
      ...props.ticketData,
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
      setCityOptions(response);
    }
  };

  return (
    <>
      <Box sx={{ fontWeight: "bold" }}>
        <Typography className={classes.TypographyHeading}>
          Location Details:
        </Typography>
      </Box>
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
          * District/Circle
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
        <Typography className={classes.Typography}>City/Division</Typography>
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
  );
}

import { useState } from "react";
import Grid from '@mui/material/Grid';
import { createStyles, makeStyles } from "@material-ui/core";
import { Theme } from "react-toastify";

const useStyles = makeStyles((theme: Theme) =>
  createStyles(
    {
      element: {
        margin: 4,
        width: 150,
        height: 27,
      },
    }
  )
);

export default function CustomRangePicker(props: any) {
  const classes = useStyles();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const handleFromDateChange = (e: any) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e: any) => {
    setToDate(e.target.value);
    if (fromDate) {
      props.handleDateRangeChange([fromDate, e.target.value]);
    } else {
      //need to add validation to highlight -> Please fill fromDate
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <label className={classes.element}>{props?.label}</label>
          <input
            className={classes.element}
            type="date"
            name="fromDate"
            onSelect={handleFromDateChange}
          />
          <input
            className={classes.element}
            type="date"
            name="toDate"
            onChange={handleToDateChange}
          />
        </Grid>
      </Grid>
    </>
  );
}

import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CustomRangePicker(props: any) {
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
        <Grid item xs={6}>
          <Item><input
            style={{
              // paddingTop: "0.44rem",
              // paddingBottom: "0.42rem",
              paddingLeft: "0.4rem",
              paddingRight: "0.1rem",
              marginLeft: "0.2rem",
              marginRight: "0.1rem",
            }}
            type="date"
            name="fromDate"
            onSelect={handleFromDateChange}
          /></Item>
        </Grid>
        <Grid item xs={6}>
          <Item> <input
            style={{
              // paddingTop: "0.44rem",
              // paddingBottom: "0.42rem",
              paddingLeft: "0.1rem",
              paddingRight: "0.1rem",
              marginLeft: "0.2rem",
              marginRight: "0.1rem",
            }}
            type="date"
            name="toDate"
            onChange={handleToDateChange}
          /></Item>
        </Grid>
      </Grid>
      {/* <label>Date Range:</label> */}
    </>
  );
}

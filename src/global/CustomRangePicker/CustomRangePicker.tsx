import { Box, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useState } from "react";

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
      <input
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
      />
      <input
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
      />
      {/* <label>Date Range:</label> */}
    </>
  );
}

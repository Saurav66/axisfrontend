import { Card, Tooltip } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Grid } from "@mui/material";
// import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import React from "react";
import CustomCard from "../../global/CustomCard/CustomCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: "#f2f1ed",
    },
  })
);

const data = [
  { name: "pu", students: 400 },
  { name: "pv", students: 700 },
];

export default function AdminDashboard() {
  const classes = useStyles();

  const handleOnClick = () => {};

  return (
    <>
      <Grid container spacing={2} style={{ padding: "2rem" }}>
        <Grid item xs>
          <CustomCard
            title="Total Tickets"
            count={500}
            onClick={handleOnClick}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Total Survey"
            count={2000}
            onClick={handleOnClick}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Total Circle"
            count={3000}
            onClick={handleOnClick}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Engineer"
            count={200}
            onClick={handleOnClick}
          ></CustomCard>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ padding: "2rem" }}>
        <Grid item xs>
          <CustomCard
            title="Ticket"
            count={200}
            onClick={handleOnClick}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Ticket Closed this Month"
            count={200}
            onClick={handleOnClick}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Ticket Created this Month"
            count={200}
            onClick={handleOnClick}
          ></CustomCard>
        </Grid>
      </Grid>
    </>
  );
}

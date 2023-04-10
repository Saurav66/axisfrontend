import { Card, Tooltip } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Grid } from "@mui/material";
// import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import React from "react";

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
  return (
    <div>
      <Box>
        {/* <Grid>
          <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis /> */}
        {/* <Tooltip />
            <Legend /> */}
        {/* <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </Grid> */}
      </Box>
    </div>
  );
}

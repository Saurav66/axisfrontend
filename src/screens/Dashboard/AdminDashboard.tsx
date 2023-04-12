import { Card, Tooltip } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Grid } from "@mui/material";
// import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import CustomCard from "../../global/CustomCard/CustomCard";
import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";
import { useHistory } from "react-router-dom";

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
  let history = useHistory();
  const classes = useStyles();
  const [ticketCount, setTicketCount] = useState({
    OPEN: 0,
    CLOSED: 0,
    currentMonthCreatedTicket: 0,
    currentMonthClosedTicket: 0,
    activeEngineers: 0,
    totalSurvey: 0,
    totalCircles: 0,
  });

  useEffect(() => {
    if (
      localStorage.getItem("role") === "Admin" ||
      localStorage.getItem("role") === "superAdmin"
    ) {
      document.title = "Survey";
      getTicketCounts();
    } else {
      window.location.replace("https://axisinfoline.com");
    }
  }, []);

  const getTicketCounts = async () => {
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getDashboard/count/admin`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {});
    setTicketCount(response);
  };

  const handleOnClick = () => {};

  return (
    <>
      <Grid container spacing={2} style={{ padding: "2rem" }}>
        <Grid item xs>
          <CustomCard
            title="Total Tickets"
            count={ticketCount.OPEN + (ticketCount.CLOSED ?? 0)}
            onClick={() => history.push("/tickets")}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Total Survey"
            count={ticketCount.totalSurvey}
            onClick={() => history.push("/survey")}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Total Circle"
            count={ticketCount.totalCircles}
            onClick={handleOnClick}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Active Engineer"
            count={ticketCount.activeEngineers}
            onClick={() => history.push("/employees")}
          ></CustomCard>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ padding: "2rem" }}>
        <Grid item xs>
          <CustomCard
            title="Open Tickets"
            count={ticketCount.OPEN}
            onClick={() => history.push("/tickets")}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Closed Tickets"
            count={ticketCount.CLOSED ?? 0}
            onClick={() => history.push("/tickets", { tabValue: "CLOSED" })}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Ticket Closed this Month"
            count={ticketCount.currentMonthClosedTicket}
            onClick={() => history.push("/tickets", { tabValue: "CLOSED" })}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Ticket Created this Month"
            count={ticketCount.currentMonthCreatedTicket}
            onClick={() => history.push("/tickets")}
          ></CustomCard>
        </Grid>
      </Grid>
    </>
  );
}

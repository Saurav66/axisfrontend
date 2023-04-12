import { Card } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@mui/material";
// import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import CustomCard from "../../global/CustomCard/CustomCard";
import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";
import { useHistory } from "react-router-dom";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: "#f2f1ed",
    },
  })
);

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  value,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#e03a3c"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {/* {`${(percent * 100).toFixed(0)}%`} */}
      {`${name}: ${value?.toFixed(0) ?? 0}`}
    </text>
  );
};

// const renderCustomizedLabel = ({ x, y, name }: any) => {
//   console.log("name", name);
//   return (
//     <text x={x} y={y} fill="black" textAnchor="end" dominantBaseline="central">
//       {name}
//     </text>
//   );
// };

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
      document.title = "Dashboard";
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
      <Grid container spacing={2} style={{ padding: "2rem", height: "17vw" }}>
        <Grid item xs>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                // data={data}
                data={[
                  { name: "Open", value: ticketCount.OPEN },
                  { name: "Closed", value: ticketCount.CLOSED },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Ticket Closed this Month"
            cardWidth="30vw"
            count={ticketCount.currentMonthClosedTicket}
            onClick={() => history.push("/tickets", { tabValue: "CLOSED" })}
          ></CustomCard>
        </Grid>
        <Grid item xs>
          <CustomCard
            title="Ticket Created this Month"
            cardWidth="30vw"
            count={ticketCount.currentMonthCreatedTicket}
            onClick={() => history.push("/tickets")}
          ></CustomCard>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ padding: "2rem" }}></Grid>
    </>
  );
}

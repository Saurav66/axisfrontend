import { Card, CardHeader } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import CustomCard from "../../global/CustomCard/CustomCard";
import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";
import { useHistory } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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
      fill="#030303"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {/* {`${(percent * 100).toFixed(0)}%`} */}
      {`${name}: ${value?.toFixed(0) ?? 0}`}
    </text>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // backgroundColor: '#f0fcf2',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
      .get(
        `${UrlConstants.baseUrl
        }/getDashboard/count/loggedInUserId/${localStorage.getItem("id")}`
      )
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => { });
    setTicketCount(response);
  };

  const handleOnClick = () => { };

  return (
    <Box style={{ backgroundColor: "#ffffff" }}>
      {/* <CardHeader title="Dashboard" /> */}
      <Grid container spacing={2} style={{ marginTop: 10, backgroundColor: "#ffffff" }}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <CustomCard
            title="Total Tickets"
            // icon={ConfirmationNumberIcon}
            cardColor="#fcffde"
            count={(ticketCount?.OPEN ?? 0) + (ticketCount?.CLOSED ?? 0)}
            onClick={() => history.push("/tickets")}
          ></CustomCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
          <CustomCard
            title="Total Survey"
            cardColor="#fcffde"
            count={ticketCount?.totalSurvey ?? 0}
            onClick={() => history.push("/survey")}
          ></CustomCard>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <CustomCard
            title="Total Circle"
            cardColor="#fcffde"
            count={ticketCount.totalCircles ?? 0}
            onClick={() => history.push("/locations")}
          ></CustomCard>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <CustomCard
            title="Active Engineer"
            cardColor="#e8ffde"
            count={ticketCount?.activeEngineers ?? 0}
            onClick={() => history.push("/employees")}
          ></CustomCard>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={3}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '50vh' }}>
          <PieChart width={450} height={450} >
            <Pie
              data={[
                { name: "Open Tickets", value: ticketCount.OPEN },
                { name: "Closed Tickets", value: ticketCount.CLOSED },
              ]}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  onClick={() => history.push("/tickets")}
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={9} style={{ paddingTop: 105 }}>
          <Item>
            <CustomCard
              // title="Total Ticket Created this Month"
              title="All Ticket in Month"
              color="#141414"
              cardColor="#ffeade"
              // cardWidth="100vw"
              count={ticketCount.currentMonthCreatedTicket}
              onClick={() => history.push("/tickets")}
            ></CustomCard>
          </Item>
          <Item>
            <CustomCard
              // title="Total Ticket Closed this Month"
              title="Closed Ticket in Month"
              // cardWidth="100vw"
              cardColor="#e8ffde"
              count={ticketCount.currentMonthClosedTicket}
              onClick={() => history.push("/tickets", { tabValue: "CLOSED" })}
            ></CustomCard>
          </Item>
        </Grid>
      </Grid>
    </Box >
  );
}

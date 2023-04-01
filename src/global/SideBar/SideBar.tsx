import React, { useState } from "react";
// import "./styles.css";
import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  CssBaseline,
  Drawer,
  Typography,
} from "@material-ui/core";
import {
  Apps,
  Menu,
  ContactMail,
  AssignmentInd,
  Home,
} from "@material-ui/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { Redirect, useHistory } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    // background: "#1c2e4a", --blue
    background: "#FFFFFF",
    height: "100%",
  },
  avatar: {
    margin: "0.5rem auto",
    padding: "1rem",
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  listItem: {
    color: "#e03a3c",
  },
}));

const listItems = [
  {
    listIcon: <AssignmentIcon />,
    listText: "Tickets",
    url: "/tickets",
  },
  // {
  //   listIcon: <AssignmentInd />,
  //   listText: "Locations",
  //   url: "/locations",
  // },
  {
    listIcon: <AnalyticsIcon />,
    listText: "Survey",
    url: "/survey",
  },
  {
    listIcon: <GroupIcon />,
    listText: "Employees",
    url: "/employees",
  },
];

export default function SideBar() {
  const classes = useStyles();
  let history = useHistory();
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  const redirectToComponent = (url: string) => {
    setOpen(!open);
    history.push(url);
  };

  const sideList = () => (
    <Box className={classes.menuSliderContainer} component="div">
      <Avatar
        className={classes.avatar}
        src="data:image/png;base64,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"
        alt="Juaneme8"
      />
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <ListItem
            onClick={() => redirectToComponent(listItem.url)}
            className={classes.listItem}
            button
            key={index}
          >
            <ListItemIcon className={classes.listItem}>
              {listItem.listIcon}
            </ListItemIcon>
            <ListItemText primary={listItem.listText} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const logOutButton = () => {
    localStorage.setItem("role", "");
    localStorage.setItem("userName", "");
    localStorage.setItem("userPhoneNo", "");
    localStorage.setItem("id", "");
    window.location.replace("https://axisinfoline.com");
    // history.push("s/");
  };

  return (
    <>
      <CssBaseline />
      <Box component="nav">
        <Box style={{ position: "absolute", right: 20, top: 5, zIndex: 10 }}>
          <IconButton onClick={logOutButton}>
            <Typography style={{ color: "#FFFFFF", marginRight: "0.8rem" }}>
              {role}
            </Typography>
            <LogoutIcon style={{ fill: "#FFFFFF" }} />
          </IconButton>
        </Box>
        <AppBar
          position="static"
          style={{
            // height: 60,
            // color: "#e76668"
            backgroundColor: "#e03a3c",
          }}
        >
          <Toolbar>
            {role === "Admin" && (
              <IconButton onClick={toggleSlider}>
                <Menu style={{ fill: "#FFFFFF" }} />
              </IconButton>
            )}
            <Typography>{localStorage.getItem("userName")}</Typography>
            <Drawer open={open} anchor="left" onClose={toggleSlider}>
              {sideList()}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

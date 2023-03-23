import {
  Box,
  Button,
  Chip,
  createStyles,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState, useMemo } from "react";
import CustomTable from "../../global/CustomTable/CustomTable";
import { useHistory } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ticketData from "../../data/ticketData.json";
import { Tab, Tabs, TextField } from "@mui/material";
import { getAdminTicketByStatus, getEngTicketByStatus } from "./TicketServices";
import CustomRangePicker from "../../global/CustomRangePicker/CustomRangePicker";
import { getEngineersByStatus } from "../Employee/EmployeeService";
import ReAssignComponent from "./ReAssignComponent";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const rawRows = [...ticketData];

const emails = ["username@gmail.com", "user02@gmail.com"];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstGridItems: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      padding: "0.5rem",
    },
    secondGridItems: {},
    thirdGridItems: {},
    button: {},
  })
);

export default function Tickets() {
  const classes = useStyles();
  const history = useHistory();
  const isAdmin = localStorage.getItem("role") === "Admin";
  const loggedInUserPhone = localStorage.getItem("phone");
  const [rows, setRows] = useState([]);
  const [tabValue, setTabValue] = useState("Open");
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState();
  const [engineersList, setengineersList] = useState([]);

  useEffect(() => {
    document.title = "Tickets";
    getTickets();
  }, [tabValue]);

  const getTickets = async () => {
    let response;
    if (tabValue === "Open") {
      if (isAdmin) {
        response = await getAdminTicketByStatus("Open");
      } else {
        response = await getEngTicketByStatus(loggedInUserPhone, "Open");
      }
    } else if (tabValue === "Closed") {
      if (isAdmin) {
        response = await getAdminTicketByStatus("Closed");
      } else {
        response = await getEngTicketByStatus(loggedInUserPhone, "Closed");
      }
    }

    console.log(response);
    setRows(response ?? []);
  };

  const columnsForEmployee = useMemo(
    () => [
      { accessorKey: "serialNo", header: "S/no.", size: 50 },
      { accessorKey: "complaintNo", header: "Complaint No", size: 50 },
      {
        accessorKey: "complaintDatetime",
        header: "Complaint Date & Time",
        size: 50,
        Cell: (cell: GridRenderCellParams) => (
          <TextField
            variant="standard"
            disabled={true}
            type="datetime-local"
            style={{ width: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
            name="complaintDatetime"
            defaultValue={cell.row.original.complaintDatetime}
            size="small"
          />
        ),
      },
      {
        accessorKey: "complainantName",
        header: "Complainant Name",
        size: 50,
      },
      {
        accessorKey: "View/Edit",
        header: "View/Edit",
        size: 50,
        Cell: (cell: GridRenderCellParams) => (
          <strong>
            <IconButton
              style={{ marginLeft: 2, color: "#0000FF" }}
              tabIndex={cell.hasFocus ? 0 : -1}
              onClick={() => {
                editRow(cell.row.original);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </strong>
        ),
      },
    ],
    []
  );

  const columnsForAdmin = useMemo(
    () => [
      { accessorKey: "serialNo", header: "S/no.", size: 50 },
      { accessorKey: "complaintNo", header: "Complaint No", size: 50 },
      {
        accessorKey: "complaintDatetime",
        header: "Complaint Date & Time",
        size: 50,
        Cell: (cell: GridRenderCellParams) => (
          <TextField
            variant="standard"
            disabled={true}
            type="datetime-local"
            style={{ width: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
            name="complaintDatetime"
            defaultValue={cell.row.original.complaintDatetime}
            size="small"
          />
        ),
      },
      {
        accessorKey: "complainantName",
        header: "Complainant Name",
        size: 50,
      },
      {
        accessorKey: "engineerAssigned",
        header: "Engineer Assigned",
        size: 50,
      },
      {
        accessorKey: "engineerContactNo",
        header: "Eng. Contact Number",
        size: 50,
      },
      {
        accessorKey: "Re-Assign",
        header: "Re-Assign",
        size: 50,
        Cell: (cell: GridRenderCellParams) => (
          <Chip
            label="Re-assign"
            onClick={() => {
              handleReAssign(cell.row.original);
            }}
            style={{ color: "white", backgroundColor: "#f44336" }}
          />
        ),
      },
      {
        accessorKey: "View/Edit",
        header: "View/Edit",
        size: 50,
        Cell: (cell: GridRenderCellParams) => (
          <strong>
            <IconButton
              style={{ marginLeft: 2, color: "#0000FF" }}
              tabIndex={cell.hasFocus ? 0 : -1}
              onClick={() => {
                editRow(cell.row.original);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </strong>
        ),
      },
      {
        accessorKey: "Delete",
        header: "Delete",
        width: 60,
        Cell: (params: GridRenderCellParams) => (
          <strong>
            <IconButton
              style={{ marginLeft: 2 }}
              tabIndex={params.hasFocus ? 0 : -1}
              onClick={() => {
                deleteRow(params.row.original.complaintNo);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </strong>
        ),
      },
    ],
    []
  );

  const assignTask = (event: any) => {
    history.push("/edit", { data: event });
  };

  const editRow = (event: any) => {
    history.push("/edit", { data: event });
  };

  const deleteRow = (serialNo: string) => {
    const confirmBox = window.confirm(
      "Do you really want to delete Ticket No: ".concat(serialNo)
    );
    if (confirmBox === true) {
      axios
        .delete(`http://localhost:8080/deleteTicket/${serialNo}`)
        .then(function (response) {
          toast.success("Successfully Deleted!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.reload();
        });
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(newValue);
    setTabValue(newValue);
    if (newValue === "Open") {
      // setRows(rawRows);
    } else {
      setRows([]);
    }
  };

  const handleReAssign = async (row: any) => {
    setOpen(true);
    const response = await getEngineersByStatus("Active");
    setengineersList(response);
    setSelectedTicket(row);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        item
        container
        style={{
          padding: "0.5rem",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          // backgroundColor: "#94cc33",
        }}
      >
        <Grid item xl={3} className={classes.firstGridItems}>
          <CustomRangePicker />
        </Grid>
        {isAdmin && (
          <>
            <Grid item xl={1} className={classes.firstGridItems}>
              <Button
                className={classes.button}
                variant="outlined"
                startIcon={<FileUploadIcon />}
              >
                Import
              </Button>
            </Grid>
            <Grid item xl={1} className={classes.firstGridItems}>
              <Button
                className={classes.button}
                variant="outlined"
                startIcon={<FileUploadIcon />}
              >
                Export
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <Grid lg={12} sm={12} xs={12} item container spacing={2}>
        <Grid item lg={12} sm={12} xs={12} className={classes.secondGridItems}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="secondary"
            TabIndicatorProps={{ style: { background: "#e03a3c" } }}
            aria-label="secondary tabs example"
          >
            <Tab value="Open" label="Open" />
            <Tab value="Closed" label="Closed" />
          </Tabs>
        </Grid>
      </Grid>
      <Grid
        lg={12}
        sm={12}
        xs={12}
        item
        container
        spacing={2}
        className={classes.thirdGridItems}
      >
        <Grid item lg={12} sm={12} xs={12}>
          <CustomTable
            data={rows}
            columns={isAdmin ? columnsForAdmin : columnsForEmployee}
          />
        </Grid>
      </Grid>
      <Grid lg={12} sm={12} xs={12} item container spacing={2}>
        <Grid item lg={12} sm={12} xs={12}>
          <ReAssignComponent
            open={open}
            onClose={handleClose}
            engineersList={engineersList}
            selectedTicket={selectedTicket}
          />
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}

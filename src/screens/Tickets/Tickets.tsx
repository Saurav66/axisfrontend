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
import {
  getAdminTicketByStatusAndDateRange,
  getEngTicketByStatusAndDateRange,
} from "./TicketServices";
import CustomRangePicker from "../../global/CustomRangePicker/CustomRangePicker";
import { getEngineersByStatus } from "../Employee/EmployeeService";
import ReAssignComponent from "./ReAssignComponent";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UrlConstants } from "../../global/UrlConstants";

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
  const [tabValue, setTabValue] = useState("OPEN");
  const [OPEN, setOPEN] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState();
  const [engineersList, setengineersList] = useState([]);

  useEffect(() => {
    document.title = "Tickets";
    getTickets("1900-01-01", "9999-01-01");
  }, [tabValue]);

  const getTickets = async (fromDate: String, toDate: String) => {
    let response;
    if (tabValue === "OPEN") {
      if (isAdmin) {
        response = await getAdminTicketByStatusAndDateRange(
          "OPEN",
          fromDate,
          toDate
        );
      } else {
        response = await getEngTicketByStatusAndDateRange(
          loggedInUserPhone,
          "OPEN",
          fromDate,
          toDate
        );
      }
    } else if (tabValue === "CLOSED") {
      if (isAdmin) {
        response = await getAdminTicketByStatusAndDateRange(
          "CLOSED",
          fromDate,
          toDate
        );
      } else {
        response = await getEngTicketByStatusAndDateRange(
          loggedInUserPhone,
          "CLOSED",
          fromDate,
          toDate
        );
      }
    }
    setRows(response ?? []);
  };

  const columnsForEmployee = useMemo(
    () => [
      { accessorKey: "serialNo", header: "S/no.", size: 80 },
      { accessorKey: "complaintNo", header: "Complaint No", size: 120 },
      {
        accessorKey: "complaintDatetime",
        header: "Complaint Date & Time",
        size: 200,
      },
      {
        accessorKey: "complainantName",
        header: "Complainant Name",
        size: 180,
      },
      {
        accessorKey: "complainantContactNo",
        header: "Complainant Contact No",
        size: 200,
      },
      {
        accessorKey: "View/Edit",
        header: "View/Edit",
        size: 120,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: (cell: GridRenderCellParams) => (
          <strong>
            <IconButton
              size="small"
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
      {
        accessorKey: "serialNo",
        header: "S/no.",
        size: 80,
      },
      {
        accessorKey: "complaintNo",
        header: "Complaint No",
        // minSize: 200,
        // maxSize: 200,
        size: 120,
        muiTableHeadCellProps: {
          align: "left",
        },
        muiTableBodyCellProps: {
          align: "lect",
        },
      },
      {
        accessorKey: "complaintDatetime",
        header: "Complaint Date & Time",
        size: 200,
        enableSorting: false,
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
        size: 180,
      },
      {
        accessorKey: "engineerAssigned",
        header: "Engineer Assigned",
        size: 180,
      },
      {
        accessorKey: "engineerContactNo",
        header: "Engineer Contact Number",
        size: 220,
      },
      {
        accessorKey: "Re-Assign",
        header: "Re-Assign",
        size: 120,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: (cell: GridRenderCellParams) => (
          <Chip
            size="small"
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
        size: 120,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: (cell: GridRenderCellParams) => (
          <strong>
            <IconButton
              size="small"
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
        width: 120,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: (params: GridRenderCellParams) => (
          <strong>
            <IconButton
              size="small"
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
        .delete(`${UrlConstants.baseUrl}/deleteTicket/${serialNo}`)
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
    if (newValue === "OPEN") {
      // setRows(rawRows);
    } else {
      setRows([]);
    }
  };

  const handleReAssign = async (row: any) => {
    setOPEN(true);
    const response = await getEngineersByStatus("Active");
    setengineersList(response);
    setSelectedTicket(row);
  };

  const handleClose = (value: string) => {
    setOPEN(false);
  };

  const handleDateRangeChange = (date: any) => {
    getTickets(date[0], date[1]);
  };

  return (
    <>
      <Grid
        lg={12}
        sm={12}
        xs={12}
        item
        container
        spacing={2}
        style={{ marginTop: 2 }}
      >
        <Grid
          item
          lg={6}
          sm={6}
          xs={6}
          className={classes.secondGridItems}
          style={
            {
              // backgroundColor: "red",
            }
          }
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="secondary"
            TabIndicatorProps={{ style: { background: "#e03a3c" } }}
            aria-label="secondary tabs example"
          >
            <Tab value="OPEN" label="OPEN" />
            <Tab value="CLOSED" label="CLOSED" />
          </Tabs>
        </Grid>
        <Grid
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={6}
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
          {isAdmin && (
            <>
              <Grid
                // item
                // xl={6}
                // lg={6}
                // sm={6}
                // xs={6}
                className={classes.firstGridItems}
              >
                <Grid
                  item
                  xl={3}
                  className={classes.firstGridItems}
                >
                  <CustomRangePicker
                    handleDateRangeChange={handleDateRangeChange}
                  />
                </Grid>
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
            open={OPEN}
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

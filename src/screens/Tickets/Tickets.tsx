import {
  Button,
  Chip,
  createStyles,
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
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Tab, Tabs, TextField } from "@mui/material";
import {
  getAdminTicketByStatusAndDateRange,
  getAEITTicketByCircleStatusAndDateRange,
  getEngTicketByStatusAndDateRange,
} from "./TicketServices";
import CustomRangePicker from "../../global/CustomRangePicker/CustomRangePicker";
import { getEngineersByStatus } from "../Employee/EmployeeService";
import ReAssignComponent from "./ReAssignComponent";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UrlConstants } from "../../global/UrlConstants";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import moment from "moment";

const emails = ["username@gmail.com", "user02@gmail.com"];

const useStyles = makeStyles((theme: Theme) =>
  createStyles(
    {
      element: {
        margin: 4,
        width: 150,
        height: 27,
      },
      typography: {
      },
      firstGridItems: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: "0.5rem",
      },
      secondGridItems: {},
      thirdGridItems: {},
      button: {},
    }
  )
);

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Tickets(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const loginUserPhone = localStorage.getItem("phone");
  const loginUserName = localStorage.getItem("userName");
  const isAdmin = localStorage.getItem("role") === "Admin";
  const isSuperAdmin = localStorage.getItem("role") === "superAdmin";
  const isAdminSuperAdmin = (isAdmin || isSuperAdmin) ? true : false;
  const isAEIT = localStorage.getItem("role") === "aeit";
  const userCircle = localStorage.getItem("circle");
  const loggedInUserPhone = localStorage.getItem("phone");
  const [rows, setRows] = useState([]);
  const [tabValue, setTabValue] = useState(
    props.history.location.state?.tabValue ?? !isAEIT ? "OPEN" : "CLOSED"
  );
  const [OPEN, setOPEN] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState();
  const [engineersList, setengineersList] = useState([]);

  const [selectedPrimaryOption, setSelectedPrimaryOption] = useState("All");
  const [secondaryOptionsList, setSecondaryOptionsList] = useState([]);
  const [defaultDateTime, setDefaultDateTime] = useState(['1700-12-12', '9999-12-12']);

  useEffect(() => {
    document.title = "Tickets";
    getTickets(defaultDateTime[0], defaultDateTime[1]);
  }, [tabValue]);

  const getTickets = async (fromDate: String, toDate: String) => {
    let response;
    if (tabValue === "OPEN") {
      if (isAdmin || isSuperAdmin) {
        response = await getAdminTicketByStatusAndDateRange(
          "OPEN",
          fromDate,
          toDate
        );
      } else if (isAEIT) {
        response = await getAEITTicketByCircleStatusAndDateRange(
          "OPEN",
          userCircle,
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
      if (isAdmin || isSuperAdmin) {
        response = await getAdminTicketByStatusAndDateRange(
          "CLOSED",
          fromDate,
          toDate
        );
      } else if (isAEIT) {
        response = await getAEITTicketByCircleStatusAndDateRange(
          "CLOSED",
          userCircle,
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
      { accessorKey: "complaintNo", header: "Complaint No", size: 120 },
      {
        accessorKey: "complaintDatetime",
        header: "Complaint Date & Time",
        size: 200,
        enableSorting: false,
        // Cell: (cell: GridRenderCellParams) => (moment(cell.row.original.complaintDatetime).format("YYYY-MM-DD hh:mm A")),
        Cell: (cell: GridRenderCellParams) => (moment(cell.row.original.complaintDatetime).format("YYYY-MM-DD HH:mm")),
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

  const columnsForAEIT = useMemo(
    () => [
      { accessorKey: "serialNo", header: "S/no.", size: 110 },
      { accessorKey: "complaintNo", header: "Complaint No", size: 150 },
      {
        accessorKey: "complaintDatetime",
        header: "Complaint Date & Time",
        size: 200,
        enableSorting: false,
        // Cell: (cell: GridRenderCellParams) => (moment(cell.row.original.complaintDatetime).format("YYYY-MM-DD hh:mm A")),
        Cell: (cell: GridRenderCellParams) => (moment(cell.row.original.complaintDatetime).format("YYYY-MM-DD HH:mm")),
      },
      {
        accessorKey: "complainantName",
        header: "Complainant Name",
        size: 150,
      },
      {
        accessorKey: "complainantContactNo",
        header: "Complainant Contact No",
        size: 150,
      },
      {
        accessorKey: "aeitStatus",
        header: "AEIT Status",
        size: 40,
        Cell: (cell: GridRenderCellParams) => (
          <>
            {cell.row.original.aeitStatus === "Approved" ? (
              <Typography style={{ color: "#009900" }}>Approved</Typography>
            ) : (
              <Typography style={{ color: "#f44336" }}>{cell.row.original.aeitStatus}</Typography>
            )}
          </>
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
        accessorKey: "aeitStatus",
        header: "Action",
        size: 170,
        Cell: (cell: GridRenderCellParams) => (
          <>
            <Button
              size="small"
              style={{
                color: "white",
                backgroundColor: cell.row.original.aeitStatus === "Approved"
                  ? "#f44336"
                  : "#008000",
                marginTop: 20,
                marginLeft: 4,
                marginBottom: 20,
                minWidth: 120,
              }}
              // type="submit"
              onClick={() =>
                cell.row.original.aeitStatus === "Approved"
                  ? handleUnApproveButton(cell.row.original)
                  : handleApproveButton(cell.row.original)
              }
            >
              {cell.row.original.aeitStatus === "Approved" ? "UnApprove" : "Approve"}
            </Button>
            {!["UnApproved", "Approved"].includes(cell.row.original.aeitStatus) &&
              (<Button
                size="small"
                style={{
                  color: "white",
                  backgroundColor: "#f75f31",
                  marginTop: 20,
                  marginLeft: 4,
                  marginBottom: 20,
                  minWidth: 120,
                }}
                onClick={() => handleRejectButton(cell.row.original)
                }
              >
                {"Reject"}
              </Button>)}
          </>
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
        size: 150,
      },
      {
        accessorKey: "complaintNo",
        header: "Complaint No",
        size: 220,
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
        size: 290,
        enableSorting: false,
        // Cell: (cell: GridRenderCellParams) => (moment(cell.row.original.complaintDatetime).format("YYYY-MM-DD hh:mm A")),
        Cell: (cell: GridRenderCellParams) => (moment(cell.row.original.complaintDatetime).format("YYYY-MM-DD HH:mm")),
      },
      {
        accessorKey: "circle",
        header: "Circle",
        size: 160,
      },
      {
        accessorKey: "complainantName",
        header: "Complainant Name",
        size: 260,
      },
      {
        accessorKey: "engineerAssigned",
        header: "Engineer Assigned",
        size: 250,
      },
      {
        accessorKey: "engineerContactNo",
        header: "Engineer Contact Number",
        size: 310,
      },
      {
        accessorKey: "aeitStatus",
        header: "AEIT Status",
        size: 210,
        Cell: (cell: GridRenderCellParams) => (
          <>
            {cell.row.original.aeitStatus === "Approved" ? (
              <Typography style={{ color: "#009900" }}>Approved</Typography>
            ) : (
              <Typography style={{ color: "#f44336" }}>{cell.row.original.aeitStatus}</Typography>
            )}
          </>
        ),
      },
      {
        accessorKey: "complaintCompletionDatetime",
        header: "Complaint Completion Date & Time",
        size: 390,
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
            defaultValue={cell.row.original.complaintCompletionDatetime}
            size="small"
          />
        ),
      },
      {
        accessorKey: "Re-Assign",
        header: "Re-Assign",
        size: 210,
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
        size: 190,
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

  const columnsForSuperAdmin = useMemo(
    () => [
      {
        accessorKey: "serialNo",
        header: "S/no.",
        size: 150,
      },
      {
        accessorKey: "complaintNo",
        header: "Complaint No",
        // minSize: 200,
        // maxSize: 200,
        size: 220,
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
        size: 290,
        enableSorting: false,
        // Cell: (cell: GridRenderCellParams) => (moment(cell.row.original.complaintDatetime).format("YYYY-MM-DD hh:mm A")),
        Cell: (cell: GridRenderCellParams) => (moment(cell.row.original.complaintDatetime).format("YYYY-MM-DD HH:mm")),
      },
      {
        accessorKey: "circle",
        header: "Circle",
        size: 160,
      },
      {
        accessorKey: "complainantName",
        header: "Complainant Name",
        size: 260,
      },
      {
        accessorKey: "engineerAssigned",
        header: "Engineer Assigned",
        size: 250,
      },
      {
        accessorKey: "engineerContactNo",
        header: "Engineer Contact Number",
        size: 310,
      },
      {
        accessorKey: "aeitStatus",
        header: "AEIT Status",
        size: 210,
        Cell: (cell: GridRenderCellParams) => (
          <>
            {cell.row.original.aeitStatus === "Approved" ? (
              <Typography style={{ color: "#009900" }}>Approved</Typography>
            ) : (
              <Typography style={{ color: "#f44336" }}>{cell.row.original.aeitStatus}</Typography>
            )}
          </>
        ),
      },
      {
        accessorKey: "complaintCompletionDatetime",
        header: "Complaint Completion Date & Time",
        size: 390,
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
            defaultValue={cell.row.original.complaintCompletionDatetime}
            size="small"
          />
        ),
      },
      {
        accessorKey: "Re-Assign",
        header: "Re-Assign",
        size: 210,
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
        size: 190,
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

  const editRow = async (event: any) => {
    if (isAdminSuperAdmin) {
      const response = await getEngineersByStatus("Active");
      history.push("/edit", { data: event.id, engineersList: response });
    } else {
      history.push("/edit", { data: event.id });
    }
  };

  const deleteRow = (complaintNumber: string) => {
    const confirmBox = window.confirm(
      "Do you really want to delete Ticket No: ".concat(complaintNumber)
    );
    if (confirmBox === true) {
      const finalConfirmBox = window.confirm(
        "Do you really want to delete Ticket No: ".concat(complaintNumber).concat(" Permanently")
      );
      if (finalConfirmBox === true) {
        axios
          .delete(
            `${UrlConstants.baseUrl
            }/deleteTicket/${complaintNumber}/loggedInUserId/${localStorage.getItem(
              "id"
            )}`
          )
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
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedPrimaryOption("All")
    setSecondaryOptionsList([])
    setTabValue(newValue);
    if (newValue === "OPEN") {
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
    setDefaultDateTime(date);
  };

  const handleApproveButton = (selectedTicket: any) => {
    axios
      .patch(
        `${UrlConstants.baseUrl
        }/admin/updateTicket/loggedInUserId/${localStorage.getItem("id")}`,
        {
          ...selectedTicket,
          aeitStatus: "Approved",
          approverPhone: loginUserPhone,
          approverName: loginUserName,
        }
      )
      .then(function (response) {
        toast.success("Survey Approved!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => history.push("/tickets"), 700);
      })
      .catch(function (error) {
        toast.error("Error while updating!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleUnApproveButton = (selectedTicket: any) => {
    axios
      .patch(
        `${UrlConstants.baseUrl
        }/admin/updateTicket/loggedInUserId/${localStorage.getItem("id")}`,
        {
          ...selectedTicket,
          aeitStatus: "UnApproved",
          approverPhone: loginUserPhone,
          approverName: loginUserName,
        }
      )
      .then(function (response) {
        toast.success("Survey UnApproved!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => history.push("/tickets"), 700);
      })
      .catch(function (error) {
        toast.error("Error while updating!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleRejectButton = (selectedTicket: any) => {
    axios
      .patch(
        `${UrlConstants.baseUrl
        }/admin/updateTicket/loggedInUserId/${localStorage.getItem("id")}`,
        {
          ...selectedTicket,
          aeitStatus: "Rejected",
          approverPhone: loginUserPhone,
          approverName: loginUserName,
        }
      )
      .then(function (response) {
        toast.success("Survey Rejected!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => history.push("/tickets"), 700);
      })
      .catch(function (error) {
        toast.error("Error while updating!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const onFileDropped = (event: any) => {
    if (event.target.files[0]?.name) {
      axios
        .post(
          `${UrlConstants.baseUrl}/importTickets`,
          {
            file: event.target.files[0],
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(function (response) {
          toast.success("Ticket Imported Successfully", {
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
        })
        .catch(function (error) {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

  const handleExportData = (rows: any[]) => {
    const payload = rows.map((row) => row.original.complaintNo);
    axios
      .post(`${UrlConstants.baseUrl}/exportTicketByComplaintNo`, payload, {
        method: 'POST',
        responseType: 'blob', // important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Exported-Tickets` + ".xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => { });
  };

  const handlePrimaryOptions = async (event: any) => {
    setSelectedPrimaryOption(event.target.value);
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getDistinctValueByColumn/${event.target.value}/${tabValue}/loggedInUserId/${localStorage.getItem("id")}`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => { });
    console.log("respooo", response)
    setSecondaryOptionsList(response)
  };

  const handleSecondaryOptions = async (event: any) => {
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getTicketBy/${selectedPrimaryOption}/${event.target.value}/${tabValue}/loggedInUserId/${localStorage.getItem("id")}`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => { });
    setRows(response);
  };

  const tabComponent = () => {
    return <Tabs
      value={tabValue}
      onChange={handleTabChange}
      textColor="secondary"
      TabIndicatorProps={{ style: { background: "#e03a3c" } }}
      aria-label="secondary tabs example"
    >
      <Tab value="OPEN" label="OPEN TICKETS" />
      <Tab style={{ marginLeft: "0.5rem" }} value="CLOSED" label="CLOSED TICKETS" />
    </Tabs>
  }

  const complaintDatetimeRangePicker = () => {
    return isAdminSuperAdmin && < CustomRangePicker label="Range " handleDateRangeChange={handleDateRangeChange} />
  }

  const selectFilterComponent = () => {
    return (localStorage.getItem("role") === "Admin" ||
      localStorage.getItem("role") === "superAdmin") && (
        <>
          <label className={classes.element}>Filter</label>
          <select
            className={classes.element}
            name="primaryOptions"
            value={selectedPrimaryOption}
            onChange={handlePrimaryOptions}
          >
            <option value="All" >
              All
            </option>
            <option value="engineerAssigned" >
              Engineer Assigned
            </option>
            <option value="circle" >
              Circle
            </option>
            <option value="aeitStatus" >
              AEIT Status
            </option>
            <option value="engineerContactNumber" >
              Engineer Contact Number
            </option>
          </select>
          <select
            className={classes.element}
            name="secondaryOption"
            onChange={handleSecondaryOptions}
          >
            {secondaryOptionsList?.map((x, y) => (
              <option key={y} value={x}>
                {x}
              </option>
            ))}
          </select>
        </>
      )
  }

  const tableComponent = () => {
    return <CustomTable
      onFileDropped={onFileDropped}
      data={rows}
      handleExportData={handleExportData}
      columns={
        isSuperAdmin
          ? columnsForSuperAdmin
          : isAdmin
            ? columnsForAdmin
            : isAEIT
              ? columnsForAEIT
              : columnsForEmployee
      }
    />
  }

  const reAssignComponent = () => {
    return <ReAssignComponent
      open={OPEN}
      onClose={handleClose}
      engineersList={engineersList}
      selectedTicket={selectedTicket}
    />
  }

  return (
    <>
      {/* <CardHeader title="Tickets" /> */}
      <Grid container spacing={2} style={{ marginTop: 10, backgroundColor: "#faf7f7" }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {complaintDatetimeRangePicker()}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {selectFilterComponent()}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {tabComponent()}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Item>{tableComponent()}</Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Item>{reAssignComponent()}</Item>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}

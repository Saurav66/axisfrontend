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
import { useEffect, useState, useMemo, useLayoutEffect } from "react";
import CustomTable from "../../global/CustomTable/CustomTable";
import { useHistory } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ticketData from "../../data/ticketData.json";
import { Stack, Tab, Tabs, TextField } from "@mui/material";
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
import LinearProgress from '@mui/material/LinearProgress';

// const rawRows = [...ticketData];

const emails = ["username@gmail.com", "user02@gmail.com"];

const useStyles = makeStyles((theme: Theme) =>
  createStyles(
    {
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

export default function Tickets(props: any) {
  const classes = useStyles();
  const history = useHistory();
  const loginUserPhone = localStorage.getItem("phone");
  const loginUserName = localStorage.getItem("userName");
  const isAdmin = localStorage.getItem("role") === "Admin";
  const isSuperAdmin = localStorage.getItem("role") === "superAdmin";
  const isAEIT = localStorage.getItem("role") === "aeit";
  const userCircle = localStorage.getItem("circle");
  const loggedInUserPhone = localStorage.getItem("phone");
  const [rows, setRows] = useState([]);
  const [tabValue, setTabValue] = useState(
    props.history.location.state?.tabValue ?? !isAEIT ? "OPEN" : "CLOSED"
  );
  const [OPEN, setOPEN] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState();
  const [engineersList, setengineersList] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState("Saharanpur");

  const [assignedEngineerContactNoList, setAssignedEngineerContactNoList] = useState([]);
  const [selectedPrimaryOption, setSelectedPrimaryOption] = useState("All");
  const [secondaryOptionsList, setSecondaryOptionsList] = useState([]);
  const [selectedSecondaryOption, setSelectedSecondaryOption] = useState("All");

  useEffect(() => {
    document.title = "Tickets";
    getTickets("1900-01-01", "9999-01-01");
    // if (secondaryOptionsList.length === 0) {
    // getTicketAssignedEngineersList();
    // }
  }, [tabValue]);

  // const getTicketAssignedEngineersList = async () => {
  //   const response = await axios
  //     .get(`${UrlConstants.baseUrl}/getDistinctValueByColumn/loggedInUserId/${localStorage.getItem("id")}`)
  //     .then((response: any) => {
  //       return response.data;
  //     })
  //     .catch((error) => { });
  //   setSecondaryOptionsList(response)
  // };

  // const getTicketDropDownMatrix = async () => {
  //   const response = await axios
  //     .get(`${UrlConstants.baseUrl}/getTicketDropDownMatrix/loggedInUserId/${localStorage.getItem("id")}`)
  //     .then((response: any) => {
  //       return response.data;
  //     })
  //     .catch((error) => { });
  //   return response.data;
  //   // setSecondaryOptionsList(response.secondaryOptionsList);
  //   // setAssignedEngineerContactNoList(response.assignedEngineerContactNoList);
  // };

  const getTickets = async (fromDate: String, toDate: String) => {
    setLoading(true)
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
    // setDropdown({ ...dropdown, secondaryOptionsList: response?.map((row: any) => row?.engineerAssigned), assignedEngineerContactNoList: response?.map((row: any) => row?.engineerContactNo) })
    // setSecondaryOptionsList(response?.map((row: any) => row?.engineerAssigned))
    setLoading(false)
  };

  const columnsForEmployee = useMemo(
    () => [
      // { accessorKey: "serialNo", header: "S/no.", size: 80 },
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

  const columnsForAEIT = useMemo(
    () => [
      { accessorKey: "serialNo", header: "S/no.", size: 80 },
      { accessorKey: "complaintNo", header: "Complaint No", size: 90 },
      {
        accessorKey: "complaintDatetime",
        header: "Complaint Date & Time",
        size: 150,
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
                // type="submit"
                onClick={() => handleRejectButton(cell.row.original)
                }
              >
                {"Reject"}
              </Button>)}

            {/* <IconButton
              size="small"
              style={{ marginLeft: 2, color: "#0000FF" }}
              tabIndex={cell.hasFocus ? 0 : -1}
              onClick={() => {
                editRow(cell.row.original);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton> */}
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
        accessorKey: "circle",
        header: "Circle",
        size: 180,
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
        accessorKey: "aeitStatus",
        header: "AEIT Status",
        size: 120,
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
    ],
    []
  );

  const columnsForSuperAdmin = useMemo(
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
        accessorKey: "circle",
        header: "Circle",
        size: 180,
      },
      {
        accessorKey: "complainantName",
        header: "Complainant Name",
        size: 180,
      },
      {
        accessorKey: "engineerAssigned",
        header: "Engineer Assigned",
        //code1
        // filterVariant: 'select',
        // filterSelectOptions: ticketData?.map((ticket: any) => ticket?.engineerAssigned),
        // filterSelectOptions: secondaryOptionsList,
        // filterSelectOptions: [
        //   { text: 'Male', value: 'Male' },
        //   { text: 'Female', value: 'Female' },
        //   { text: 'Other', value: 'Other' },
        // ],
        size: 180,
      },
      {
        accessorKey: "engineerContactNo",
        header: "Engineer Contact Number",
        // filterVariant: 'select',
        // filterSelectOptions: ticketData?.map((ticket: any) => ticket?.engineerContactNo),
        // filterSelectOptions: rows?.map((ticket: any) => ticket?.engineerContactNo),
        size: 220,
      },
      {
        accessorKey: "aeitStatus",
        header: "AEIT Status",
        size: 120,
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
    console.log(newValue);
    setSelectedPrimaryOption("All")
    setSecondaryOptionsList([])
    setTabValue(newValue);
    if (newValue === "OPEN") {
      // setRows(rawRows);
      //code8
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
    console.log("jjj")
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
          console.log(error);
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

  const handlleExportTicket = () => {
    // axios
    //   .get(`${UrlConstants.baseUrl}/exportSurvey/${selectedCity}`)
    //   .then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", `${selectedCity} - Survey.xlsx`);
    //     document.body.appendChild(link);
    //     link.click();
    //   })
    //   .catch((error) => console.log(error));
  };

  const handleExportData = (rows: any[]) => {
    //write code to export
    // console.log(rows.map((row) => row.original.complaintNo))
    const payload = rows.map((row) => row.original.complaintNo);
    axios
      .post(`${UrlConstants.baseUrl}/exportTicketByComplaintNo`, payload, {
        method: 'POST',
        responseType: 'blob', // important
      })
      .then((response) => {
        console.log("response", response.data);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Exported-Tickets` + ".xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
  };

  const handlePrimaryOptions = async (event: any) => {
    //code
    setSelectedPrimaryOption(event.target.value);
    console.log("Tabbb ", tabValue)
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getDistinctValueByColumn/${event.target.value}/${tabValue}/loggedInUserId/${localStorage.getItem("id")}`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => { });
    console.log("respooo", response)
    setSecondaryOptionsList(response) //code3
  };

  const handleSecondaryOptions = async (event: any) => {
    //code1
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getTicketBy/${selectedPrimaryOption}/${event.target.value}/${tabValue}/loggedInUserId/${localStorage.getItem("id")}`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => { });
    setRows(response);
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
          item
          xl={6}
          lg={6}
          md={6}
          sm={6}
          xs={12}
          style={{
            // backgroundColor: "red",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            // marginRight: 2,
          }}
        >
          {(localStorage.getItem("role") === "Admin" ||
            localStorage.getItem("role") === "superAdmin") && (
              <>
                <Grid
                  item
                  // style={{ backgroundColor: "red" }}
                  style={{
                    // backgroundColor: "red",
                    marginTop: 20,
                    minWidth: 50,
                    padding: 5,
                    marginRight: 20
                  }}
                >
                  <label
                    style={{
                      paddingRight: "1rem",
                      color: "black",
                    }}
                  >
                    Select
                  </label>
                  <select
                    style={{
                      width: 295,
                      height: 27,
                    }}
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
                  <label
                    style={{
                      paddingRight: "1rem",
                      color: "black",
                    }}
                  >

                  </label>
                  <select
                    style={{
                      width: 295,
                      height: 27,
                    }}
                    name="secondaryOption"
                    // value={props.ticketData.division}
                    onChange={handleSecondaryOptions}
                  >
                    {secondaryOptionsList?.map((x, y) => (
                      <option key={y} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                  {/* <label htmlFor="contained-button-file">
                    <input
                      style={{ display: "none" }}
                      id="contained-button-file"
                      type="file"
                      onChange={(files) => onFileDropped(files)}
                    />
                    <Button variant="outlined" component="span">
                      Import
                    </Button>
                  </label> */}
                </Grid>
                <div >

                  {/* <label htmlFor="contained-button-file">
                  <Button
                    onClick={handlleExportTicket}
                    variant="contained"
                    startIcon={<FileUploadIcon />}
                  >
                    Export
                  </Button>
                </label> */}
                </div>
              </>
            )}
        </Grid>
      </Grid >
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
          {/* {loading ? <LinearProgress /> :  */}
          <CustomTable
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
          {/* } */}

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

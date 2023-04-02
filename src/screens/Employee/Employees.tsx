import { Button, Grid, IconButton, Stack, Tab, Tabs } from "@mui/material";
import { useHistory } from "react-router-dom";
import CustomTable from "../../global/CustomTable/CustomTable";
import { useEffect, useMemo, useState } from "react";
import { getEngineersByStatus } from "./EmployeeService";
import { GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@material-ui/icons/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@material-ui/core";
import ResetPassword from "./ResetPassword";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";

// const rows = [...employeesData];

export default function Employees() {
  let history = useHistory();
  const [rows, setRows] = useState([]);
  const [tabValue, setTabValue] = useState("Active");
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployeeId] = useState();

  useEffect(() => {
    if (localStorage.getItem("role") === "Admin") {
      document.title = "Employees";
      getEngineers();
    } else {
      window.location.replace("https://axisinfoline.com");
    }
  }, [tabValue]);

  const getEngineers = async () => {
    let response;
    if (tabValue === "Active") {
      response = await getEngineersByStatus("Active");
      response.map((data: any) => {
        data.serialNo = data.id;
      });
    } else if (tabValue === "Inactive") {
      response = await getEngineersByStatus("Inactive");
      response.map((data: any) => {
        data.serialNo = data.id;
      });
    }
    setRows(response ?? []);
  };

  const handleOnClick = () => {
    history.push("/addEmployee");
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Engineer Name", width: 320 },
      { accessorKey: "phone", header: "Engineer Contact No", width: 320 },
      { accessorKey: "circle", header: "Circle", width: 320 },
      { accessorKey: "status", header: "Status", width: 420 },
      {
        accessorKey: "edit",
        header: "Edit",
        width: 100,
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
        header: "Reset Password",
        width: 100,
        Cell: (cell: GridRenderCellParams) => (
          <strong>
            <Button
              size="small"
              onClick={() => {
                resetPasswordRow(cell.row.original);
              }}
            >
              <Typography
                variant="caption"
                style={{ marginLeft: 2, color: "#e03a3c" }}
              >
                Reset Password
              </Typography>
            </Button>
          </strong>
        ),
      },
      {
        header: "Delete",
        width: 100,
        Cell: (cell: GridRenderCellParams) => (
          <strong>
            <IconButton
              size="small"
              style={{ marginLeft: 2 }}
              tabIndex={cell.hasFocus ? 0 : -1}
              onClick={() => {
                deleteRow(cell.row.original);
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

  const editRow = (event: any) => {
    history.push("/addEmployee", { data: event });
  };

  const resetPasswordRow = (row: any) => {
    setOpen(true);
    setSelectedEmployeeId(row);
  };

  const deleteRow = (row: any) => {
    const confirmBox = window.confirm(
      `Do you want to delete Employee: ${row.name} [ ${row.phone} ]`
    );
    if (confirmBox === true) {
      const secondConfirmBox = window.confirm(
        `You can't recover this Employee. Do you really want to delete Employee: ${row.name} [ ${row.phone} ]`
      );
      if (secondConfirmBox === true) {
        const secondConfirmBox = window.confirm(
          `Final Confirmation to delete Employee: ${row.name} [ ${row.phone} ]`
        );
        if (secondConfirmBox === true) {
          axios
            .delete(`${UrlConstants.baseUrl}/deleteEmployee/${row.id}`)
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
    }
  };

  const handleClose = () => {
    // onClose(selectedValue);
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <Grid
        lg={12}
        sm={12}
        xs={12}
        item
        container
        spacing={2}
        style={{ marginTop: 2 }}
      >
        <Grid item lg={6} sm={6} xs={6}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="secondary"
            TabIndicatorProps={{ style: { background: "#e03a3c" } }}
            aria-label="secondary tabs example"
          >
            <Tab value="Active" label="Active" />
            <Tab value="Inactive" label="Inactive" />
          </Tabs>
        </Grid>
        <Grid item lg={6} sm={6} xs={6}>
          <Stack
            spacing={2}
            direction="row"
            style={{
              float: "right",
              color: "blue",
              paddingRight: 20,
            }}
          >
            <Button
              style={{
                color: "white",
                backgroundColor: "#f44336",
                marginTop: 5,
                // marginRight: 4,
                // marginBottom: 20,
                minWidth: 120,
                // padding: 5,
              }}
              variant="outlined"
              onClick={handleOnClick}
            >
              Add Employee
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid lg={12} sm={12} xs={12} item container spacing={2}>
        <Grid item lg={12} sm={12} xs={12}>
          <CustomTable data={rows} columns={columns} />
        </Grid>
      </Grid>
      <Grid lg={12} sm={12} xs={12} item container spacing={2}>
        <Grid item lg={12} sm={12} xs={12}>
          <ResetPassword
            open={open}
            onClose={handleClose}
            selectedEmployee={selectedEmployee}
          />
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
}

import React from "react";

import { Button, Grid, IconButton, Stack, Tab, Tabs } from "@mui/material";
import { useHistory } from "react-router-dom";
import CustomTable from "../../global/CustomTable/CustomTable";
import { useEffect, useMemo, useState } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Survey() {
  let history = useHistory();
  const [selectedCity, setSelectedCity] = useState("Saharanpur");
  const [rows, setRows] = useState([
    {
      serial: "01",
      city: "City",
      circle: "EUDC SRE",
      division: "EUDD-2",
      subDivision: "EUDD-2",
      endLocationAddress: "SITE CODE -349 EUDD-2 CLOCK TOWER SAHARANPUR",
      itHardwareName: "Computer",
      model: "DELL 3050",
      serialNo: "2RT8Q2",
      upsBatteryStatus: "BATTERY FAULTY",
      windowsType: "WINDOWS-10",
      domainJoiningStatus: "DOMAIN",
      nameOfUtilityContactPerson: "AMIT KUMAR",
      phoneNoOfUtilityContactPerson: "8273373345",
    },
  ]);

  const columns = useMemo(
    () => [
      { accessorKey: "serial", header: "S.No.", size: 80 },
      { accessorKey: "city", header: "City.", size: 80 },
      { accessorKey: "circle", header: "Circle", size: 120 },
      { accessorKey: "division", header: "Division", size: 120 },
      { accessorKey: "subDivision", header: "Sub Division", size: 150 },
      {
        accessorKey: "endLocationAddress",
        header: "End Location Address",
        size: 420,
      },
      {
        accessorKey: "itHardwareName",
        header: "IT Hardware Name(Computer/ 600 VA UPS/ 3 KVA UPS/PRINTERS)",
        size: 520,
      },
      { accessorKey: "model", header: "Model", size: 120 },
      { accessorKey: "serialNo", header: "Serial No", size: 120 },
      {
        accessorKey: "upsBatteryStatus",
        header: "Ups Battery status",
        size: 200,
      },
      { accessorKey: "windowsType", header: "Windows Type", size: 150 },
      {
        accessorKey: "domainJoiningStatus",
        header: "Domain Joining Status (Domain/Without Domain)",
        size: 400,
      },
      {
        accessorKey: "nameOfUtilityContactPerson",
        header: "Name of Utility Contact Person",
        size: 270,
      },
      {
        accessorKey: "phoneNoOfUtilityContactPerson",
        header: "Phone no of Utility Contact Person",
        size: 300,
      },
      {
        accessorKey: "edit",
        header: "Edit",
        size: 100,
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
        size: 100,
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
                // deleteRow(params.row.original.complaintNo);
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
    history.push("/addEditSurvey", { data: event });
  };

  useEffect(() => {
    if (localStorage.getItem("role") === "Admin") {
      document.title = "Survey";
      //   getEngineers();
    } else {
      window.location.replace("https://axisinfoline.com");
    }
  }, []);

  const handleOnClick = () => {
    history.push("/addEditSurvey", { selectedCity: selectedCity });
  };

  const handleCityChange = (e: any) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <Stack
        spacing={2}
        direction="row"
        style={{
          float: "right",
          color: "blue",
          paddingRight: 20,
        }}
      >
        <Grid
          item
          xs
          style={{
            marginTop: 20,
            minWidth: 120,
            padding: 5,
          }}
        >
          <label
            style={{
              paddingRight: "1rem",
              color: "black",
            }}
          >
            Select City
          </label>
          <select
            style={{
              width: 295,
              height: 27,
            }}
            name="city"
            // value={props.ticketData.division}
            onChange={handleCityChange}
          >
            <option value="Saharanpur">Saharanpur</option>
            <option value="Muradabad">Muradabad</option>
            {/* {cityOptions.map((x, y) => (
              <option key={y} value={x}>
                {x}
              </option>
            ))} */}
          </select>
        </Grid>
        <Button
          style={{
            color: "white",
            backgroundColor: "#f44336",
            marginTop: 20,
            // marginRight: 4,
            // marginBottom: 20,
            minWidth: 120,
            padding: 5,
          }}
          variant="outlined"
          onClick={handleOnClick}
        >
          Add Survey
        </Button>
      </Stack>
      <Grid lg={12} sm={12} xs={12} item container spacing={2}>
        <Grid item lg={12} sm={12} xs={12}>
          <CustomTable data={rows} columns={columns} />
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
}

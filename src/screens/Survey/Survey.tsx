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
  const [rows, setRows] = useState([]);

  const columns = useMemo(
    () => [
      { accessorKey: "serial", header: "S.No.", width: 320 },
      { accessorKey: "circle", header: "Circle", width: 320 },
      { accessorKey: "division", header: "Division", width: 320 },
      { accessorKey: "subDivision", header: "Sub Division", width: 420 },
      {
        accessorKey: "endLocationAddress",
        header: "End Location Address",
        width: 420,
      },
      {
        accessorKey: "itHardwareName",
        header: "IT Hardware Name(Computer/ 600 VA UPS/ 3 KVA UPS/PRINTERS)",
        width: 420,
      },
      { accessorKey: "model", header: "Model", width: 420 },
      { accessorKey: "Serial No", header: "Serial No", width: 420 },
      {
        accessorKey: "upsBatteryStatus",
        header: "Ups Battery status",
        width: 420,
      },
      { accessorKey: "windowsType", header: "Windows Type", width: 420 },
      {
        accessorKey: "domainJoiningStatus",
        header: "Domain Joining Status (Domain/Without Domain)",
        width: 420,
      },
      {
        accessorKey: "nameofUtilityContactPerson",
        header: "Name of Utility Contact Person",
        width: 420,
      },
      {
        accessorKey: "phoneNoOfUtilityContactPerson",
        header: "Phone no of Utility Contact Person",
        width: 420,
      },
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
                // editRow(cell.row.original);
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

  useEffect(() => {
    if (localStorage.getItem("role") === "Admin") {
      document.title = "Survey";
      //   getEngineers();
    } else {
      window.location.replace("https://axisinfoline.com");
    }
  }, []);

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
          //   onClick={handleOnClick}
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

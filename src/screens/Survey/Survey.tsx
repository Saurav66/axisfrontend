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
import { UrlConstants } from "../../global/UrlConstants";
import axios from "axios";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export default function Survey() {
  let history = useHistory();
  const isAEIT = localStorage.getItem("role") === "AEIT";
  const loggedInUserCircle = localStorage.getItem("circle");
  const [selectedCity, setSelectedCity] = useState("Saharanpur");
  const [cityOptions, setCityOptions] = useState([]);
  const [rows, setRows] = useState([]);

  const deleteRow = (row: any) => {
    console.log("row", row);
    const confirmBox = window.confirm(
      `Do you want to delete Survey of ${row.city} [ ${row.nameOfUtilityContactPerson} - ${row.phoneNoOfUtilityContactPerson} ]`
    );
    if (confirmBox === true) {
      const secondConfirmBox = window.confirm(
        `You can't recover this Survey. Do you really want to delete Survey of ${row.city} [ ${row.nameOfUtilityContactPerson} - ${row.phoneNoOfUtilityContactPerson} ]`
      );
      if (secondConfirmBox === true) {
        const secondConfirmBox = window.confirm(
          `Final Confirmation to delete Survey of ${row.city} [ ${row.nameOfUtilityContactPerson} - ${row.phoneNoOfUtilityContactPerson} ]`
        );
        if (secondConfirmBox === true) {
          axios
            .delete(`${UrlConstants.baseUrl}/deleteSurvey/${row.id}`)
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

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "S.No.", size: 80 },
      { accessorKey: "city", header: "City.", size: 120 },
      { accessorKey: "circle", header: "Circle", size: 180 },
      { accessorKey: "division", header: "Division", size: 180 },
      { accessorKey: "subDivision", header: "Sub Division", size: 180 },
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
        accessorKey: "utilityContactPersonName",
        header: "Name of Utility Contact Person",
        size: 270,
      },
      {
        accessorKey: "utilityContactPersonContact",
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
    history.push("/addEditSurvey", { data: event });
  };

  useEffect(() => {
    if (
      localStorage.getItem("role") === "Admin" ||
      localStorage.getItem("role") === "superAdmin" ||
      localStorage.getItem("role") === "Surveyor" ||
      isAEIT
    ) {
      document.title = "Survey";
    } else {
      window.location.replace("https://axisinfoline.com");
    }
    if (cityOptions.length === 0) {
      getSurveyCities();
    }
  }, []);

  const getSurveys = async (city: String) => {
    const response = await axios
      .get(
        isAEIT
          ? `${UrlConstants.baseUrl}/getSurveyByCircle/${loggedInUserCircle}`
          : `${UrlConstants.baseUrl}/getSurveyByCity/${city}`
      )
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {});
    setRows(response);
  };

  const getSurveyCities = async () => {
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getSurveyCities`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {});
    setSelectedCity(response[0]);
    setCityOptions(response.concat("All"));
    getSurveys(response[0]);
  };

  const handleOnClick = () => {
    history.push("/addEditSurvey", { selectedCity: selectedCity });
  };

  const handleCityChange = async (event: any) => {
    setSelectedCity(event.target.value);
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getSurveyByCity/${event.target.value}`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => {});
    setRows(response);
  };

  const handlleExportSurvey = () => {
    axios
      .get(`${UrlConstants.baseUrl}/exportSurvey/${selectedCity}`)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${selectedCity} - Survey.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));
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
        {!isAEIT && (
          <>
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
                {cityOptions.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </Grid>
            <Button
              style={{
                color: "white",
                backgroundColor: "#f44336",
                marginTop: 20,
                minWidth: 120,
              }}
              variant="outlined"
              onClick={handleOnClick}
            >
              Add Survey
            </Button>
          </>
        )}

        {localStorage.getItem("role") === "Admin" && (
          <>
            <Grid
              // item
              // xl={6}
              // lg={6}
              // sm={6}
              // xs={6}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginTop: 20,
              }}
            >
              <Button variant="outlined" startIcon={<FileUploadIcon />}>
                Import
              </Button>
            </Grid>
            <Grid
              item
              xl={1}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginTop: 20,
              }}
            >
              <Button
                onClick={handlleExportSurvey}
                variant="outlined"
                startIcon={<FileUploadIcon />}
              >
                Export
              </Button>
            </Grid>
          </>
        )}
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

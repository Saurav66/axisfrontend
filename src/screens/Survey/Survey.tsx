import {
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myDropZone: {
      position: "relative",
      width: "100%",
      height: "10px",
    },
  })
);

export default function Survey() {
  const classes = useStyles();
  let history = useHistory();
  const isSuperAdmin = localStorage.getItem("role") === "superAdmin";
  const isAEIT = localStorage.getItem("role") === "aeit";
  const loggedInUserCity = localStorage.getItem("city");
  const [selectedCity, setSelectedCity] = useState("Saharanpur");
  const [cityOptions, setCityOptions] = useState([]);
  const [rows, setRows] = useState([]);

  const deleteRow = (row: any) => {
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
            .delete(
              `${UrlConstants.baseUrl}/deleteSurvey/${row.id
              }/loggedInUserId/${localStorage.getItem("id")}`
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
      { accessorKey: "machineMake", header: "Machine Make", size: 120 },
      { accessorKey: "model", header: "Model", size: 120 },
      { accessorKey: "serialNo", header: "Serial No", size: 250 },
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
    ],
    []
  );

  const columnsForSuperAdmin = useMemo(
    () => [
      { accessorKey: "id", header: "S.No.", size: 80 },
      { accessorKey: "city", header: "City", size: 120 },
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
      { accessorKey: "machineMake", header: "Machine Make", size: 120 },
      { accessorKey: "model", header: "Model", size: 120 },
      { accessorKey: "serialNo", header: "Serial No", size: 250 },
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
          ? `${UrlConstants.baseUrl}/getSurveyByCity/${loggedInUserCity}`
          : `${UrlConstants.baseUrl}/getSurveyByCity/${city}`
      )
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => { });
    setRows(response);
  };

  const getSurveyCities = async () => {
    const response = await axios
      .get(`${UrlConstants.baseUrl}/getSurveyCities`)
      .then((response: any) => {
        return response.data;
      })
      .catch((error) => { });
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
      .catch((error) => { });
    setRows(response);
  };

  const handlleExportSurvey = () => {
    axios
      .get(`${UrlConstants.baseUrl}/exportSurvey/${selectedCity}`, {
        method: "GET",
        responseType: "blob", // important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${selectedCity} - Survey.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => { });
  };

  const onFileDropped = (event: any) => {
    if (event.target.files[0]?.name) {
      axios
        .post(
          `${UrlConstants.baseUrl}/importSurvey`,
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
          toast.success(response.data, {
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

  function s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  const handleExportData = (rows: any[]) => {
    const payload = rows.map((row) => row.original.id);
    axios
      .post(`${UrlConstants.baseUrl}/exportSurveyById`, payload, {
        method: "GET",
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${selectedCity} - Survey` + ".xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => { });
  };

  return (
    <div style={{ maxWidth: "100%", marginTop: 20, }}>
      {!isAEIT && (
        <>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={4} style={{ maxWidth: "100%", marginBottom: 15, }}>
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
              onChange={handleCityChange}
            >
              {cityOptions.map((x, y) => (
                <option key={y} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <Button
              size="small"
              style={{
                color: "white",
                backgroundColor: "#f44336",
                marginLeft: 8,
                minWidth: 120,
                marginTop: 12,
                marginBottom: 12,
              }}
              variant="outlined"
              onClick={handleOnClick}
            >
              Add Survey
            </Button>
          </Grid>
        </>
      )}
      <Grid item lg={12} sm={12} xs={12}>
        <CustomTable
          onFileDropped={onFileDropped}
          data={rows}
          columns={isSuperAdmin ? columnsForSuperAdmin : columns}
          handleExportData={handleExportData}
        />
      </Grid>
      <ToastContainer />
    </div>
  );
}

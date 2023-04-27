import { Grid, Stack } from "@mui/material";
import CustomTable from "../../global/CustomTable/CustomTable";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocations } from "./LocationService";


export default function LocationList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("role") === "Admin" ||
      localStorage.getItem("role") === "superAdmin"
    ) {
      document.title = "LocationList";
      getEngineers();
    } else {
      window.location.replace("https://axisinfoline.com");
    }
  }, []);

  const getEngineers = async () => {
    let response;
    response = await getLocations();
    response.map((data: any) => {
      data.serialNo = data.id;
    });
    setRows(response ?? []);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "zone", header: "Zone", width: 320 },
      { accessorKey: "circle", header: "Circle", width: 320 },
    ],
    []
  );

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
          </Stack>
        </Grid>
      </Grid>
      <Grid lg={12} sm={12} xs={12} item container spacing={2}>
        <Grid item lg={12} sm={12} xs={12}>
          <CustomTable data={rows} columns={columns} />
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
}

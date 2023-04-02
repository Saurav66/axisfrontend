import makeStyles from "@mui/material/styles/makeStyles";
import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";

const CustomTable = (props: any) => {
  const globalTheme = useTheme();

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table
          info: {
            main: "rgb(255,122,0)", //add in a custom color for the toolbar alert background stuff
          },
          background: {
            default:
              globalTheme.palette.mode === "light"
                ? "rgb(254,255,244)" //random light yellow color for the background in light mode
                : "#000", //pure black table in dark mode for fun
          },
        },
        typography: {
          button: {
            textTransform: "none", //customize typography styles for all buttons in table by default
            fontSize: "1.2rem",
          },
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: "1.1rem", //override to make tooltip font size larger
              },
            },
          },
          MuiSwitch: {
            styleOverrides: {
              thumb: {
                color: "pink", //change the color of the switch thumb in the columns show/hide menu to pink
              },
            },
          },
        },
      }),
    [globalTheme]
  );

  return (
    <div style={{ height: 500 }}>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          // renderTopToolbarCustomActions={() => <label>Customer's Table</label>}
          muiTopToolbarProps={{
            sx: {
              // backgroundColor: "#D3D3D3",
            },
          }}
          enableHiding={false}
          enableSorting={false}
          enableColumnActions={false}
          enableColumnFilters={false}
          muiTableProps={{
            sx: {
              tableLayout: "fixed",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              flex: "0 0 auto",
            },
          }}
          muiTableBodyRowProps={{ hover: true }}
          enableDensityToggle={false}
          initialState={{ density: "compact" }}
          enableRowSelection={false}
          columns={props.columns}
          data={props.data}
          //passing the static object variant if no dynamic logic is needed
          muiSelectCheckboxProps={{
            color: "secondary", //makes all checkboxes use the secondary color
          }}
          muiTableHeadCellProps={{
            sx: {
              // backgroundColor: "#111111",
              // color: "white",
              // backgroundColor: "#FFFFE0",
              fontWeight: "bold",
              fontSize: "15px",
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
};
export default CustomTable;

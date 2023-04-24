import { useMemo } from "react";
import MaterialReactTable, { MRT_Row } from "material-react-table";
import { createTheme, Grid, ThemeProvider, useTheme } from "@mui/material";
import { Box, Button } from "@material-ui/core";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const CustomTable = (props: any) => {
  const globalTheme = useTheme();
  const isAdmin = localStorage.getItem("role") === "superAdmin" || localStorage.getItem("role") === "Admin" ? true : false;

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
            // default:
            //   globalTheme.palette.mode === "light"
            //     ? "rgb(254,255,244)" //random light yellow color for the background in light mode
            //     : "#000", //pure black table in dark mode for fun
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

  const handleExportRows = (rows: any[]) => {
    props.handleExportData(rows);
  };

  return (

    // <div style={{ height: 500 }}>
    <div style={{ height: "auto" }}>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          enableRowNumbers={true}
          enableHiding={false}
          enableSorting={false}
          enableColumnActions={false}
          muiTablePaginationProps={{
            rowsPerPageOptions: [20, 50, 100, 1000],
            showFirstButton: false,
            showLastButton: false,
            sx: {
              '.MuiPaper-root': {
                backgroundColor: 'rosybrown',
                color: 'black',
              },
              '.MuiTablePagination-menuItem': {
                ':hover': {
                  backgroundColor: 'turquoise',
                },
                backgroundColor: 'yellow',
              },
              '.MuiTablePagination-menuItem.Mui-selected': {
                ':hover': {
                  backgroundColor: 'blue',
                },
                backgroundColor: 'purple',
              },
            },
          }
          }
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
          initialState={{ density: "compact", showColumnFilters: true, pagination: { pageSize: 20, pageIndex: 0 }, showGlobalFilter: true }}
          enableRowSelection={false}
          columns={props.columns}
          data={props.data}
          muiSelectCheckboxProps={{
            color: "secondary", //makes all checkboxes use the secondary color
          }}
          muiTableHeadCellProps={{
            sx: {
              fontWeight: "bold",
              fontSize: "15px",
            },
          }}

          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {(props.handleExportData && isAdmin) && (
                <>
                  <Grid container>
                    <Grid style={{ padding: 8 }}>
                      {props.onFileDropped && isAdmin && (
                        <label htmlFor="contained-button-file">
                          <input
                            style={{ display: "none" }}
                            id="contained-button-file"
                            type="file"
                            onChange={(files) => props.onFileDropped(files)}
                          />
                          <Button variant="outlined" component="span">
                            Import
                          </Button>
                        </label>
                      )}
                    </Grid>
                    <Grid style={{ padding: 8 }}>
                      <Button
                        disabled={table.getPrePaginationRowModel().rows.length === 0}
                        onClick={() =>
                          handleExportRows(table.getPrePaginationRowModel().rows)
                        }
                        // startIcon={<FileDownloadIcon />}
                        variant="contained"
                      >
                        Export
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          )}
        />
      </ThemeProvider>
    </div >
  );
};
export default CustomTable;

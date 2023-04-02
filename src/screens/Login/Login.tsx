import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { authenticated } from "./LoginService";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Axis Info
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const history = useHistory();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const employee = {
      phone: data.get("phone"),
      password: data.get("password"),
    };
    authenticated(employee).then((response) => {
      localStorage.setItem("role", response.role);
      localStorage.setItem("userName", response.name);
      localStorage.setItem("phone", response.phone);
      localStorage.setItem("id", response.id);
      if (response) {
        if (response.role === "Surveyor") {
          history.push({
            pathname: "/survey",
          });
        } else {
          history.push({
            pathname: "/tickets",
          });
        }
      } else {
        toast.error("Incorrect Phone Number or Password!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Grid style={{ width: 400 }} container component="main">
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            component={Paper}
            elevation={0}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#FFFFFF" }}>
                <LockOutlinedIcon style={{ marginLeft: 2, color: "#e03a3c" }} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    color: "white",
                    backgroundColor: "#f44336",
                    marginTop: 20,
                    marginLeft: 4,
                    marginBottom: 28,
                    minWidth: 120,
                  }}
                >
                  Sign In
                </Button>
                <Copyright sx={{ mt: 4 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

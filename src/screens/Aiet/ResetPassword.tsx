import { Box, Grid } from "@material-ui/core";
import React from "react";
import { Button, Dialog, DialogTitle, Typography } from "@material-ui/core";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UrlConstants } from "../../global/UrlConstants";

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  selectedEmployee: any;
}

export default function ResetPassword(props: SimpleDialogProps) {
  const history = useHistory();
  const { onClose, open } = props;
  const [newPassword, setNewPassword] = useState();

  const handleInputChange = (event: any) => {
    setNewPassword(event.target.value);
  };

  const handeSubmitButton = (e: any) => {
    e.preventDefault();
    axios
      .patch(`${UrlConstants.baseUrl}/updatePassword`, {
        id: props.selectedEmployee.id,
        password: newPassword,
      })
      .then(function (response) {
        toast.success("Successfully Updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
          theme: "colored",
        });
      });
    setTimeout(() => history.push("/employees"), 700);
  };

  const handleClose = () => {
    // onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    // style={{
    //   // color: "black",
    //   paddingTop: "0.3rem",
    //   paddingLeft: "2rem",
    //   textAlign: "left",
    // }}
    >
      <DialogTitle>
        {props?.selectedEmployee?.name}
        {/* {selectedValue.complaintNo} */}
      </DialogTitle>
      <Typography
        style={{
          color: "black",
          paddingTop: "0.3rem",
          paddingLeft: "2rem",
          textAlign: "left",
        }}
      >
        Reset Password
      </Typography>
      <Grid item xs>
        <Box>
          <input
            style={{
              width: 240,
              height: 27,
              marginLeft: "2rem",
              marginRight: "2rem",
              marginBottom: "2rem",
            }}
            autoComplete="new-password"
            name="complainantContactNo"
            type="tel"
            value={newPassword}
            onChange={handleInputChange}
          />
        </Box>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
      // style={{ minHeight: "100vh" }}
      >
        <Button
          variant="outlined"
          style={{
            color: "white",
            backgroundColor: "#900080",
            margin: "0.1rem",
          }}
          onClick={() => history.push("/employees")}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          style={{
            color: "white",
            backgroundColor: "#f44336",
            margin: "0.1rem",
          }}
          type="submit"
          onClick={handeSubmitButton}
        >
          Submit
        </Button>
      </Grid>

      {/* onClick={() => handleListItemClick(email)} */}
      <ToastContainer />
    </Dialog>
  );
}

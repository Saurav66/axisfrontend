import { Button, Dialog, DialogTitle, Typography } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UrlConstants } from "../../global/UrlConstants";

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  engineersList: any;
  selectedTicket: any;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const history = useHistory();
  const { onClose, engineersList, open } = props;
  const [selectedValue, setselectedValue] = useState();
  const [ticketData, setTicketData] = useState([]);

  const handleClose = () => {
    // onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const handleAssignedEngChange = (event: any) => {
    let value = event?.target.value.split(",");
    let id = value[0];
    let name = value[1];
    let phone = value[2];
    setTicketData({
      ...props.selectedTicket,
      engineerAssigned: name,
      engineerContactNo: phone,
    });
  };

  const handeSubmitButton = (e: any) => {
    e.preventDefault();
    axios
      .patch(`${UrlConstants.baseUrl}/admin/updateTicket`, ticketData)
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
    setTimeout(() => history.push("/tickets"), 700);
  };

  //code
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
        {"Ticket No: "}
        {props?.selectedTicket?.complaintNo}
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
        Assign Engineer
      </Typography>
      <select
        //  style={{
        //   // color: "black",
        //   paddingTop: "0.3rem",
        //   paddingLeft: "2rem",
        //   textAlign: "left",
        // }}
        style={{
          width: 240,
          height: 27,
          marginLeft: "2rem",
          marginRight: "2rem",
          marginBottom: "2rem",
        }}
        id="engineer"
        name="engineer"
        // value={ticketData.circle}
        onChange={handleAssignedEngChange}
      >
        <option value="pleaseSelect">Please Select</option>
        {engineersList.map((x: any, y: any) => (
          <option key={y} value={[x.id, x.name, x.phone]}>
            {x.name}
          </option>
        ))}
      </select>

      <Button
        style={{
          color: "white",
          backgroundColor: "#f44336",
          marginBottom: 20,
          marginRight: "7.5rem",
          marginLeft: "7.5rem",
        }}
        type="submit"
        onClick={handeSubmitButton}
      >
        Assign
      </Button>
      <Button
        variant="outlined"
        style={{
          color: "white",
          backgroundColor: "#900080",
          marginBottom: 20,
          marginRight: "7.5rem",
          marginLeft: "7.5rem",
        }}
        onClick={() => history.push("/tickets")}
      >
        Cancel
      </Button>
      {/* onClick={() => handleListItemClick(email)} */}
      <ToastContainer />
    </Dialog>
  );
}

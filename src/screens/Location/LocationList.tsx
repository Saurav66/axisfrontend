import { Box } from "@mui/material";
import axios from "axios";
import React from "react";
import { UrlConstants } from "../../global/UrlConstants";

export default function LocationList() {
  const handleOnChange = (e: any) => {
    if (e.target.files[0] != null) {
      const formData = new FormData();
      formData.append("fileUpload", e.target.files[0]);
      // axios.post({
      //   url: `${UrlConstants.baseUrl}/importLocation`,
      //   data: formData,
      //   headers: {
      //     "x-device-id": "stuff",
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // .then((response) => response.data);

      axios
        .put(`${UrlConstants.baseUrl}/importLocation`, formData)
        .then((response) => {
          console.log("response.data");
        })
        .catch((error) => {
          console.log("*****  " + error);
        });
    }
  };

  return (
    <Box>
      <input
        type="file"
        name="file"
        onChange={handleOnChange}
        accept=".xls,.xlsx"
      />{" "}
      {/* <input type="submit" value="Upload file" /> */}
    </Box>
  );
}

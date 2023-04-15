import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";

export const getAdminTicketByStatusAndDateRange = async (
  status: any,
  fromDate: String,
  toDate: String
) => {
  const response = await axios
    .get(
      `${UrlConstants.baseUrl}/getTickets/admin/${status}/${fromDate}/${toDate}`
    )
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("There was an error!", error);
    });
  return response;
};

export const getAEITTicketByCircleStatusAndDateRange = async (
  status: any,
  circle: any,
  fromDate: String,
  toDate: String
) => {
  const response = await axios
    .post(
      `${UrlConstants.baseUrl}/getTickets/aeit/${status}/${fromDate}/${toDate}`,
      { text: circle }
    )
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("There was an error!", error);
    });
  return response;
};

export const getEngTicketByStatusAndDateRange = async (
  phone: any,
  status: any,
  fromDate: String,
  toDate: String
) => {
  const response = await axios
    .get(
      `${UrlConstants.baseUrl}/getTickets/${phone}/${status}/${fromDate}/${toDate}`
    )
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("There was an error!", error);
    });
  return response;
};

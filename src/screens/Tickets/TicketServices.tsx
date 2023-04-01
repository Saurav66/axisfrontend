import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";

export const getAdminTicketByStatus = async (status: any) => {
  const response = await axios
    .get(`${UrlConstants.baseUrl}/getTickets/admin/${status}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("There was an error!", error);
    });
  return response;
};

export const getEngTicketByStatus = async (phone: any, status: any) => {
  const response = await axios
    .get(`${UrlConstants.baseUrl}/getTickets/${phone}/${status}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("There was an error!", error);
    });
  return response;
};

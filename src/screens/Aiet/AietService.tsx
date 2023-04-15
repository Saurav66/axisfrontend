import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";

export const getAietByStatus = async (status: any) => {
  const response = await axios
    .get(`${UrlConstants.baseUrl}/getAllAeit/${status}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("There was an error!", error);
    });
  return response;
};
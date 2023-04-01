import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";

export const getEngineersByStatus = async (status: any) => {
  const response = await axios
    .get(`${UrlConstants.baseUrl}/getAllEngineers/${status}`)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("There was an error!", error);
    });
  return response;
};
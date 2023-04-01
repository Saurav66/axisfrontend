import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";

export const authenticated = async (employee: any) => {
  const response = axios
    .post(`${UrlConstants.baseUrl}/authenticated`, employee)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};

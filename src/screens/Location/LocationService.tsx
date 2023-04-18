import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";

export const getLocations = async () => {
    const response = await axios
        .get(`${UrlConstants.baseUrl}/getAllCirclesForEngineer`)
        .then((response: any) => {
            return response.data;
        })
        .catch((error: any) => {
            console.error("There was an error!", error);
        });
    return response;
};
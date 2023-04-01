import { Switch, Route } from "react-router-dom";
import Tickets from "../Tickets/Tickets";
import SideBar from "../../global/SideBar/SideBar";
import EditTicket from "../Tickets/EditTicket/EditTicket";
import Employees from "../Employee/Employees";
import EmployeeTicket from "../Tickets/EmployeeTicket";
import LocationList from "../Location/LocationList";
import AddEmployee from "../Employee/AddEmployee/AddEmployee";
import { useEffect } from "react";
import axios from "axios";
import { UrlConstants } from "../../global/UrlConstants";
import Survey from "../Survey/Survey";
import AddEditSurvey from "../Survey/AddEditSurvey";

//authenticated api will give response. if authenticated then only redirect to following urls/routes.

export default function Layout() {
  const getPerson = async (id: string) => {
    const response = await axios
      .get(`${UrlConstants.baseUrl}/employee/${id}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    return response;
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      const loggedInPerson = getPerson(localStorage.getItem("id") ?? "");
      if (!loggedInPerson) {
        window.location.replace("https://axisinfoline.com");
      }
    } else {
      window.location.replace("https://axisinfoline.com");
    }
  }, []);

  const Pages = () => {
    return (
      <Switch>
        <Route exact path={"/tickets"} component={Tickets} />
        <Route exact path={"/assignedTickets"} component={EmployeeTicket} />
        <Route exact path={"/edit"} component={EditTicket} />
        <Route exact path={"/employees"} component={Employees} />
        <Route exact path={"/addEmployee"} component={AddEmployee} />
        <Route exact path={"/locations"} component={LocationList} />
        <Route exact path={"/survey"} component={Survey} />
        <Route exact path={"/addEditSurvey"} component={AddEditSurvey} />
      </Switch>
    );
  };

  return (
    <div>
      <SideBar />
      <Pages />
    </div>
  );
}

import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
import { AppsProvider } from "./context";

import Login from "./page/login";
import Register from "./page/register";
import Dashboard from "./page/dashboard";
import LoginOrganizer from "./page/login-organizer";
import RegisterOrganizer from "./page/register-organizer";
import DashboardOrganizer from "./page/dashboard-organizer";
import DashboardOrganizerDetail from "./page/dashboard-organizer-detail";

function App() {
  return (
    <AppsProvider>
        <div>
          <Router>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Register}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
            <Route path="/organizer/" exact component={LoginOrganizer}></Route>
            <Route path="/organizer/register" exact component={RegisterOrganizer}></Route>
            <Route path="/organizer/dashboard" exact component={DashboardOrganizer}></Route>
            <Route path="/organizer/dashboard/event" exact component={DashboardOrganizerDetail}></Route>
            {/*<Route path="/Pendaftaran/pasien" component={TambahPendaftar}></Route>
            <Route path="/Pendaftaran/list" component={Antrian}></Route>
            <Route path="/Printformpasien" component={Printformpasien}></Route>
            <Route path="/Umum/Nursestation" component={NurseStation}></Route> */}
          </Router>
        </div>
      </AppsProvider>
  );
}

export default App;

import React from "react";
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import AdminDashboard from "./admin/AdminDashboard";
import Stations from "./admin/Stations";
import StationDetail from "./admin/StationDetail";
import CreateStation from "./admin/CreateStation";
import SuspendedCards from "./admin/SuspendedCards";
import BreezeCards from "./admin/BreezeCards";
import FlowReport from "./admin/FlowReport";
import Trip from "./passenger/Trip";
import ManageCards from "./passenger/ManageCards";
import TripHistory from "./passenger/TripHistory";
import { Navbar, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

const AppContainer = () => {
  const history = createHistory();
  return (
    <Router history={history}>
      <div>
        <Navbar fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                <Image src="/assets/logo.svg" style={{height: "25px"}}/>
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div style={{marginTop: "60px"}}>
          <Route exact path="/" render={() => <Redirect to="/login"/>}/>
          <Route path="/login" render={() => <Login history={history}/>}/>
          <Route
            path="/registration"
            render={() => <Registration history={history}/>}
          />
          <Route
            path="/admin-dashboard"
            render={() => <AdminDashboard history={history}/>}
          />
          <Route exact path="/stations" component={Stations}/>
          <Route
            path="/station-detail/:station"
            render={() => <StationDetail history={history}/>}
          />
          <Route 
            path="/create-new-station"
            render={() => (<CreateStation history={history}/>)}
          />
          <Route path="/suspended-cards" component={SuspendedCards}/>
          <Route path="/breeze-cards" component={BreezeCards}/>
          <Route path="/passenger-flow" component={FlowReport}/>
          <Route path="/my-trip" render={() => <Trip history={history}/>}/>
          <Route path="/my-cards" component={ManageCards}/>
          <Route path="/trip-history" component={TripHistory}/>
        </div>
      </div>
    </Router>
  );
};

export default AppContainer;
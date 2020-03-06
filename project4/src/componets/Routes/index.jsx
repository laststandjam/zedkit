import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Tickets from "../../pages/Tickets";
import User from "../../pages/User";
import PasswordForget from "../../pages/PasswordForget";
import TicketShow from "../../pages/TicketShow";
import CreateTicket from "../../pages/CreateTicket"

export default ({ currentUser }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/login"
      render={() => <Login currentUser={currentUser} />}
    />
    <Route
      exact
      path="/signup"
      render={() => <Signup currentUser={currentUser} />}
    />

    <Route exact path="/tickets" render={() => <Tickets />} />
    
    <Route exact path="/user" component={User} />
    <Route exact path="/create" component={CreateTicket}/>
    <Route
      exact
      path="/tickets/:id"
      render={props => <TicketShow {...props} />}
    />

    <Route exact path="/password-forget" component={PasswordForget} />
  </Switch>
);

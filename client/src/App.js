import React from "react";
import "./App.css";
import {Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Startpage from "./components/Startpage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyCars from "./components/MyCars";
import AddCar from "./components/AddCar";
//import CarDetails from "./components/CarDetails"; / obsolete
import CarView from "./components/CarView";
import AddLog from "./components/AddLog";

import FuelStations from "./components/FuelStations";


class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  myCarsRoute = props => {
    if (this.state.user) {
      return <MyCars {...props} user={this.state.user} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  

  render() {
    console.log("App -----> rendered")
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route exact path="/" component={Startpage} />
          <Route exact path="/signup" render={
            props => <Signup {...props} setUser={this.setUser} />
          }/>
          <Route exact path="/login" render={
            props => <Login {...props} setUser={this.setUser} />
          }/>
          <Route exact path="/myCars" render={this.myCarsRoute}/>
          <Route exact path="/addCar" render={
            props => <AddCar {...props} user={this.state.user} />
          }/>
          <Route exact path="/myCars/:id" render={
            props => <CarView user={this.state.user} {...props} />
          }/>
          <Route exact path="/myCars/:id/addLog" render={
            props => <AddLog {...props} />
          }/>
          <Route exact path="/fuelstations" component={FuelStations} />
        </Switch>
      </div>
    );
  }
}

export default App;

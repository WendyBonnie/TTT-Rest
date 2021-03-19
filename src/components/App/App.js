import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Abonnement from "../Abonnement/Abonnement";
import Profil from "../Profil/Profil";
import Connexion from "../Connexion/Connexion";
import ConnexionAbo from "../ConnexionAbo/ConnexionAbo";
import Inscription from "../Inscription/Inscription";
import HomePage from "../HomePage/HomePage";
import Menu from "../Menu/Menu";
import Personnel from "../Personnel/Personnel";
import PasswordRenew from "../PasswordRenew/PasswordRenew";
import PasswordReset from "../PasswordReset/PasswordReset";

import Navbar from "../../assets/components/Navbar/Navbar";
import Footer from "../../assets/components/Footer/Footer";
import DataClient from "../dataClient/dataClient";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.setState({ login: true });
    }
  }
  setLogin = (value) => {
    this.setState({ login: value });
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar setLogin={this.setLogin} login={this.state.login} />

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Connexion setLogin={this.setLogin} {...props} />
              )}
            />
            <Route path="/homepage" component={HomePage} />

            <Route path="/inscription" component={Inscription} />
            <Route
              path="/profil"
              render={(props) => <Profil setLogin={this.setLogin} {...props} />}
            />
            <Route path="/dataClient" component={DataClient} />
            <Route path="/menus" component={Menu} />
            <Route path="/equipe" component={Personnel} />
            <Route path="/abonnement" component={Abonnement} />
            <Route path="/passwordRenew" component={PasswordRenew} />
            <Route path="/passwordReset" component={PasswordReset} />
          </Switch>

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;

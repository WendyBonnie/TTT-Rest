import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Deconnexion.css";

class Deconnexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  redirect = () => {
    if (this.state.redirect) {
      localStorage.clear();
      this.props.setLogin(false);
      return <Redirect to="/connexion" />;
    }
  };
  render() {
    return (
      <div className="deconnect">
        <button
          onClick={() => {
            this.setState({ redirect: true });
          }}
          className="signOut"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
        {this.redirect()}
      </div>
    );
  }
}

export default Deconnexion;

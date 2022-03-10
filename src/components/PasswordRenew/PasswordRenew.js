/**
 * PasswordRenew.js - PasswordRenew component
 */

/* Modules and components imports */
import React, { Component } from "react";
import "./PasswordRenew.css";
import { Row, Col, Container, Button } from "react-bootstrap";
/* PasswordRenew component */
class PasswordRenew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  passwordRenew = (e) => {
    e.preventDefault();

    if (!this.state.email || !this.state.password) {
      return;
    }

    const data = {
      email: this.state.email,
      password: this.state.password,
      token: this.props.match.params.token,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/password-renew",
      options
    )
      .then((response) => response.json())
      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <Container className="renewPass">
        <Row>
          <Col className="PassRenewCol" md={12}>
            <h1 className="newPass"> Votre nouveau mot de passe</h1>
            <form className="formRenew" onSubmit={this.passwordRenew}>
              <input
                className="inputRenew"
                type="email"
                id="email"
                name="email"
                onChange={this.handleInput}
                placeholder="Email"
              />

              <br />

              <input
                className="inputRenew"
                type="password"
                id="password"
                name="password"
                onChange={this.handleInput}
                placeholder="Nouveau mot de passe"
              />
              <br />
              <span>{this.state.message}</span>
              <br />

              <Button onClick={this.passwordRenew} className="renewButton">
                Valider
              </Button>
              <br />
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PasswordRenew;

/**
 * PasswordRenew.js - PasswordRenew component
 */

/* Modules and components imports */
import React, { Component } from "react";
import "./PasswordRenew.css";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
/* PasswordRenew component */
class PasswordRenew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      isRevealPwd: false,
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
          this.props.history.push("/");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <Container className="renewPass">
        <Row className="rowPass">
          <Col className="PassRenewCol" md={6}>
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

              <div className="pwd-container">
                <Form.Control
                  type={this.state.isRevealPwd ? "text" : "password"}
                  placeholder="Nouveau mot de passe"
                  id="password"
                  name="password"
                  className="inputRenew"
                  onChange={this.handleInput}
                />
                {this.state.isRevealPwd ? (
                  <a
                    onClick={() => {
                      this.setState({ isRevealPwd: false });
                    }}>
                    <img src="/image/oeil.png" />
                  </a>
                ) : (
                  <a
                    onClick={() => {
                      this.setState({ isRevealPwd: true });
                    }}>
                    <img src="/image/invisible.png" />
                  </a>
                )}
              </div>

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

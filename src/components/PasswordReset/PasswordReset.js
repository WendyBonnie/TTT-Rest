/**
 * PasswordReset.js - PasswordReset component
 */

/* Modules and components imports */
import React, { Component } from "react";
import {
 Row,
 Col,
 Button,
 Container
} from "react-bootstrap";
import "./PasswordReset.css";
/* PasswordReset component */
class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  passwordReset = (e) => {
    e.preventDefault();

    if (!this.state.email) {
      return;
    }

    const data = {
      email: this.state.email,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };

    fetch("https://back-end.osc-fr1.scalingo.io/serveur/password-reset", options)
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
      <Container className="passwordReset">
      <Row>
        <Col className="PassResetCol" md={12}>
          <div className="PassResetDiv">
          <h1 className="taille">Veuillez saisir votre mail </h1>
          <h1 className="titrePass taille">pour réinitialiser votre mot de passe </h1>
             <form  className="formReset" onSubmit={this.passwordReset}>
               
                  <input
                  className='inputReset'
                     type="email"
                      id="email"
                      name="email"
                      onChange={this.handleInput}
                      placeholder="Email"
                 />
                  
             </form>
                     
           </div>
        </Col>
        <Col className="ButtonReset" md={12}>
        <Button className="resetButton">Confirmer</Button>
        <p>{this.state.message}</p>
        </Col>
     </Row>
     </Container>
      
    );
  }
}

export default PasswordReset;

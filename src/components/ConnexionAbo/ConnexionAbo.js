import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./ConnexionAbo.css";

import { Link } from "react-router-dom";

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", message: "", redirect: false };
  }

  redirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/abonnement" />;
    }
  };
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  addLogin = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/restaurateur/loginAbo", options)
      .then((response) => {
        return response.json();
      })

      .then((responseData) => {
        this.setState({ message: responseData.message });
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userID", responseData.userId);
        this.setState({ redirect: true });
      });
  };
  render() {
    return (
      <div className="background">
        <div className="connexion-container">
          <h1 className="titreConnexion">Connexion</h1>

          <Form className="identifiants">
            <Form.Row className="align-items-center">
              <Row>
                <Col>
                  <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                    Username
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      name="email"
                      id="inlineFormInputGroup"
                      placeholder="Email"
                      onChange={this.handleInput}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Mot de passe
                  </Form.Label>
                  <Form.Control
                    name="password"
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Mot de passe"
                    type="password"
                    onChange={this.handleInput}
                  />
                </Col>
              </Row>
              <Col>
                <Button
                  type="submit"
                  className="mb-2"
                  className="sign-up"
                  onClick={this.addLogin}
                >
                  Se connecter
                </Button>
                <p className="mdp">Mot de passe oublié</p>
              </Col>
            </Form.Row>
            <div className="inscription">
              <Link className="mdp" to="/inscription">
                Vous n'êtes pas encore inscrit ? C'est par ici
              </Link>
            </div>
          </Form>
          {this.redirect()}
        </div>
      </div>
    );
  }
}
export default Connexion;

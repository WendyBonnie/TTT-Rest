import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import React, { Component } from "react";
import "./connexion.css";

import { Link } from "react-router-dom";

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", message: "" };
  }
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
      "X-Requested-With": "XMLHttpRequest",
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/restaurateur/login", options)
      .then((response) => {
        return response.json();
      })

      .then((responseData) => {
        this.setState({ message: responseData.message });

        if (responseData.token) {
          localStorage.setItem("token", responseData.token);
          localStorage.setItem("userID", responseData.userId);
          this.props.setLogin(true);
          this.props.history.push("/homepage");
        }
      });
  };
  render() {
    return (
      <Container className="connexion-container">
        <Row>
          <Col className="connexionPass" md={7}>
            <h1 className="titreCo">Déjà membre ?</h1>
            <h1 className="titreCo">Connectez-vous !</h1>

            <Form className="identifiants">
              <InputGroup className="mb-2 sizeForm">
                <FormControl
                  name="email"
                  id="inlineFormInputGroup"
                  placeholder="Email"
                  onChange={this.handleInput}
                />
              </InputGroup>

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

              <Link className="inscrip" to="/passwordReset">
                <p className="mdp">Mot de passe oublié ?</p>
              </Link>

              <Button
                type="submit"
                className="mb-2"
                className="sign-up"
                onClick={this.addLogin}
              >
                Se connecter
              </Button>

              <Col className="colMembre" xs={12}>
                <p className="membre">
                  Pas encore membre ?
                  <Link className="compte" to="/inscription">
                    {""} Créer mon compte
                  </Link>
                </p>
              </Col>
            </Form>
            {this.state.message}
          </Col>
          <Col className="imageDeskRestau" md={5}></Col>
        </Row>
      </Container>
    );
  }
}
export default Connexion;

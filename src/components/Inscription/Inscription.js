import React, { Component, useReducer } from "react";
import "./Inscription.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantName: "",
      checkIndiv: true,
      checkGen: true,
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewRegister = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const headers = new Headers({
      "X-Requested-With": "XMLHttpRequest",
    });

    const options = {
      method: "POST",
      body: data,
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/inscription",
      options
    )
      .then((response) => {
        return response.json();
      })

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
      <Container className="Bloc-principal">
        <Row>
          <Col className="colInscr" md={6}>
            <Row className="Titre">
              <h1>Créer mon compte restaurateur</h1>
            </Row>
            <Row>
              <p>
                Merci de remplir les informations ci-dessous pour finaliser la
                création de votre compte.
              </p>
            </Row>
            <Row>
              <Form className="form" onSubmit={this.addNewRegister}>
                <Row>
                  <Col>
                    <Form.Group controlId="formNom">
                      <Form.Control
                        type="text"
                        placeholder="Nom du restaurant"
                        name="restaurantName"
                        onChange={this.handleInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formPrenom">
                      <Form.Control
                        type="text"
                        placeholder="Nom "
                        name="bossName"
                        onChange={this.handleInput}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formDate">
                      <Form.Control
                        type="text"
                        placeholder="Prénom"
                        name="bossFirstName"
                        onChange={this.handleInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formAdresse">
                  <Form.Control
                    type="text"
                    placeholder="Adresse"
                    name="adress"
                    onChange={this.handleInput}
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Control
                    type="text"
                    placeholder="Ville"
                    name="city"
                    onChange={this.handleInput}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="formVille">
                      <Form.Control
                        type="text"
                        placeholder="Téléphone"
                        name="phone"
                        onChange={this.handleInput}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formTel">
                      <Form.Control
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        onChange={this.handleInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Form.Group
                      className="servicePropose"
                      controlId="formService">
                      <Form.Label controlId="formService">
                        Services proposés
                      </Form.Label>
                      <Form.Check
                        type="checkbox"
                        name="noon"
                        label="Midi"
                        onChange={this.handleInput}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="formService">
                      <input
                        type="checkbox"
                        id="individuel"
                        name="alone"
                        checked={this.state.checkIndividuel}
                        onChange={this.handleInput}
                      />
                      <label for="individuel">Pourboire individuel</label>
                      <br />
                      <input
                        type="checkbox"
                        id="general"
                        name="collectif"
                        checked={this.state.checkGeneral}
                        onChange={this.handleInput}
                      />
                      <label for="general">Pourboire Général</label>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formPass">
                  <Form.Label>
                    Mot de passe
                    <p className="detailPassword">
                      8 caractères min. : au moins 1 majuscule, 1 minuscule, 1
                      chiffre et 1 caractère spécial
                    </p>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    onChange={this.handleInput}
                  />
                </Form.Group>
                <Row>
                  <Col md={9}>
                    <Form.Group controlId="formBasicCheckbox">
                      <br />
                      <Form.Check
                        className="checkboxCGU"
                        type="checkbox"
                        name="acceptControl"
                        label="J'ai lu et j'accepte les CGU et CGV"
                        onChange={this.handleInput}
                        required
                      />
                      <Row style={{ marginLeft: "10px", fontWeight: "bold" }}>
                        <a
                          className="cgvLink"
                          href="/CGV_TIPTOTHANK.pdf"
                          target="_blanck">
                          CGU
                        </a>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Button
                      className="submitButtonRestau"
                      block
                      type="submit"
                      block
                      type="submit">
                      S'inscrire
                    </Button>
                  </Col>
                  <p className="annonce">
                    *TIPOURBOIRE est responsable du traitement des données
                    personnelles collectées sur ce site. Elles sont collectées
                    aux fins de : l'exécution du contrat/vous informer de nos
                    nouveautés et actualités/à des fins statistiques, les bases
                    légales respectives des traitements pouvant être l'exécution
                    du contrat, l'intérêt légitime, ou le consentement. Pour
                    plus d'informations voir notre politique de confidentialité.
                  </p>
                </Row>
              </Form>
              <Col md={{ span: 6, offset: 3 }}>{this.state.message}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Inscription;

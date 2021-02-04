import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./navBar.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavLink,
  Dropdown,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import Deconnexion from "../Deconnexion/Deconnexion";

class Barremenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  connect = () => {
    if (!this.props.login) {
      return (
        <Container fluid>
          <Row className="partie1">
            <Dropdown className="nav justify-content-right">
              <Dropdown.Toggle alignRight variant="success" id="dropdown-basic">
                <img src="/image/user.png" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/Home">Inscription</Dropdown.Item>
                <Dropdown.Item href="/">Connexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Col className="logoPartie1" md={12}>
              <Link to="/">
                <img src="/image/logoJaune.png" />
              </Link>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container fluid>
          <Row className="partie1">
            <Dropdown className="nav justify-content-right">
              <Dropdown.Toggle alignRight variant="success" id="dropdown-basic">
                <img src="/image/user.png" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/Profil">profil</Dropdown.Item>
                <Dropdown.Item href="/menus">Menu</Dropdown.Item>
                <Dropdown.Item href="/equipe">Mon équipe</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Col className="logoPartie1" md={12}>
              <Link to="/homepage">
                <img src="/image/logoJaune.png" />
              </Link>
            </Col>
          </Row>
        </Container>
      );
    }
  };

  componentDidUpdate() {
    this.connect();
  }
  render() {
    return <div className="barre-de-menu">{this.connect()}</div>;
  }
}
export default Barremenu;

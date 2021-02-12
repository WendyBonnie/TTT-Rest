import React, { Component } from "react";
import "./footer.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Navbar fixed="bottom" collapseOnSelect expand="lg" bg="#edeaea">
          <Navbar.Brand href="#home" className="textFooter">
            @TiPourBoire
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                href="/CGV_TIPTOTHANK.pdf"
                target="_blanck"
                className="textFooter"
              >
                Condition Général
              </Nav.Link>
              <Nav.Link
                href="mailto:contact@tipourboire.com"
                className="textFooter"
              >
                Contact
              </Nav.Link>
            </Nav>
            <Nav>
              {/*<Nav.Link href="#deets" className="textFooter">
                Langues
    </Nav.Link>*/}
              <Nav.Link
                eventKey={2}
                href="https://tipourboire.com"
                className="textFooter"
              >
                A propos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Footer;

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
  deleteProfil = (e) => {
    window.confirm(
      "Etes-vous sur de vouloir supprimer votre compte? Cette action est irréversible."
    );
    e.preventDefault();
    const data = {
      userId:
        localStorage.getItem(
          "userID"
        ) /*on get l'Id qu'on a stocké durant la connexion*/,
      /*userID avec le ID en majuscule car c'est comme ca qu'on l'a mis dans le local storage (/connexion) */
      profil: this.state.profil,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/deleteRestaurant",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
          alert(
            "La suppression de votre compte a bien été prise en compte. Merci."
          );
          this.props.history.push("/connexion");
        },

        (error) => {
          console.log(error);
        }
      );
  };
  render() {
    return (
      <div className="footer">
        <Navbar fixed="bottom" collapseOnSelect expand="lg" bg="#edeaea">
          <Navbar.Brand href="#home" className="textFooter">
            @Tipourboire
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="" className="textFooter">
                Mentions Légales
              </Nav.Link>
              <Nav.Link
                href="cgu-cgv/CGV_TIPTOTHANK.pdf"
                className="textFooter"
              >
                CGU
              </Nav.Link>
              <Nav.Link
                href="cgu-cgv/CGV_TIPTOTHANK.pdf"
                className="textFooter"
              >
                Confidentialité
              </Nav.Link>
              <Nav.Link
                href="mailto:contact@tipourboire.com"
                className="textFooter"
              >
                Contact
              </Nav.Link>
              <Nav.Link
                href="#pricing"
                className="textFooter"
                onClick={this.deleteProfil}
              >
                Supprimer mon compte
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

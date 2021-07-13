import React, { Component } from "react";

import { Container } from "react-bootstrap";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./Abonnement.css";

import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "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"
);

class Abonnement extends Component {
  render() {
    return (
      <Container className="monAbonnement">
        <Row className="infoAbonnement">
          <Col>
            <h3>Votre abonnement premium restaurateur Tipourboire</h3>
            <Elements className="cbInput" stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Abonnement;

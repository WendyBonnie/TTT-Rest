/**
 * Use the CSS tab above to style your Element's container.
 */
import React, { Component } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import "./CardSection.css";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
class CardSection extends Component {
  render() {
    return (
      <div>
        <label>
          Paiement
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
      </div>
    );
  }
}

export default CardSection;

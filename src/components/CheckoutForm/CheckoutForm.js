import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import CardSection from "../../assets/components/CardSection/CardSection";
import { Alert } from "bootstrap";
import Form from "react-bootstrap/Form";
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // If a previous payment was attempted, get the latest invoice
    /*const latestInvoicePaymentIntentStatus = localStorage.getItem(
      "latestInvoicePaymentIntentStatus"
    );*/

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      console.log("[createPaymentMethod error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      const paymentMethodId = paymentMethod.id;
      const customerId = "";
      const priceId = "";
      /*if (latestInvoicePaymentIntentStatus === "requires_payment_method") {
        // Update the payment method and retry invoice payment
        const invoiceId = localStorage.getItem("latestInvoiceId");
        retryInvoiceWithNewPaymentMethod({
          customerId,
          paymentMethodId,
          invoiceId,
          priceId,
        });
      } else {*/
      /* Create the subscription*/
      createSubscription({ customerId, paymentMethodId, priceId });
    }
    function createSubscription({ customerId, paymentMethodId, priceId }) {
      return (
        fetch(
          "https://back-end.osc-fr1.scalingo.io/restaurateur/createsubscription",
          {
            method: "post",
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              customerId: customerId,
              paymentMethodId: paymentMethodId,
              priceId: "price_1IGLo3Hoh2Vgz5QdnS6OVonj",
            }),
          }
        )
          .then((response) => {
            return response.json();
          })
          // If the card is declined, display an error to the user.
          .then((result) => {
            if (result.error) {
              window.alert(result.message);
              // The card had an error when trying to attach it to a customer.
              throw result;
            }
            return result;
          })
          // Normalize the result to contain the object returned by Stripe.
          // Add the additional details we need.
          .then((result) => {
            window.alert(result.message);
            return {
              paymentMethodId: paymentMethodId,
              priceId: priceId,
              subscription: result,
            };
          })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        /*.then(handlePaymentThatRequiresCustomerAction)
            // If attaching this card to a Customer object succeeds,
            // but attempts to charge the customer fail, you
            // get a requires_payment_method error.
            .then(handleRequiresPaymentMethod)
            // No more actions required. Provision your service for the user.
            .then(onSubscriptionComplete)
            .catch((error) => {
              // An error has happened. Display the failure to the user here.
              // We utilize the HTML element we created.
              showCardError(error);
            })*/
      );
    }
  };

  return (
    <form className="coForm" onSubmit={handleSubmit}>
      <CardSection />
      {/* <Form.Check
        className="checkboxRetRest"
        type="checkbox"
        name="retractation"
        label=" Je renonce à mon droit de rétractation d'une durée de 14 jours, afin que le service commence immédiatement. "
        required
     />*/}
      <button className="submitButtonSubRestau" disabled={!stripe}>
        Devenir un restaurateur Premium
      </button>
    </form>
  );
}

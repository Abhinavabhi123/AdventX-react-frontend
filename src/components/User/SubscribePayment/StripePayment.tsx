import React, { useState, useEffect } from "react";
import { PaymentIntentResult } from "@stripe/stripe-js";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

function StripePayment() {
  const stripe = useStripe()
  const elements = useElements()

  const [email,setEmail]=useState<string>("");
  const [message,setMessage]=useState<string>("")
  const [isLoading,setIsLoading] = useState<boolean>(false)

  useEffect(()=>{
    if(!stripe){
      return
    }
    const clientSecret  = new URLSearchParams(window.location.search).get("payment_intent_client_secret")
    if(!clientSecret){
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then((result: PaymentIntentResult ) => {
      const { paymentIntent, error } = result;
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      } else if (error) {
        console.error(error);
      }
      
    })

  },[stripe])

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!stripe || !elements){
      return;
    }
    setIsLoading(true);

    const {error}=await stripe.confirmPayment({
      elements,
      confirmParams:{
        return_url: "http://localhost:5173/subscribe/success"
      },
    });
    
    
      
    if (error.type === "card_error" || error.type === "validation_error") {
      if (error.message) {
        setMessage(error.message);
      } else {
        setMessage("Unknown error");
      }
    } else {
      setIsLoading(false);
    }

    
  }
  const paymentElementOptions = {
    layout: "tabs"  as const,
  }


    return (
      <form id="payment-form" className="payment_form" onSubmit={handleSubmit}>
        {/* <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.value.email)} // Update this line
        /> */}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button className="payment_button" disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    );
}

export default StripePayment;

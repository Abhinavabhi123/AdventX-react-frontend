import  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "./StripePayment";
import axios from "axios";
import "./checkout.css";
// import { UserApi } from "../../../Store/api";


const PUBLIC_KEY =
  "pk_test_51NT72pSFtSANDa8MD6oI1cAVSubxBF0yQ6Rdvd3EWN2Ej7LgKdcsZ9ahemnaSKhwMfGVOxgWYs6S749kE18NSB9X00XetGwxlg";
const stripePromise = loadStripe(PUBLIC_KEY);

function CheckOut() {
  const [clientSecret, setClientSecret] = useState("");
  const userId = useSelector((state:any)=>state.user._id)
  

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const amount = 2000;
        const response = await axios.post(
          `${import.meta.env.VITE_USER_API}addPayment`,
          { id: userId, amount },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = response.data;
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClientSecret();
  }, []);

  const appearance = {
    theme: "stripe" as const,
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-white">
      <div className="checkOut">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <StripePayment />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default CheckOut;

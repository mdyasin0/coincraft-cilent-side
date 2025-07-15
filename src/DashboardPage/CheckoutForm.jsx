import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../Authprovider/Firebase_context";
import { useNavigate } from "react-router";

const CheckoutForm = ({ selectedAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      // Step 1: Create payment intent
      const res = await axios.post(
        "https://coincrafter-chi.vercel.app/create-payment-intent",
        {
          amount: selectedAmount.price * 100, // Stripe amount in cents
        }
      );

      const clientSecret = res.data.clientSecret;

      // Step 2: Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown@email.com",
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // Step 3: Save payment info and update user's coin
        const paymentData = {
          email: user.email,
          name: user.displayName,
          amount: selectedAmount.price,
          coins: selectedAmount.coins,
          transactionId: result.paymentIntent.id,
          date: new Date(),
        };

        // Save payment history
        await axios.post("https://coincrafter-chi.vercel.app/payments", paymentData);

        // Update user coin balance
        await axios.patch(`https://coincrafter-chi.vercel.app/users/coins/${user.email}`, {
          coinToAdd: selectedAmount.coins,
        });

        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `${selectedAmount.coins} coins added to your account.`,
        });
navigate("/dashboard/addtask"); 
      }
    } catch (err) {
      console.error("Payment error", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-[#0f172a]">
        Pay ${selectedAmount.price} for {selectedAmount.coins} coins
      </h2>
      <form onSubmit={handleForm} className="space-y-4">
        <CardElement className="p-4 border rounded-md" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-4 py-2 rounded-md w-full"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_stripe);

const coinOptions = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 }
];

const PurchaseCoins = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);

  

  return (
    <div className="p-6">
      {/* Coin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
        {coinOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => setSelectedAmount(option)}
            className="cursor-pointer bg-white shadow-md hover:shadow-xl transition rounded-lg p-6 text-center border border-gray-200 hover:border-[#0284c7]"
          >
            <h2 className="text-2xl font-bold text-[#0f172a]">{option.coins} Coins</h2>
            <p className="text-lg text-[#0284c7] mt-2">= ${option.price}</p>
            <button className="mt-4 bg-[#0284c7] hover:bg-[#0369a1] text-white px-4 py-2 rounded-md">
              Purchase
            </button>
          </div>
        ))}
      </div>

      {/* Stripe Checkout Form */}
      {selectedAmount && (
        <Elements stripe={stripePromise}>
          <CheckoutForm selectedAmount={selectedAmount} />
        </Elements>
      )}
    </div>
  );
};

export default PurchaseCoins;

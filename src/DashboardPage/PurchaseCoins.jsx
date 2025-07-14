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
   <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
  {/* Coin Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
    {coinOptions.map((option, index) => (
      <div
        key={index}
        onClick={() => setSelectedAmount(option)}
        className="cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl p-6 flex flex-col items-center border border-gray-200 hover:border-blue-500"
      >
        <h2 className="text-3xl font-extrabold text-gray-900">{option.coins} Coins</h2>
        <p className="text-xl text-blue-600 mt-2">= ${option.price}</p>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto">
          Purchase
        </button>
      </div>
    ))}
  </div>

  {/* Stripe Checkout Form */}
  {selectedAmount && (
    <div className="max-w-md mx-auto">
      <Elements stripe={stripePromise}>
        <CheckoutForm selectedAmount={selectedAmount} />
      </Elements>
    </div>
  )}
</div>

  );
};

export default PurchaseCoins;

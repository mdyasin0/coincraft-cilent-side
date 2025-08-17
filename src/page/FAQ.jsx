import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is CoinCrafter?",
    answer:
      "CoinCrafter is a Micro-Task and Earning Platform with three different user roles: Worker, Buyer, and Admin. Workers can earn coins by completing tasks, while Buyers can post tasks.",
  },
  {
    question: "How can coins be converted into real money?",
    answer:
      "Workers earn coins by completing tasks. Every 20 coins = $1. When a withdrawal request is approved by the Admin, it will be converted into real money.",
  },
  {
    question: "How can Buyers purchase coins?",
    answer:
      "Buyers can purchase coins using the Stripe Payment Gateway. The rate is $1 for 10 coins.",
  },
  {
    question: "What is the role of the Admin?",
    answer:
      "The Admin manages the entire system—handling user roles, approving withdrawals, and deleting tasks when needed.",
  },
  {
    question: "Will new users get free coins on registration?",
    answer:
      "Yes , Worker accounts automatically receive 10 coins, and Buyer accounts receive 50 coins upon registration.",
  },
  {
    question: "On which devices can I use CoinCrafter?",
    answer:
      "CoinCrafter is fully responsive and designed for Mobile, Tablet, and Desktop devices.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto  my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">❓ Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200  rounded-xl shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-lg"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transform  transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 dark:text-white text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

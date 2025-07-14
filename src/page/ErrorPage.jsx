import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-xl text-center">
      
        <h1 className="text-5xl font-extrabold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">Page Not Found</h2>
        <p className="text-gray-500 mt-2">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

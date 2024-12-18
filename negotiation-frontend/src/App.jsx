import React from "react";
import OfferForm from "./components/OfferForm";  // Import the offer form component
import ResponseForm from "./components/ResponseForm"; // Import the response form component

const App = () => {
  return (
    <div>
      <h1>Negotiation Platform</h1>
      {/* Create Offer Form */}
      <OfferForm />
      {/* Response Form */}
      <ResponseForm />
    </div>
  );
};

export default App;

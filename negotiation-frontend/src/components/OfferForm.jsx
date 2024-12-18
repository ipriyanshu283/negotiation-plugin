import React, { useState } from "react";
import { createOffer } from "../services/negotiationService"; // Import the service for API calls

const OfferForm = () => {
  const [buyerEmail, setBuyerEmail] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [offerAmount, setOfferAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const offer = await createOffer(buyerEmail, sellerEmail, offerAmount);
      if (offer._id) {
        localStorage.setItem("negotiationId", offer._id);
      }
      alert("Offer created successfully!");
    } catch (error) {
      console.error("Error creating offer:", error);
      alert("Error creating offer!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Offer</h2>
      <input
        type="email"
        placeholder="Buyer Email"
        value={buyerEmail}
        onChange={(e) => setBuyerEmail(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Seller Email"
        value={sellerEmail}
        onChange={(e) => setSellerEmail(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Offer Amount"
        value={offerAmount}
        onChange={(e) => setOfferAmount(e.target.value)}
        required
      />
      <button type="submit">Submit Offer</button>
    </form>
  );
};

export default OfferForm;

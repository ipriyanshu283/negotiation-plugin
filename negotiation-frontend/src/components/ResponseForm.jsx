import React, { useState } from "react";

const ResponseForm = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [status, setStatus] = useState("");
  const [counterOffer, setCounterOffer] = useState("");
  const negotiationId = localStorage.getItem("negotiationId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/response/${negotiationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          counterOffer: status === "countered" ? counterOffer : null,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to submit response");
      }
  
      const data = await response.json();
      alert("Response submitted successfully!");
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error submitting response: ${error.message}`);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Respond to Offer</h2>
      <select value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="">Select Status</option>
        <option value="accepted">Accept</option>
        <option value="rejected">Reject</option>
        <option value="countered">Counter</option>
      </select>
      {status === "countered" && (
        <input
          type="number"
          placeholder="Counter Offer"
          value={counterOffer}
          onChange={(e) => setCounterOffer(e.target.value)}
          required
        />
      )}
      <button type="submit">Submit Response</button>
    </form>
  );
};

export default ResponseForm;

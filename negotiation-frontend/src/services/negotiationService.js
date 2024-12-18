// negotiationService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a new offer
export const createOffer = async (buyerEmail, sellerEmail, offerAmount) => {
  const response = await fetch(`${API_BASE_URL}/offer`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      buyerEmail,
      sellerEmail,
      offerAmount,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create offer");
  }

  const data = await response.json();
  return data;
};

